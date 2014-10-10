define([
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/t_frontpage.html'
], function($, _, Backbone, template){
    var HomeView = Backbone.View.extend({
    //Generates the page header, common across the app
        template: _.template(template),
        
        initialize: function(){
            this.render();},

        render: function(){
            $(this.el).html(this.template());
            return this;
        }
    });

    return HomeView;
});
