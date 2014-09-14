define(function(){
    var dbroot = '/couchdb/mileage'

    var designApp = '/app',
        designStats = '/stats',
        viewAppFuel = '/fuel',
        viewAppMaint = '/maintenance',
        viewAppVeh = '/vehicles',
        viewStatsEcon = '/fueleconomy',
        viewStatsStats = '/stats'

    var db = {
        root: dbroot,
        app: {
            fuel: dbroot+'/_design'+designApp+'/_view'+viewAppFuel,
            maint: dbroot+'/_design'+designApp+'/_view'+viewAppMaint,
            vehicles: dbroot+'/_design'+designApp+'/_view'+viewAppVeh,
        },
        stats: {
            fueleconomy: dbroot+'/_design'+designStats+'/_view'+viewStatsEcon,
            stats: dbroot+'/_design'+designStats+'/_view'+viewStatsStats
        }
    }
    return db;
});
