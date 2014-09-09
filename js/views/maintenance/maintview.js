window.MaintenanceView = Backbone.View.extend({
    tagName : 'li',
    className : 'maintenance',
    template : _.template($('#maintenance-list-tpl').html()),
    
    initialize: function(){
        this.model.bind('destroy', this.close, this);
        console.log(this.model);
    },

    render: function(){
        console.log('itemview render');
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        'click .savemaintenance': 'savemaintenance',
        'click .deletemaintenance': 'deletemaintenance'
    },

    savemaintenance: function(){
        alert('savemaintenance');
    },

    deletemaintenance: function(){
        alert('deletemaintenance');
    },

    close: function(){
        console.log('itemview close');
        $(this.el).unbind();
        $(this.el).remove();
    }
});
