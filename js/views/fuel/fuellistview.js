define([
    'jquery',
    'underscore',
    'backbone',
    'views/fuel/fuelview',
    'models/fuel',
    'text!tpl/t_fuellist.html'
], function($, _, Backbone, FuelView, Fuel, template){
    var FuelListView = Backbone.View.extend({
    //Generates fuel history
        tagName: 'ul',
        template: _.template(template),
        
        initialize: function(){
            // grab the vehicle ID from the custom meta attribute in the collection
            this.vehicleID = this.model._meta["vehicleID"];
            this.model.bind("reset", this.render, this);
            var self = this;
//            this.model.bind("change", this.render, this);
    /*        this.model.bind("add", function(fuel){
                $(self.el).prepend(new fuelView({model: fuel}).render().el);
            }, this);
            return this;
    //*/
        },
        
        render: function(){
            $(this.el).html(this.template);
            _.each(this.model.models, function(fuel){
                $(this.el).append(new FuelView({model: fuel}).render().el);
                this.createDatePicker();
            }, this);
            return this;
        },
        
        events: {
            'click .addfuel' : 'add'
        },

        add : function(){
            fuelview = new FuelView({
                model:new Fuel.Model({vehicleid: this.vehicleID})
            });
            $('#fuel-list').prepend(fuelview.render().el);
            this.createDatePicker();
            return false;
        },
        
        createDatePicker: function(){
            this.$('.datetimepicker').datetimepicker({
                picktime: false
            });
        },
        
        close: function(){
            $(this.el).unbind();
            $(this.el).remove();
        }
    });

    return FuelListView;
});
