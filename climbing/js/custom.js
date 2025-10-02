Chart.defaults.global.defaultFontColor = "#FFFFFF";

var myOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ // For y-axis
        gridLines: {
          display: true, // To show grid lines
          color: 'oklch(40% 0.143 164.978)', // Color of the grid lines
        }
      }]
    },
    legend: {
        display: false
    }
};

d3.csv('/climbing/data/monthly-height.csv').then(makeMonthChart);
function makeMonthChart(months) {
  var monthLabels = months.map(function(d) {return d.month});
  var monthData = months.map(function(d) {return d.height});
  var chart = new Chart('monthlyheight', {
    type: 'bar',
    options: myOptions,
    data: {
      labels: monthLabels,
      datasets: [{
        backgroundColor: "oklch(84.5% 0.143 164.978)",
        hoverBackgroundColor: "oklch(43.2% 0.095 166.913)",
        borderColor: "rgb(255, 255, 255)",
        data: monthData
      }]
    }
  });
}

d3.csv('/climbing/data/yearly-height.csv').then(makeYearChart);
function makeYearChart(years) {
  var yearLabels = years.map(function(d) {return d.year});
  var yearData = years.map(function(d) {return d.height});
  var chart = new Chart('yearlyheight', {
    type: 'bar',
    options: myOptions,
    data: {
      labels: yearLabels,
      datasets: [{
        backgroundColor: "oklch(84.5% 0.143 164.978)",
        hoverBackgroundColor: "oklch(43.2% 0.095 166.913)",
        data: yearData
      }]
    }
  });
}

d3.csv('/climbing/data/ticks-by-grade.csv').then(makeGradeChart);
function makeGradeChart(grade) {
  var gradeLabels = grade.map(function(d) {return d.grade});
  var gradeData = grade.map(function(d) {return d.count});
  var chart = new Chart('ticksByGrade', {
    type: 'bar',
    options: myOptions,
    data: {
      labels: gradeLabels,
      datasets: [{
        backgroundColor: "oklch(84.5% 0.143 164.978)",
        hoverBackgroundColor: "oklch(43.2% 0.095 166.913)",
        data: gradeData
      }]
    }
  });
}