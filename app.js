// Populate Dropdown
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
        buildPlot("ADAMS");  // Initialize page with Adams County Data
    })
        
      }

populateDropdown();

// Option Changed
function optionChanged() {

    // Clear the data of the current page   
    d3.select("#vis").html("");
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset").node().value;
        console.log(dropdownMenu);
  
    buildPlot(dropdownMenu);
  
  }

// Build Plot
function buildPlot(county){
    // Load in data
    Plotly.d3.csv("CountyResultsClean.csv", function(err, rows){
      console.log(rows);
      console.log(county);
      //Set County Filter
      var countyFilter = rows.filter(row => row.County == county)
      console.log(countyFilter);

      // COUNTY INFO 2020
      var countyPop = parseInt(countyFilter.map(row => row.population));
      console.log(countyPop);

      var countyDem = parseInt(countyFilter.map(row => row.DemVotes));
      console.log(countyDem);

      var countyRep = parseInt(countyFilter.map(row => row.RepVotes));
      console.log(countyRep);

      //COUNTY THIRD PARTY 2020
      var countyLib = parseInt(countyFilter.map(row => row.LibVotes));
      console.log(countyLib);

      var countyGreen = parseInt(countyFilter.map(row => row.GreenVotes));
      console.log(countyGreen);

      var countyOtherTP = parseInt(countyFilter.map(row => row.Total_TP_ExLibGreen));
      console.log(countyOtherTP);
      // COUNTY TOTAL VOTES 2020
      var countyTotalTP = countyLib + countyGreen + countyOtherTP;

      var countyTotalVotes = countyDem + countyRep + countyLib + countyGreen + countyOtherTP;
      console.log(countyTotalVotes);
      
      // STATE TOTALS 2020
      var stateTotalDem = parseInt(countyFilter.map(row => row.Total_Dem_Votes));
      console.log(stateTotalDem);

      var stateTotalRep = parseInt(countyFilter.map(row => row.Total_Rep_Votes));
      console.log(stateTotalRep);

      var stateTotalVotes = stateTotalDem + stateTotalRep;
      console.log(stateTotalVotes);

      // % OF POPULATION VOTING
      var percentVote = (countyTotalVotes / countyPop) * 100;
      console.log(percentVote)
      
      //COUNTY INFO 2016
      var countyDem16 = parseInt(countyFilter.map(row => row.DemVotes2016));
      console.log(countyDem16);

      var countyRep16 = parseInt(countyFilter.map(row => row.RepVotes2016));
      console.log(countyRep16);

      var countyPop16 = parseInt(countyFilter.map(row => row.population2016));
      console.log(countyPop16);

      //THIRD PARTY 2016
      var countyLib16 = parseInt(countyFilter.map(row => row.LibVotes16));
      console.log(countyLib16);

      var countyGreen16 = parseInt(countyFilter.map(row => row.GreenVotes16));
      console.log(countyGreen16);
      // COUNTY TOTAL VOTES 2016
      var countyOtherTP16 = parseInt(countyFilter.map(row => row.TP_TV2016_EXLIBGREEN));
      console.log(countyOtherTP16);

      var countyTotalTP16 = countyLib16 + countyGreen16 + countyOtherTP16;

      var countyTotalVotes16 = countyDem16 + countyRep16 + countyLib16 + countyGreen16 + countyOtherTP16;
      console.log(countyTotalVotes16);

      // DIFFERENCES 2016 vs 2020
      var demDiff = (countyDem - countyDem16);
      console.log(demDiff);

      var repDiff = (countyRep - countyRep16);
      console.log(repDiff);

      var libDiff = (countyLib - countyLib16);

      var greenDiff = (countyGreen - countyGreen16);

      var tpDiff = (countyOtherTP - countyOtherTP16);

      var popDiff = (countyPop - countyPop16);
      console.log(popDiff);

      var turnoutDiff = (countyTotalVotes - countyTotalVotes16);
      console.log(turnoutDiff);

      // DEMOGRAPHIC INFO 2019 ESTIMATES
      var perWhite = countyFilter.map(row => row.White_Total);
      console.log(perWhite);

      var perHispanic = countyFilter.map(row => row.Hispanic_Total);
      console.log(perHispanic);

      var perBlack = countyFilter.map(row => row.Black_Total);
      console.log(perBlack);

      var perAsian = countyFilter.map(row => row.Asian_Total);
      console.log(perAsian);

      var perAmericanIn = countyFilter.map(row => row.AI_Total);
      console.log(perAmericanIn);

      var countyPop17 = parseInt(countyFilter.map(row => row.population2017));
      console.log(countyPop17);

      var countyPop18 = parseInt(countyFilter.map(row => row.population2018));
      console.log(countyPop18);

      //PIE CHART: County Results 2020 
      var pieValues = [countyDem, countyRep, countyLib, countyGreen, countyOtherTP]
      var pieColors = ['#80aaff', '#FA8072', '#ffff66', '#80ffaa', '#ffcc66']
      
      var trace1 = {
        type: 'pie',
        labels: ["Biden", "Trump", "Jorgenson", 'Hawkins','Other Third Party'],
        values: pieValues,
        type: 'pie',
        marker: {
            colors: pieColors
        }
      };

      var data1 = [trace1];

      var layout1 = {
        title: `${county} County Results 2020`
      };
  
      Plotly.newPlot('pie', data1, layout1);

      //BAR CHART: Democractic vs Republican Votes 2020
      var barValues = [countyDem, countyRep]
      
      var trace2 = {
        x: ['Biden','Trump'],
        y: barValues,
        labels: barValues,
        type: 'bar',
        marker: {
            color: ['#4d94ff','#ff8080']
        }
      };

      var data2 = [trace2];

      var layout2 = {
        title: `Democractic vs. Republican Votes 2020`
      };

      Plotly.newPlot('bar', data2, layout2);

      //PIE CHART: County Results 2016
      var pieValues = [countyDem16, countyRep16, countyLib16, countyGreen16, countyOtherTP16]
      var pieColors = ['#80aaff', '#FA8072', '#ffff66', '#80ffaa', '#ffcc66']
      
      var trace3 = {
          type: 'pie',
          labels: ["Clinton", "Trump", "Johnson", "Stein", "Other Third Party"],
          values: pieValues,
          type: 'pie',
          marker: {
              colors: pieColors
        }
      };

      var data3 = [trace3];

      var layout3 = {
        title: `${county} County Results 2016`
      };
  
      Plotly.newPlot('pie2', data3, layout3);

      //BAR CHART: Democractic vs Republican Votes 2016
      var barValues16 = [countyDem16, countyRep16]
      
      var trace4 = {
        x: ['Clinton','Trump'],
        y: barValues16,
        labels: barValues16,
        type: 'bar',
        marker: {
            color: ['#4d94ff','#ff8080']
        }
      };

      var data4 = [trace4];

      var layout4 = {
        title: `Democractic vs. Republican Votes 2016`
      };

      Plotly.newPlot('bar2', data4, layout4);

      // Population Change Line Chart
      var popX = [countyPop16, countyPop17, countyPop18, countyPop]
      
      trace5 = {
        x: [2016, 2017, 2018, 2019],
        y: popX,
        mode: 'lines+markers',
        marker: {
          color: '#a3297a',
          size: 8
        },
        line: {
          color: '#cc3399',
          width: 3
        }
      };
      
      var data5 = [trace5];

      var layout5 = {
        title: `${county} County Population Change 2016-2019`,
        xaxis: {
          title: 'Year'
        },
        yaxis: {
          title: 'Population'
        }
      };

      Plotly.newPlot('line', data5, layout5)

      //Third Party Votes 2016 vs 2020
      var numberFormat = d3.format(",");
      var parties16 = [numberFormat(countyGreen16), numberFormat(countyLib16), numberFormat(countyOtherTP16)]
      var parties20 = [numberFormat(countyGreen), numberFormat(countyLib), numberFormat(countyOtherTP)]
      var yVal = ['Green Party', 'Libertarian Party', 'Other Third Party']
      
      var trace6 = {
        type: 'bar',
        x: yVal,
        y: parties16,
        text: parties16.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        name: '2016',
        marker: {
          color: '#009999'
        }
      };

      var trace7 = {
        type: 'bar',
        x: yVal,
        y: parties20,
        text: parties20.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        name: '2020',
        marker: {
          color: '#bf4080'
        }
      };

      var data6 = [trace6, trace7];

      var layout6 = {
        title: `${county} County Third Party Votes 2016 vs 2020`,
        yaxis: {
          title: 'Votes Cast'
        },
        xaxis: {
          tickangle: -0
        },
        barmode: 'group'
      };

      Plotly.newPlot('line2', data6, layout6)
      
      //FUNCTIONS
      //Winner 2020 Function
      function winner(winner) { 
        if (countyDem > countyRep) {
          winner = "Biden/Harris"
        } else {
          winner = "Trump/Pence"
        }
        return winner;
      }

      winner(winner);

      //Winner 2016 Function
      function winner16(winner16) { 
        if (countyDem16 > countyRep16) {
            winner16 = "Clinton/Kaine"
        } else {
            winner16 = "Trump/Pence"
        }
        return winner16;
      }
  
      winner16(winner16);

      // County Flip from 2016 Function
      function countyFlip(countyFlip) {
          if (countyDem16 > countyRep16 && countyDem > countyRep) {
              countyFlip = "No"
          } else if (countyRep16 > countyDem16 && countyRep > countyDem) {
              countyFlip = "No"
          }
          else if (countyDem > countyRep && countyDem16 < countyRep16) {
              countyFlip = "Flipped from Republican to Democratic"
          }
          else if (countyRep > countyDem && countyRep16 < countyDem16) {
            countyFlip = "Flipped from Democratic to Republican"
          }
          else {
            countyFlip = "N/A"
          }
          return countyFlip;
      }

      countyFlip(countyFlip);
    
      //Panel Information
      var numberFormat = d3.format(",");
      var percentFormat = d3.format(",.2f");

      //County Info 2020
      var demData = d3.select('#sample-metadata');
        demData.html('');
    
      demData.append("li").html(`<b>Population (2019):</b> ${numberFormat(countyPop)}`)
      demData.append("li").html(`<b>Democratic Votes:</b> ${numberFormat(countyDem)}`)
      demData.append("li").html(`<b>Republican Votes:</b> ${numberFormat(countyRep)}`)
      demData.append("li").html(`<b>Third Party Votes:</b> ${numberFormat(countyTotalTP)}`)
      demData.append("li").html(`<b>Total Votes:</b> ${numberFormat(countyTotalVotes)}`)
    
      //County Info 2016
      var demData16 = d3.select('#sample-metadata16');
        demData16.html('');
      demData16.append("li").html(`<b>Population (2016):</b> ${numberFormat(countyPop16)}`)
      demData16.append("li").html(`<b>Democratic Votes:</b> ${numberFormat(countyDem16)}`)
      demData16.append("li").html(`<b>Republican Votes:</b> ${numberFormat(countyRep16)}`)
      demData16.append("li").html(`<b>Third Party Votes:</b> ${numberFormat(countyTotalTP16)}`)
      demData16.append("li").html(`<b>Total Votes:</b> ${numberFormat(countyTotalVotes16)}`)

      //County Comparison 2016 vs 2020
      var dataCompare = d3.select('#sample-comparison');
        dataCompare.html('');
      dataCompare.append("li").html(`<b> Winner 2020:</b> ${winner(winner)}`)
      dataCompare.append("li").html(`<b> Winner 2016:</b> ${winner16(winner16)}`)
      dataCompare.append("li").html(`<b> Flipped from 2016:</b> ${countyFlip(countyFlip)}`)
      dataCompare.append("li").html(`<b> Population Difference:</b> ${numberFormat(popDiff)}`)
      dataCompare.append("li").html(`<b> Turnout Difference:</b> ${numberFormat(turnoutDiff)}`)
      dataCompare.append("li").html(`<b> Democractic Vote Difference:</b> ${numberFormat(demDiff)}`)
      dataCompare.append("li").html(`<b> Republican Vote Difference:</b> ${numberFormat(repDiff)}`)
      dataCompare.append("li").html(`<b> Libertarian Vote Difference:</b> ${numberFormat(libDiff)}`)
      dataCompare.append("li").html(`<b> Green Party Vote Difference:</b> ${numberFormat(greenDiff)}`)
      dataCompare.append("li").html(`<b> Other Third Party Candidate Vote Difference:</b> ${numberFormat(tpDiff)}`)

      //County Demographic Info 2019
      var dataDem = d3.select('#sample-dem');
        dataDem.html('');
      dataDem.append("li").html(`<b>Percent White Total:</b> ${percentFormat(perWhite) * 100}%`)
      dataDem.append("li").html(`<b>Percent Hispanic Total:</b> ${percentFormat(perHispanic) * 100}%`)
      dataDem.append("li").html(`<b>Percent Black Total:</b> ${percentFormat(perBlack) * 100}%`)
      dataDem.append("li").html(`<b>Percent Asian Total:</b> ${percentFormat(perAsian) * 100}%`)
      dataDem.append("li").html(`<b>Percent American Indian Total:</b> ${percentFormat(perAmericanIn) * 100}%`)
    });
};
