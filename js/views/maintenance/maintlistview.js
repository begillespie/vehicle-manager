define([
    'jquery',
    'underscore',
    'backbone',
    'views/maintenance/maintview',
    'models/maintenance',
    'text!tpl/t_maintlist.html'
], function($, _, Backbone, MaintView, Maintenance, template){
    var MaintenanceListView = Backbone.View.extend({
    //Generates maintenance history
        tagName: 'ul',
        template: _.template(template),
        
        initialize: function(){
            // grab the vehicle ID from the custom meta attribute in the collection
            this.vehicleID = this.model._meta["vehicleID"];
            this.model.bind("reset", this.render, this);
            var self = this;
//            this.model.bind("change", this.render, this);
    /*        this.model.bind("add", function(maint){
                $(self.el).prepend(new maintView({model: maint}).render().el);
            }, this);
            return this;
    //*/
        },
        
        render: function(){
            $(this.el).html(this.template);
            _.each(this.model.models, function(maint){
                $(this.el).append(new MaintView({model: maint}).render().el);
                this.createDatePicker();
            }, this);
            return this;
        },
        
        events: {
            'click .addmaint' : 'add'
        },

        add : function(){
            console.log('add maintenance record');
            maintview = new MaintView({
                model:new Maintenance.Model({vehicleid: this.vehicleID})
            });
            $('#maintenance-list').prepend(maintview.render().el);
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

    return MaintenanceListView;
});
