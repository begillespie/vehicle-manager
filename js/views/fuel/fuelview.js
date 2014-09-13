define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'lib/bootstrap-datetimepicker',
    'models/fuel',
    'text!tpl/t_fuelitem.html'
], function($, _, Backbone, moment, datetimepicker, Fuel, template){
    var FuelView = Backbone.View.extend({
        tagName : 'li',
        className : 'fuel',
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
            'click .savefuel': 'savefuel',
            'click .deletefuel': 'deletefuel'
        },

        savefuel: function(){
            this.model.set({
                _rev : this.model.get('_rev'),
                date : $(this.el).find('#date').val(),
                mileage: $(this.el).find('#mileage').val(),
                gallons : $(this.el).find('#gallons').val(),
                cost : $(this.el).find('#cost').val(),
                type : 'fuel'
                });
            this.model.save();
            return false;
        },

        deletefuel: function(){
            this.model.destroy({
                url: this.model.url()+'?rev='+this.model.get('_rev'),
                success: function(){
                    alert('Fuel record deleted');
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

    return FuelView;
});
