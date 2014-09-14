define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
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
            // set the radio button
            if(this.model.get('scheduled') == 'true'){
                this.$('#scheduled').prop('checked','checked');
            } else if (this.model.get('scheduled') == 'false') {
                this.$('#unscheduled').prop('checked','checked');
            }
            console.log(this.el);
            return this;
        },

        events: {
            'click .savemaintenance': 'savemaintenance',
            'click .deletemaintenance': 'deletemaintenance'
        },

        savemaintenance: function(){
            this.model.set({
                _rev : this.model.get('_rev'),
                date : $(this.el).find('#date').val(),
                scheduled: $(this.el).find('input:radio[name=scheduled]:checked').val(),
                vendor: $(this.el).find('#vendor').val(),
                mileage: $(this.el).find('#mileage').val(),
                cost : $(this.el).find('#cost').val(),
                notes: $(this.el).find('#notes').val(),
                type : 'maintenance'
                }); 
            this.model.save();
            return false;
        },

        deletemaintenance: function(){
            this.model.destroy({
                url: this.model.url()+'?rev='+this.model.get('_rev'),
                success: function(){
                    alert('Maintenance record deleted');
                    window.history.back();
                }
            });
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

    return MaintenanceView;
});
