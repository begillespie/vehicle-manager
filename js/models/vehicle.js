define([
    'jquery',
    'underscore',
    'backbone',
    'config'
], function($, _, Backbone, db){
    var Vehicle = Backbone.Model.extend({
    // Basic model for a vehicle
        // Tie the model id to the CouchDB id
        idAttribute: "_id",
        urlRoot: db.root,
        
        defaults: {
            make   : "",
            model  : "",
            year   : "",
            color  : "",
            plate  : "",
            state  : "",
            vin    : "",
            type   : "vehicle"
        },

        //todo: implement validation
    });
    
    var VehicleCollection = Backbone.Collection.extend({
        model: Vehicle,
        url: db.app.vehicles,

        // parse function fixes the CouchDB response so Backbone will read it.
        parse: function (response) {
            return _.map(response.rows, function(obj){
                obj.value.id = obj.value._id
                return obj.value;
            });
        }
    });

    return {
        Model : Vehicle,
        Collection: VehicleCollection
    };
});
