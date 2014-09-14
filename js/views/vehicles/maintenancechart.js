define([
    'jquery',
    'underscore',
    'backbone',
    'config',
    'lib/Chart.min'
],function($, _, Backbone, db, Chart){
    var MaintenanceChart = Backbone.View.extend({
        template: _.template('<h4>Maintenance Cost</h4><canvas id="maintenance-chart">'),
        initialize: function(requestID){
            var self=this;
            $.get(db.stats.stats+'?key="'+requestID+'"',
                function(rdata){
                    var parsed = JSON.parse(rdata).rows[0].value;
                    self.chartData = [
                        {
                            value: parsed.total_sch_cost,
                            color: "#46BFBD",
                            highlight: "#5AD3D1",
                            label: "Scheduled"
                        },
                        {
                            value: parsed.total_unsch_cost,
                            color: "#FDB45C",
                            highlight: "#FFC870",
                            label: "Unscheduled"
                        }
                    ];
                    self.render();
                });
        },

        render: function(){
            $(this.el).html(this.template());
            var options = {};
            var canvas = document.getElementById('maintenance-chart');
            //set the size of the canvas to match the parent element
            canvas.width = $("#detail-maintenance-chart").width();
            canvas.height = $("#detail-maintenance-chart").height();
            var ctx = document.getElementById('maintenance-chart').getContext('2d');
            var chart = new Chart(ctx).Pie(this.chartData, options);
        }

    });
    return MaintenanceChart;
});
