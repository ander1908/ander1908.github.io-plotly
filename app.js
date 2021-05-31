// Load in Json file
function init(patient) {


d3.json("../../data/samples.json").then(function(jsonData){
  console.log("Initial Array",jsonData);
  var data = jsonData;
  var samples = jsonData.samples;
  var metadata=jsonData.metadata;
  console.log(samples);
  var filtID = samples.filter(bac => bac.id == patient)[0];
  console.log("filteredID",filtID);
  //similar to D3A2
  var selector = d3.select("#selDataset");
  console.log("test",jsonData.names);
  console.log("otu_ids",jsonData.samples[0].otu_ids);
  console.log("otu_labels",jsonData.samples[0].otu_labels);
  console.log("Samples",jsonData.samples[0].sample_values);
   // Need to select the option from the dropdown
   // 1. Create list (names)
   data.names.forEach(function(name){
     selector.append("option").text(name);
   });

   var metadata = data.metadata;
   console.log("metadata",metadata)


  //grab values -> slice top 10 -> to match image given flip it (and reverse it https://youtu.be/cjIvu7e6Wq8)
   var samp = filtID.sample_values.slice(0,10).reverse();
   //var samp2 = data.samples[0].sample_values.slice(0,10);
   var otu_ids = filtID.otu_ids.slice(0,10).reverse().map(id => "OTU " + id);
   var otu_ids2 = filtID.otu_ids.slice(0,10).reverse();

   var otuLabels = filtID.otu_labels.slice(0,10).reverse();
   //var otuLabels2 = data.samples[0].otu_labels.slice(0,10);


   console.log(otu_ids);
   console.log(otuLabels);
   console.log(samp);

  var trace1 = {
    x: samp,
    y: otu_ids,
    type: "bar",
    name: "Belly Button Diversity",
    orientation: "h",
    text: otuLabels

  };

   var chartData = [trace1];

  // Define the plot layout
  var layout = {
    title: "Belly Button ",
    height: 800,
    width: 1200,
  };

  // Plot the chart to a div tag with id "bar"
  Plotly.newPlot("bar", chartData, layout);
//https://plotly.com/javascript/bubble-charts/
//keep same variables only change the IDs. Take name out keep # so plotly organizes
  var trace2 = {
    x: otu_ids2,
    y: samp,
    mode: "markers",
    text: otuLabels,
    marker: {
      size: samp,
      color: otu_ids2}

    };

   var chartData2 = [trace2];

  // Define the plot layout
  var layout2 = {
    title: "Belly Button Bubble Chart",
    xaxis: {
      title: "OTU_ID"
    },
    yaxis: {
      title: "Sample_Value"
    },
    showlegend: false,
    height: 800,
    width: 1200,
  };

  // Plot the chart to a div tag with id "bubble*"
  Plotly.newPlot("bubble", chartData2, layout2);

  

})};

init();

function demographic(patient) {
  var infobox = d3.select("#sample-metadata");
  d3.json("../../data/samples.json").then(jsonData => {
    
      var metadata = jsonData.metadata;
      var filtMD = metadata.filter(bac => bac.id == patient)[0];
      Object.entries(filtMD).forEach(([key, value]) => {
          infobox.append("p").text(`${key}: ${value}`);
      })


  })
}
//HTML L25 option changed
function optionChanged(patient) {
  init(patient);
  demographic(patient);
  
}

function initchange() {
  var dropdown = d3.select("#selDataset");
      d3.json("../../data/samples.json").then(jsonData => {
        var patient = jsonData.names;
          patient.forEach(patient => {
          dropdown.append("option").text(patient).property("value", patient)
      });
    init(patient[0]);
    demographic(patient[0]);
  });
};

initchange();
