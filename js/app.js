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
function drawBarGraph(city_name,weather_year) {
    //get the url graph
    let urlBarGraph = ""
    if(weather_year=="All")
    {
        urlBarGraph = url+"location/"+city_name
    }
    urlBarGraph = url+"location/"+city_name
    console.log(urlBarGraph)
    d3.json(urlBarGraph).then(function (data) {
        let rainfall_dataset = data.filter(rainfall => rainfall.City == "Sydney");
        let rainfall = rainfall_dataset[0].Rainfall;
        let weatherdate = rainfall_dataset[0].date;
        //CREATE trace variable
        var trace1 = {
            x: weatherdate,
            y: rainfall,
            //text: otu_labels,
            mode: 'markers',
            type: "bar"
        };
        //Set the layout
        let layout = {
            title: "Date v/s Rain"
        };
        //Plot the Graph
        Plotly.newPlot("plot", [trace1], layout);
    });
}

