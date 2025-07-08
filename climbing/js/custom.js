var monthlyHeightLabels = ["2023-07", "2023-08", "2023-09", "2023-10", "2023-11", "2023-12", "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07"];
var monthlyHeightData = [3885, 1050, 810, 1010, 1385, 560, 1791, 3015, 4940, 2825, 4525, 4365, 3410, 3660, 4660, 2555, 0, 0, 11107, 1980, 1455, 1770, 2800, 1227, 1080];
var barColors = ["oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)", "oklch(84.5% 0.143 164.978)"];

var yearlyHeightLabels = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"]
var yearlyHeightData = [2945, 17749, 12650, 19090, 20798, 35746, 21419]

var monthlyYearlyOptions = {
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

new Chart("monthlyheight", {
  type: "bar",
  options: monthlyYearlyOptions,
  data: {
    labels: monthlyHeightLabels,
    datasets: [{
      backgroundColor: barColors,
      hoverBackgroundColor: "oklch(43.2% 0.095 166.913)",
      data: monthlyHeightData
    }]
  }
});

new Chart(document.getElementById("yearlyheight"), {
  type: "bar",
  options: monthlyYearlyOptions,
  data: {
    labels: yearlyHeightLabels,
    datasets: [{
      backgroundColor: barColors,
      hoverBackgroundColor: "oklch(43.2% 0.095 166.913)",
      data: yearlyHeightData
    }]
  }
});