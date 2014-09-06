window.fuelView = Backbone.View.extend({
    tagName : 'li',
    className : 'fuel',

    template : _.template($('#fuel-list-tpl').html()),
    
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
            date : $('#date').val(),
            mileage: $('#mileage').val(),
            gallons : $('#gallons').val(),
            cost : $('#cost').val(),
            type : 'fuel'
            });
        if(this.model.isNew()){
            app.fuelList.create(this.model);
            } else {
                this.model.save();
                }
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
