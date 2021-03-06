define([
    'jquery',
    'underscore',
    'backbone',
    'config'
], function($, _, Backbone, db){
    var Fuel = Backbone.Model.extend({
    // Model for a fuel record
        //Tie the model id to the CouchDB id
        idAttribute: '_id',

        urlRoot: db.root,
        defaults: {
            date      : "",
            gallons   : "",
            mileage   : "",
            cost      : "",
            vehicleid : "",
            type      : "fuel"
        }
    });

    var FuelCollection = Backbone.Collection.extend({
        model: Fuel,

        // The URL option filters the list by a specific vehicle id
        initialize: function(models, options){
            this.url = db.app.fuel+'?key="'+options.id+'"';
            this._meta = {};
        },

        comparator: function(m){
//            return -Date.parse(m.get('date'));
            return -m.get('mileage'); // tried sorting on mileage to catch the case of more than one fillup in a day
        },

        // parse function fixes the CouchDB response so Backbone will read it.
        parse: function (response) {
            return _.map(response.rows, function(obj){
                obj.value.id = obj.value._id
                return obj.value;
            });
        },

        // custom metadata get/set. This will be used to store the vehicleid of the
        //      collection of records fetched.
        meta: function(prop, value){
            if(value === undefined){
                return this._meta[prop]
            }else{
                this._meta[prop] = value;
            }
        }
    });

    return {
        Model: Fuel,
        Collection: FuelCollection
    };
});
