let chart;

window.updateChartData = function () {
  const Updata = [
    { x: "Обязательные", value: categoryValues.required, normal: { fill: "#8cbfe6" } },
    { x: "Автомобиль", value: categoryValues.car, normal: { fill: "#d18ce6" } },
    { x: "Дом", value: categoryValues.home, normal: { fill: "#e68caa" } },
    { x: "Семья", value: categoryValues.family, normal: { fill: "#8c8ce6" } },
    { x: "Другое", value: categoryValues.other, normal: { fill: "#e6c78c" } },
  ];
  console.log(categoryValues);
  return Updata;
}


function drawChart(data) {
  chart = anychart.pie();

  chart.title("Расходы");

  chart.container("container");

  chart.data(data);

  chart.draw();
}

anychart.onDocumentReady(function () {

  drawChart(updateChartData());

window.updateChart = function () {
    const newData = updateChartData();
    chart.data(newData);
    chart.draw();
  }
});


