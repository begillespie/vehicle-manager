define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'makechart',
    'router',
    'views/fuel/fuellistview',
    'models/fuel',
    'views/maintenance/maintlistview',
    'models/maintenance',
    'text!tpl/t_vehicledetail.html',
    'text!tpl/t_detailstats.html'
], function($, _, Backbone, Bootstrap, insertCharts, AppRouter, FuelListView, Fuel, MaintenanceListView, Maintenance, template, detailTemplate){
    var vehicleDetailView = Backbone.View.extend({
    // Detail view for vehicles. This is the main view for the app, and is where
    // most of the data for a vehicle is viewed/added.
        className: "vehicle-detail form-group",
        template: _.template(template),

        initialize: function(){
            this.model.bind('change', this.render, this);
            var requestID = this.model.get('id');
            this.getDetails(requestID);
        },

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            "click .close"           : "close",
            "click .save"            : "saveVeh",
            "click .delete"          : "delVeh",
            "click .fuel-tab"        : "fuel",
            "click .maintenance-tab" : "maintenance"
        },

        saveVeh: function(){
            this.model.set({
                _rev  : this.model.get('_rev'),
                make  : $('#make').val(),
                model : $('#model').val(),
                vin   : $('#vin').val(),
                plate : $('#plate').val(),
                state : $('#state').val(),
                year  : $('#year').val(),
                color : $('#color').val(),
                type  : 'vehicle'
            });
            if(this.model.isNew()){
                var self = this;
                app.vehicleList.create(this.model, {
                    success: function(){
                        //update URL to reflect app state
                        app.navigate('vehicles/'+self.model.id, false);
                    }
                });
            } else {
                    this.model.save();
            }
            return false;
        },

        delVeh: function(){
            this.model.destroy({
                url: this.model.url()+'?rev='+this.model.get('_rev'),
                success: function(){
                    alert('Vehicle deleted');
                    window.history.back();
                }
            });
            return false;
        },
        
        fuel: function(){
            var vehicleid = this.model.get('id');
            this.fuelList = new Fuel.Collection([], {'id':vehicleid});
            this.fuelList.meta('vehicleID', vehicleid);
            var self = this;
            this.fuelList.fetch({
                success: function(){
                    this.fuelListView = new FuelListView({model: self.fuelList});
                    $('#fuel').html(fuelListView.render().el);
                }
            })
        },

        maintenance: function(){
            var vehicleid = this.model.get('id');
        },

        // utility function that grabs some individual data points from the server, the results
        // of reduce functions, and inserts them into the page.
        getDetails: function(requestID){
            var self = this;

            // jQuery deferreds
            $.when(this.getDBView('mileage', requestID),
                this.getDBView('fuelcost', requestID),
                this.getDBView('maintcost', requestID)
                ).done(function(mileageR, fuelcostR, maintcostR){
                var parsedData = [];

                // dig inside the couchdb object and pull out the values.
                // if the view reurned no data, create a dummy _stats
                // object full of zeros. Final result is an array of _stats
                // objects in the same order as they were called above.
                for(i=0; i<arguments.length; i++){
                    var thisRow = JSON.parse(arguments[i][0]);
                    if(thisRow.rows[0]){
                        parsedData.push(thisRow.rows[0].value);
                    } else {
                        parsedData.push({
                            'count': 0,
                            'sum'  : 0,
                            'min'  : 0,
                            'max'  : 0
                        });
                    }
                };

                var detailsData = {
                    mileage : parsedData[0].max,
                    fuelcost: parsedData[1].sum,
                    maintcost: parsedData[2].sum,
                    totalcost: 0
                };
                detailsData.totalcost = detailsData.fuelcost + detailsData.maintcost;

                var template = _.template(detailTemplate);
                $('#detail-stats').html(template(detailsData));

                // had to chain this after getDetails because the spot for this chart to go is in the details template
                self.getFuelEconomy(requestID);
            });
        },

            // get fuel economy and format the data for Chart.js
        getFuelEconomy: function(requestID){
            $.get('http://192.168.1.104/couchdb/mileage/_design/stats/_view/fueleconomy?key="'+requestID+'"&descending=true&limit=21',
                function(rdata){
                    var parsed = JSON.parse(rdata).rows;
                    var fuelData = [];
                    var chartData = {
                        labels: [],
                        datasets: [
                            {
                                label: "Fuel Ecomony",
                                fillColor: "rgba(151,187,205,0.2)",
                                strokeColor: "rgba(151,187,205,1)",
                                pointColor: "rgba(151,187,205,1)",
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(151,187,205,1)",
                                data: []
                            }
                        ]
                    };

                    // the data came off the server in reverse order to get the latest records
                    // this turns it back around to put the oldest first for display
                    for(i=0; i<parsed.length; i++){
                        fuelData.unshift(0);
                        fuelData[0] = parsed[i].value;
                    };

                    for (i=1; i<fuelData.length; i++){
                        chartData.labels[i-1]=fuelData[i][0];
                        chartData.datasets[0].data[i-1]=(fuelData[i][1]-fuelData[i-1][1])/fuelData[i][2];
                    };

                    var options = {};

                    insertCharts(chartData, options, 'mileage-chart');
                }
            );
        },

        // helper function builds a url to a CouchDB view and GETs it from the server.
        getDBView: function(view, requestID){
            var url = 'http://192.168.1.104/couchdb/mileage/_design/stats/_view/'+view+'?key="'+requestID+'"';
            return $.get(url);
        },

        close: function(){
            $(this.el).unbind();
            $(this.el).remove();
            Backbone.history.navigate("");
        }
    });

    return vehicleDetailView;
});
