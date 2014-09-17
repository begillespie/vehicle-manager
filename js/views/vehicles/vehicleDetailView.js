define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'config',
    'views/fuel/fuellistview',
    'models/fuel',
    'views/maintenance/maintlistview',
    'models/maintenance',
    'views/vehicles/vehicledetailtabview',
    'views/vehicles/mileagechart',
    'views/vehicles/maintenancechart',
    'text!tpl/t_vehicledetail.html'
], function($, _, Backbone, Bootstrap, db, FuelListView, Fuel, MaintenanceListView, Maintenance, VehicleDetailTabView, FuelEconomyChart, MaintenanceChart, template){
    var vehicleDetailView = Backbone.View.extend({
    // Detail view for vehicles. This is the main view for the app, and is where
    // most of the data for a vehicle is viewed/added.
        className: "vehicle-detail form-group",
        template: _.template(template),

        initialize: function(){
            this.requestID = this.model.get('id');
        },

        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            new VehicleDetailTabView(this.requestID).setElement(this.$('#detail-stats'));
            new FuelEconomyChart(this.requestID).setElement(this.$('#detail-mileage-chart'));
            new MaintenanceChart(this.requestID).setElement(this.$('#detail-maintenance-chart'));
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
            this.maintList = new Maintenance.Collection([], {'id':vehicleid});
            this.maintList.meta('vehicleID', vehicleid);
            var self = this;
            this.maintList.fetch({
                success: function(){
                    this.maintListView = new MaintenanceListView({model: self.maintList});
                    $('#maintenance').html(maintListView.render().el);
                }
            })
        },

        close: function(){
            $(this.el).unbind();
            $(this.el).remove();
            Backbone.history.navigate('',{trigger:false});
        }
    });

    return vehicleDetailView;
});
