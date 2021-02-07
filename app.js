
// Drop Down Menu **Function**
function populateDropdown() {
    var dropdownValues = d3.csv('CountyResultsClean.csv').then((data) => {
        var id = data.map(row => row.County);
        console.log(id);
        
    
    var select = d3.select("#selDataset");
        id.forEach((id) =>{
            select.append("option")
            .text(id)
            .property("value", id)
        });
        buildPlot("ADAMS");  // intial page will load Canada, this was eliminated, instead init function was created.
    })
        
      }

populateDropdown();


// Menu Option Change **Function**
function optionChanged() {

    // Clears the data of the current page   
    d3.select("#vis").html("");
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node().value;
        console.log(dropdownMenu);
  
    buildPlot(dropdownMenu);
  
  }

  function buildPlot(county){
  
    Plotly.d3.csv("CountyResultsClean.csv", function(err, rows){
      console.log(rows);
      console.log(county);
      //COUNTY INFO 2020
      var countyFilter = rows.filter(row => row.County == county)
      console.log(countyFilter);

      var countyPop = parseInt(countyFilter.map(row => row.population));
      console.log(countyPop);

      var countyDem = parseInt(countyFilter.map(row => row.DemVotes));
      console.log(countyDem);

      var countyRep = parseInt(countyFilter.map(row => row.RepVotes));
      console.log(countyRep);

      var countyTotalVotes = countyDem + countyRep;
      console.log(countyTotalVotes);

    // STATE 2020
      var stateTotalDem = parseInt(countyFilter.map(row => row.Total_Dem_Votes));
      console.log(stateTotalDem);

      var stateTotalRep = parseInt(countyFilter.map(row => row.Total_Rep_Votes));
      console.log(stateTotalRep);

      var stateTotalVotes = stateTotalDem + stateTotalRep;
      console.log(stateTotalVotes);

      //VOTE % - maybe change this to over 18 2020
      var percentVote = (countyTotalVotes / countyPop) * 100;
      console.log(percentVote)
      // percent

      //COUNTY 2016/////
      var countyDem16 = parseInt(countyFilter.map(row => row.DemVotes2016));
      console.log(countyDem16);

      var countyRep16 = parseInt(countyFilter.map(row => row.RepVotes2016));
      console.log(countyRep16);

      var countyTotalVotes16 = countyDem16 + countyRep16;
      console.log(countyTotalVotes16);

      var countyPop16 = parseInt(countyFilter.map(row => row.population2016));
      console.log(countyPop16);

      //Difference
      var demDiff = (countyDem - countyDem16);
      console.log(demDiff);

      var popDiff = (countyPop - countyPop16);
      console.log(popDiff);
      
    //PIE 2020

        var pieValues = [countyDem, countyRep]
        var pieColors = ['#80aaff', '#FA8072']
      var trace1 = {
          type: 'pie',
          labels: ["Biden/Harris", "Trump/Pence"],
          values: pieValues,
          type: 'pie',
          marker: {
              colors: pieColors
          }
      }

      var data1 = [trace1]

      var layout1 = {
        title: `Percentage of Democractic/Republican Votes 2020`
      };
  
      Plotly.newPlot('pie', data1, layout1);

      // Bar charr total votes 2020
      var barValues = [countyDem, countyRep]
      var trace2 = {
        x: ['Biden','Trump'],
        y: barValues,
        labels: barValues,
        type: 'bar',
        marker: {
            color: ['#1aa3ff','#ff5050']
        }
      };


      var data2 = [trace2];
      var layout2 = {
        title: `Democractic/Republican Votes 2020`
      };


      Plotly.newPlot('gauge', data2, layout2);

      // 2016Results
      var pieValues = [countyDem16, countyRep16]
        var pieColors = ['#80aaff', '#FA8072']
      var trace3 = {
          type: 'pie',
          labels: ["Clinton/Kaine", "Trump/Pence"],
          values: pieValues,
          type: 'pie',
          marker: {
              colors: pieColors
          }
      }

      var data3 = [trace3]

      var layout3 = {
        title: `Percentage of Democractic/Republican Votes 2016`
      };
  
      Plotly.newPlot('pie2', data3, layout3);

      //2016 barValues
      var barValues16 = [countyDem16, countyRep16]
      var trace4 = {
        x: ['Clinton','Trump'],
        y: barValues16,
        labels: barValues16,
        type: 'bar',
        marker: {
            color: ['#1aa3ff','#ff5050']
        }
      };


      var data4 = [trace4];
      var layout4 = {
        title: `Democractic/Republican Votes 2016`
      };


      Plotly.newPlot('bar2', data4, layout4);
      // 
      function winner(winner) { 
      if (countyDem > countyRep) {
          winner = "Biden/Harris"
      } else {
          winner = "Trump/Pence"
      }
      return winner;
    }

    winner(winner);

    function winner16(winner16) { 
        if (countyDem16 > countyRep16) {
            winner16 = "Clinton/Kaine"
        } else {
            winner16 = "Trump/Pence"
        }
        return winner16;
      }
  
      winner16(winner16);

      function countyFlip(countyFlip) {
          if (countyDem16 > countyRep16 && countyDem > countyRep) {
              countyFlip = "No"
          } else if (countyRep16 > countyDem16 && countyRep > countyDem) {
              countyFlip = "No"
          }
          else {
              countyFlip = "Yes"
          }
          return countyFlip;
      }

      countyFlip(countyFlip);


      //
      var numberFormat = d3.format(",");
      var percentFormat = d3.format(",.2f");

      var demData = d3.select('#sample-metadata');
        demData.html('');
    
    demData.append("li").html(`<b>Population:</b> ${numberFormat(countyPop)}`)
    demData.append("li").html(`<b>Dem Votes:</b> ${numberFormat(countyDem)}`)
    demData.append("li").html(`<b>Rep Votes:</b> ${numberFormat(countyRep)}`)
    //demData.append("li").html(`<b>% of Population Voted:</b> ${percentFormat(percentVote)}%`) //this is all ages and not including third parties
    // demData.append("li").html(`<b> Winner 2020:</b> ${winner(winner)}`)
    // demData.append("li").html(`<b> Winner 2016:</b> ${winner16(winner16)}`)
    // demData.append("li").html(`<b> Flipped:</b> ${countyFlip(countyFlip)}`)

    var demData16 = d3.select('#sample-metadata16');
        demData16.html('');
    demData16.append("li").html(`<b>Population:</b> ${numberFormat(countyPop16)}`)
    demData16.append("li").html(`<b>Dem Votes:</b> ${numberFormat(countyDem16)}`)
    demData16.append("li").html(`<b>Rep Votes:</b> ${numberFormat(countyRep16)}`)
    //demData16.append("li").html(`<b> Winner 2016:</b> ${winner16(winner16)}`)

    var dataCompare = d3.select('#sample-comparison');
        dataCompare.html('');
    dataCompare.append("li").html(`<b> Winner 2020:</b> ${winner(winner)}`)
    dataCompare.append("li").html(`<b> Winner 2016:</b> ${winner16(winner16)}`)
    dataCompare.append("li").html(`<b> Flipped:</b> ${countyFlip(countyFlip)}`)
    dataCompare.append("li").html(`<b> Population Difference:</b> ${numberFormat(popDiff)}`)
    })
}
