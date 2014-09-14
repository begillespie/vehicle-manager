define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'config',
    'text!tpl/t_detailstats.html'
], function($, _, Backbone, Bootstrap, db, template){
    var vehicleDetailTabView = Backbone.View.extend({
        template: _.template(template),
        className: 'row',

        initialize: function(requestID){
            var self=this;
            $.get(db.stats.stats+'?key="'+requestID+'"',
                function(data){
                    var m = JSON.parse(data).rows[0].value;
                    self.model = {
                        mileage: m.max_mileage,
                        fuelcost: m.total_fuel_cost,
                        maintcost: m.total_sch_cost + m.total_unsch_cost,
                        totalcost: m.total_fuel_cost + m.total_sch_cost + m.total_unsch_cost
                    };
                    self.render();
                });
        },

        render: function(){
            $(this.el).html(this.template(this.model));
            return this.el;
        }
    });
    return vehicleDetailTabView
});
