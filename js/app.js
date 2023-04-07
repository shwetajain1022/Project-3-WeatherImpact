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
    //get the top 10 OTU ids for a given sample
    d3.json(url).then(function (data) {
        //Filter sample
        let sample = samples.filter(sample => sample.id == sampleid);
        let otu_id = sample[0].otu_ids;
        //get top 10 otu ids
        let otu_ids = otu_id.slice(0, 10);
        //get top 10 sample values
        let sample_values = sample[0].sample_values.slice(0, 10);
        //get top 10 otu labels
        let otu_labels = sample[0].otu_labels.slice(0, 10);
        var otu_ids_list_str = otu_id.map(function (x) {
            return "OUT " + x;
        });
        //CREATE trace variable
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        //create array of trace variable
        var dataBubble = [trace1];

        //Create layout variable
        var layout = {
            title: 'OTU ids per sample',
            showlegend: false,
            // height: 600,
            // width: 600
        };

        //Create the Plot
        Plotly.newPlot('bubble', dataBubble, layout);
    });

}

