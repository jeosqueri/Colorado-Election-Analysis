function buildPlot(county){

Plotly.d3.csv("CountyResultsClean.csv", function(rows){
    console.log(rows);

    var countyName = rows.map(row => row.County);
    console.log(countyName);

    // var countyFilter = rows.map(row => row.County == county);
    // console.log(countyFilter);

    var demVotesAll = rows.map(row => row.DemVotes);
    console.log(demVotesAll);

    var repVotes = rows.map(row => row.RepVotes);
    console.log(repVotes);

    var demVotesInt = demVotesAll.map((i) => Number(i));
    console.log(demVotesInt);

    var repVotesInt = repVotes.map((i) => Number(i));
    console.log(repVotesInt);

    var totalVotes = parseInt(demVotesInt + repVotesInt);
    console.log(totalVotes);

    var trace1 = {
        x: demVotesInt,
        y: repVotesInt,
        mode: 'markers',
        text: countyName,
        marker: {
          size: demVotesInt,
          color: repVotesInt,
          sizeref: 0.2,
          sizemode: 'area'
        }
      };
    var data1 = [trace1];

    Plotly.newPlot('bubble', trace1, data1);

   
})



}

buildPlot();