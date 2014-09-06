window.MaintenanceListView = Backbone.View.extend({
//Generates maintenance history
    tagName: 'ul',
    template: _.template($('#maintenance-tpl').html()),
    
    initialize: function(){
        // grab the vehicle ID from the custom meta attribute in the collection
        this.vehicleID = this.model._meta["vehicleid"];

        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function(maintenance){
            $(self.el).append(new maintenanceView({model: maintenance}).render().el);
        }, this);
        return this;
    },
    
    render: function(){
        console.log('listview render');
        $(this.el).html(this.template);
        _.each(this.model.models, function(maintenance){
            $(this.el).append(new MaintenanceView({model: maintenance}).render().el);
        }, this);
        return this;
    },
    
    events: {
        'click .closemaintenance' : 'close',
        'click .addmaintenance' : 'add'
    },

    add : function(){
        maintenanceview = new MaintenanceView({model:new Maintenance()});
        // connect the new maintenance record to the vehicle
        maintenanceview.model.set('vehicleid', this.vehicleID);
        $('#maintenance ul').append(maintenanceview.render().el);
        return false;  
    },
    
    close: function(){
        console.log('listView close');
        $(this.el).unbind();
        $(this.el).remove();
    }
});
