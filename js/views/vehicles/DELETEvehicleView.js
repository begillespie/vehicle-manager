define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var vehicleView = Backbone.View.extend({
    // View for the compressed view in the vehicle list
        tagName: 'li',
        className: 'list-group-item',

        template: _.template($('#vehicle-tpl').html()),

        initialize: function(){
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.close, this);
        },
            
        render: function(){
            console.log('vehicleView render');
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        close: function(){
            $(this.el).unbind();
            $(this.el).remove();
        }
    });

    return vehicleView;
});
