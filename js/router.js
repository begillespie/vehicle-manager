define([
        'jquery',
        'underscore',
        'backbone',
        'views/headerView',
        'models/vehicle',
        'views/vehicles/vehicleListView',
        'views/vehicles/vehicleDetailView'
], function($, _, Backbone, HeaderView, Vehicle, vehicleListView, vehicleDetailView){

    var AppRouter = Backbone.Router.extend({
        routes: {
            ""             : "home",
            "vehicles/new" : "newVehicle",
            "vehicles/:id" : "vehicle"
        },
    
        initialize: function(){
            console.log('initialize router');
            $('#header').html(new HeaderView().el);
        },

        home: function(){
            console.log('home route');
            var self = this;
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
            console.log('newVehicle');
            if(this.vehicleDetailView) this.vehicleDetailView.close();
            this.vehicleDetailView = new vehicleDetailView({model:new Vehicle.Model()});
            $('#vehicle-detail').html(this.vehicleDetailView.render().el);
        },

        maintenance: function(vehicleid){
            this.maintenanceList = new MaintenanceCollection([], {'id':vehicleid});
            var self = this;
            this.maintenanceList.fetch({
                success: function(){
                    this.maintenanceListView = new MaintenanceListView({model: self.maintenanceList})
                    $('#maintenance').html(maintenanceListView.render().el);
                }
            })
        }

    });

    var initialize = function(){
        var app = new AppRouter();
        Backbone.history.start();
    }
    
    return {initialize: initialize};
});
