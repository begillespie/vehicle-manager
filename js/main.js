requirejs.config({
//    baseUrl: '/js',
    paths: {
        jquery    : 'lib/jquery-1.11.1.min',
        underscore: 'lib/underscore-min',
        bootstrap : 'lib/bootstrap.min',
        backbone  : 'lib/backbone-min',
        text      : 'lib/text',
        chart     : 'lib/Chart.min',
        moment    : 'lib/moment'
    }
});

require([
    'app',
], function(App){
    App.initialize();
});
