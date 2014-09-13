define(['jquery','chart'],

function($, Chart){
    var insertCharts = function(data, options, element){
        var canvas = document.getElementById(element);
        console.log(canvas);
        canvas.width = $("#detail-mileage-chart").width();
        canvas.height = $("#detail-mileage-chart").height();
        console.log(canvas.width, canvas.height);
        var ctx = document.getElementById(element).getContext('2d');
        var chart = new Chart(ctx).Line(data, options);
    };

    return insertCharts;
});
