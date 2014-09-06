window.HeaderView = Backbone.View.extend({
//Generates the page header, common across the app
    template: _.template($('#header-tpl').html()),
    className: "container-fluid",
    
    initialize: function(){this.render();},

    render: function(){
        $(this.el).html(this.template());
        return this;
    },

    events: {
        'click .new' : 'newVeh'
    },
    
    newVeh: function(){
        app.navigate("vehicles/new", true);
        return false;
    }
});
