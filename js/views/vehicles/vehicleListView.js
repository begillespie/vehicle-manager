define([
    'jquery',
    'underscore',
    'backbone',
    'models/vehicle',
    'text!tpl/t_vehiclelistitem.html'
], function($, _, Backbone, vehicle, template){
    var vehicleListView = Backbone.View.extend({
    //Generates the list of vehicles
        tagName: 'ul',
        className: 'list-group',

        initialize: function(){
            this.model.bind("change", this.render, this);
            this.model.bind("reset", this.render, this);
            var self = this;
            this.model.bind("add", function(veh){
                $(self.el).append(new vehicleView({model: veh}).render().el);
            }, this);
            return this;
        },

        render: function(){
            _.each(this.model.models, function(veh){
                $(this.el).append(new vehicleView({model: veh}).render().el);
            }, this);
            return this;
        }
    });


    var vehicleView = Backbone.View.extend({
    // View for the compressed view in the vehicle list
        tagName: 'li',
        className: 'list-group-item',

        template: _.template(template),

        initialize: function(){
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.close, this);
        },
            
        render: function(){
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        close: function(){
            $(this.el).unbind();
            $(this.el).remove();
        }
    });
    return vehicleListView;
});
