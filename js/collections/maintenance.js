window.Maintenance = Backbone.Model.extend({
    idAttribute : '_id',

    urlRoot : '../couchdb/mileage',

    defaults: {
        "date"      : "",
        "scheduled" : "",
        "vendor"    : "",
        "cost"      : "",
        "notes"     : "",
        "vehicleid" : "",
        "type"      : "maintenance"
    }
});


window.MaintenanceCollection = Backbone.Collection.extend({
    model: Maintenance,

    // The URL option filters the list by a specific vehicle id
    initialize: function(models, options){
        this.url = '../couchdb/mileage/_design/app/_view/maintenance?key="'+options.id+'"';
        this._meta = {}
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
