define([
        'jquery',
        'underscore',
        'backbone',
        'router'
], function($, _, Backbone, AppRouter){
    var initialize = function(){
        AppRouter.initialize();
    }

    return{initialize: initialize};
});
