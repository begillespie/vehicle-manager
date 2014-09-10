define([
    'jquery',
    'underscore',
    'backbone',
    'lib/moment',
    'lib/bootstrap-datetimepicker',
    'models/maintenance',
    'text!tpl/t_maintitem.html'
], function($, _, Backbone, moment, datetimepicker, Maintenance, template){
    var MaintenanceView = Backbone.View.extend({
        tagName : 'li',
        className : 'maintenance',
        template : _.template(template),
        
        initialize: function(){
            this.createDatePicker();
            this.model.bind('destroy', this.close, this);
        },

        render: function(){
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

    return MaintenanceView;
});
