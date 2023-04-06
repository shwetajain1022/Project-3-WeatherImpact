const url = "http://127.0.0.1:5000/api/v1.0/";
let city_list = [];
//declare samples array 
let samples = [];

//get the dropdown element 
let d3cityselect = d3.select("#selCityDataset");

let d3yearselect = d3.select("#selYearDataset");

//Function to initialize the first landing web page
function init() {
    let urlcities = url + "city"
    let urlyear = url + "year"
    //get the city json data
    d3.json(urlcities).then(function (data) {
        //get the samples
        city_list = data;
        //get the list of the sample ids
        //sample_id_list = samples.map(x => x.id)
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
        //optionChanged(sample_id_list[0]);
    });
    //get the year json data
    d3.json(urlyear).then(function (data) {
        //get the samples
        year_list = data;
        //get the list of the sample ids
        //sample_id_list = samples.map(x => x.id)
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
        //optionChanged(sample_id_list[0]);
    });
}


//Calling Init function to display charts for the first OTUs
init();



