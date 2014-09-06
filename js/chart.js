google.load('visualization', '1.0', {'packages':['corechart']});

$(document).ready(function(){
    window.insertCharts = function(chartColumns, chartRows, chartOptions, chartEL){
// parameters:
// chartColumns-- array of datatype and title of the columns: [{type: 'type', title: 'title'}, {...}, ...]
// chartRows-- array containing arrays for each row of data. Rows must correspond to the columns
// chartOptions-- Options object. See Google Charts documentation
// chartEL-- id of the element the chart is going into

        google.setOnLoadCallback(drawChart(chartColumns, chartRows, chartOptions, chartEL));

        function drawChart(chartColumns, chartRows, chartOptions, chartEL){
            var data = new google.visualization.DataTable();

            for(i=0; i<chartColumns.length; i++){
                data.addColumn(chartColumns[i].type, chartColumns[i].title);
            };
            data.addRows(chartRows);

            var chart = new google.visualization.LineChart(document.getElementById(chartEL));
            chart.draw(data, chartOptions);
        
        }
    }
});
