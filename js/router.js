define([
        'jquery',
        'underscore',
        'backbone',
        'views/headerView',
        'views/homeView',
        'models/vehicle',
        'views/vehicles/vehicleListView',
        'views/vehicles/vehicleDetailView'
], function($, _, Backbone, HeaderView, HomeView, Vehicle, vehicleListView, vehicleDetailView){

    var AppRouter = Backbone.Router.extend({
        routes: {
            ""             : "home",
            "vehicles/new" : "newVehicle",
            "vehicles/:id" : "vehicle"
        },
    
        initialize: function(){
            $('#header').html(new HeaderView().el);
        },

        home: function(){
            var self = this;
            $('#vehicle-detail').html(new HomeView().el);
            self.vehicleList = new Vehicle.Collection();
            self.vehicleList.fetch({
                success: function(){
                    self.VehicleListView = new vehicleListView({model: self.vehicleList});
                    $('#main-list').html(self.VehicleListView.render().el);
                    if(self.requestID) self.vehicle(self.requestID);
                }
            });

        },

        vehicle: function(id){
            if(this.vehicleList){
                this.vehicle = this.vehicleList.get(id);
                if(this.vehicleDetailView){
                    this.vehicleDetailView.close();
                };
                this.vehicleDetailView = new vehicleDetailView({model:this.vehicle});
                $('#vehicle-detail').html(this.vehicleDetailView.render().el);
            } else {
                this.requestID = id;
                this.home();
            }
        },

        newVehicle: function(){
            if(this.vehicleDetailView) this.vehicleDetailView.close();
            this.vehicleDetailView = new vehicleDetailView({model:new Vehicle.Model()});
            $('#vehicle-detail').html(this.vehicleDetailView.render().el);
        }

    });

    var initialize = function(){
        var app = new AppRouter();
        Backbone.history.start();
    }
    
    return {initialize: initialize};
});
