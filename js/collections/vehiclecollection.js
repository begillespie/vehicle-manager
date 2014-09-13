define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'js/models/vehicle.js'
], function($, _, Backbone, Vehicle){
    var VehicleCollection = Backbone.Collection.extend({
        model: Vehicle,
        url: '../couchdb/mileage/_design/app/_view/vehicles',

        // parse function fixes the CouchDB response so Backbone will read it.
        parse: function (response) {
            return _.map(response.rows, function(obj){
                obj.value.id = obj.value._id
                return obj.value;
            });
        }
    });

    return VehicleCollection;
});
