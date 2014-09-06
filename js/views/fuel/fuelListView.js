window.FuelListView = Backbone.View.extend({
//Generates fuel history
    tagName: 'ul',
    template: _.template($('#fuel-tpl').html()),
    
    initialize: function(){
        // grab the vehicle ID from the custom meta attribute in the collection
        this.vehicleID = this.model._meta["vehicleID"];
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("change", this.render, this);
/*        this.model.bind("add", function(fuel){
            $(self.el).prepend(new fuelView({model: fuel}).render().el);
        }, this);
        return this;
//*/
    },
    
    render: function(){
        $(this.el).html(this.template);
        _.each(this.model.models, function(fuel){
            $(this.el).append(new fuelView({model: fuel}).render().el);
            this.createDatePicker();
        }, this);
        return this;
    },
    
    events: {
        'click .closefuel' : 'close',
        'click .addfuel' : 'add'
    },

    add : function(){
        fuelview = new fuelView({
            model:new Fuel({vehicleid: this.vehicleID})
        });
        $('#fuel-list').prepend(fuelview.render().el);
        this.createDatePicker();
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
