define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!tpl/t_header.html'
], function($, _, Backbone, AppRouter, template){
    var HeaderView = Backbone.View.extend({
    //Generates the page header, common across the app
        template: _.template(template),
        className: "container-fluid",
        
        initialize: function(){
            console.log('initialize header');
            this.render();},

        render: function(){
            $(this.el).html(this.template());
            return this;
        },

        events: {
            'click .new' : 'newVeh'
        },
        
        newVeh: function(){
            Backbone.history.navigate("vehicles/new", true);
            return false;
        }
    });

    return HeaderView;
});
