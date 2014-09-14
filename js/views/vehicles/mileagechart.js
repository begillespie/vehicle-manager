define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'lib/Chart.min'
],function($, _, Backbone, db, Chart){
    var FuelEconomyChart = Backbone.View.extend({
        template: _.template('<h4>Fuel Economy</h4><canvas id="mileage-chart">'),
        initialize: function(requestID){
            var self=this;
            $.get(db.stats.fueleconomy+'?startkey=["'+requestID+'",{}]&endkey=["'+requestID+'"]&descending=true&limit=21',
            // the database view returns a complex key, [requestID, date]. The form of this request gets a list filtered by 
            // requestID and sorted descending by date.
                function(rdata){
                    var parsed = JSON.parse(rdata).rows;
                    var fuelData = [];

                    //build up the Chart data object here, includes the series formatting information
                    self.chartData = {
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
                        self.chartData.labels[i-1]=fuelData[i][0];
                        self.chartData.datasets[0].data[i-1]=(fuelData[i][1]-fuelData[i-1][1])/fuelData[i][2];
                    };

                    self.render();
                });
        },

        render: function(){
            $(this.el).html(this.template());
            var options = {};
            var canvas = document.getElementById('mileage-chart');

            //set the size of the canvas to match the parent element
            canvas.width = $("#detail-mileage-chart").width();
            canvas.height = $("#detail-mileage-chart").height();
            var ctx = document.getElementById('mileage-chart').getContext('2d');
            var chart = new Chart(ctx).Line(this.chartData, options);
        }

    });
    return FuelEconomyChart;
});
