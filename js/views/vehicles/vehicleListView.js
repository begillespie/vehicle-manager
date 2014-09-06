window.vehicleListView = Backbone.View.extend({
//Generates the list of vehicles
    tagName: 'ul',
    className: 'list-group',

    initialise: function(){
        this.model.bind("reset", this.render, this);
        var self = this;
/*        this.model.bind("add", function(veh){
            $(self.el).append(new vehicleView({model: veh}).render().el);
        }, this);
        return this;
//*/
    },

    render: function(){
        console.log('vehicleListView render');
        _.each(this.model.models, function(veh){
            $(this.el).append(new vehicleView({model: veh}).render().el);
        }, this);
        return this;
    }
 });
