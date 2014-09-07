define([
        'jquery',
        'underscore',
        'backbone',
        'router'
], function($, _, Backbone, AppRouter){
    var initialize = function(){
        console.log('app.js');
        AppRouter.initialize();
    }

    return{initialize: initialize};
});
