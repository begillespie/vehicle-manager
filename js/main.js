requirejs.config({
//    baseUrl: '/js',
    paths: {
        jquery    : 'lib/jquery-1.11.1.min',
        underscore: 'lib/underscore-min',
        bootstrap : 'lib/bootstrap.min',
        backbone  : 'lib/backbone-min',
        chart     : 'lib/Chart.min'
    }
});

require([
    'app',
], function(App){
    console.log('main.js');
    App.initialize();
});
