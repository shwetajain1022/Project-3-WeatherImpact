const url = "http://127.0.0.1:5000/api/v1.0/";
let city_list = [];
//declare samples array 
let samples = [];

//get the dropdown element 
let d3cityselect = d3.select("#selCityDataset");

let d3yearselect = d3.select("#selYearDataset");

d3.select("#selCityDataset").on("change", updateGraph);
d3.select("#selYearDataset").on("change", updateGraph);

function updateGraph()
{
    let city_name = d3.select("#selCityDataset").property("value");
    let weather_year = d3.select("#selYearDataset").property("value");

    console.log(city_name);
    console.log(weather_year);
    drawBarGraph(city_name,weather_year);
}

//Function to initialize the first landing web page
function init() {
    let urlcities = url + "city"
    let urlyear = url + "year"
    //get the city json data
    d3.json(urlcities).then(function (data) {
        //get the samples
        city_list = data;

        //update to dropdown menu with sample ids list
        var options = d3cityselect.selectAll("option")
            .data(city_list)
            .enter()
            .append("option");
        options.text(function (datavalue) {
            return datavalue;
        })
            .attr("value", function (datavalue) {
                return datavalue;
            });
        //change the bar chart and bubble chart
        updateGraph();
    });
    //get the year json data
    d3.json(urlyear).then(function (data) {
        //get the samples
        year_list = data;

        //update to dropdown menu with sample ids list
        var options = d3yearselect.selectAll("option")
            .data(year_list)
            .enter()
            .append("option");
        options.text(function (datavalue) {
            return datavalue;
        })
            .attr("value", function (datavalue) {
                return datavalue;
            });
        //change the bar chart and bubble chart
        updateGraph();
    });
}


//Calling Init function to display charts for the first OTUs
init();

//function to create bubble chart
function drawBarGraph(city_name) {
    //get the url graph
    let urlBarGraph = ""
    urlBarGraph = url+"weather/"+city_name
    // if(weather_year=="All")
    // {
    //     urlBarGraph = url+"weather/"+city_name
    // }
    // else
    // {
    //     urlBarGraph = url+"weather/"+city_name+"/"+weather_year
    // }
    console.log(urlBarGraph)

    d3.json(urlBarGraph).then(function (data) {
        var rainfall_arr = [];
        var MaxTemp_arr =[];
        var MinTemp_arr=[];
        var weatherdates = [];
        console.log(data);
        for (var value of data) {
            console.log(value["date"]);
            console.log(value["Rainfall"]);
            console.log(value["maxtemp"]);
            console.log(value["mintemp"]);
            rainfall_arr.push(value["Rainfall"]);
            MaxTemp_arr.push(value["maxtemp"]);
            MinTemp_arr.push(value["mintemp"]);
            weatherdates.push(value["date"]);
        }
        // //CREATE trace variable
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Max Temp",
            x: weatherdates,
            y: MaxTemp_arr,
            line:{color:'#FF0000'}
        }
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: "Min Temp",
            x: weatherdates,
            y: MinTemp_arr,
            line:{color:'#0000FF'}  
        }
        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: "Rainfall",
            x: weatherdates,
            y: rainfall_arr,
            line:{color:'#006600'}
        }
        var graph = [trace1,trace2,trace3];
        //Set the layout
        var layout = {
            title: "Date vs. Temperature Extremes",
            xaxis: {
                autorange: true,
                range: ['2007-01-01', '2023-04-01'],
                raneselector: {button: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {step: 'all'}
                ]},
                rangeslider: {range: ['2007-01-01', '2023-04-01']},
                type: 'date'

            },
            yaxis: {
                autorange: true,
                range: [-10,50],
                type: 'linear'

            }
        };
        //Plot the Graph
        Plotly.newPlot("plot", graph, layout);
    });
}

