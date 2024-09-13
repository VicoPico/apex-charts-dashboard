// Sample data for the heat map
var series = [
	{
		name: 'Metric1',
		data: [
			{ x: 'W1', y: 22 },
			{ x: 'W2', y: 29 },
			{ x: 'W3', y: 13 },
			{ x: 'W4', y: 32 },
			{ x: 'W5', y: 25 },
			{ x: 'W6', y: 27 },
			{ x: 'W7', y: 30 },
			{ x: 'W8', y: 35 },
			{ x: 'W9', y: 40 },
		],
	},
	{
		name: 'Metric2',
		data: [
			{ x: 'W1', y: 40 },
			{ x: 'W2', y: 79 },
			{ x: 'W3', y: 43 },
			{ x: 'W4', y: 50 },
			{ x: 'W5', y: 59 },
			{ x: 'W6', y: 47 },
			{ x: 'W7', y: 17 },
			{ x: 'W8', y: 52 },
			{ x: 'W9', y: 99 },
		],
	},
	{
		name: 'Metric3',
		data: [
			{ x: 'W1', y: 55 },
			{ x: 'W2', y: 41 },
			{ x: 'W3', y: 67 },
			{ x: 'W4', y: 22 },
			{ x: 'W5', y: 30 },
			{ x: 'W6', y: 35 },
			{ x: 'W7', y: 40 },
			{ x: 'W8', y: 45 },
			{ x: 'W9', y: 50 },
		],
	},
];

// Heat map options
var heatmapOptions = {
	chart: {
		type: 'heatmap',
		height: '100%',
		width: '100%',
		toolbar: {
			show: false,
		},
		events: {
			dataPointSelection: function (event, chartContext, config) {
				var selectedData =
					series[config.seriesIndex].data[config.dataPointIndex];
				var selectedMetric = series[config.seriesIndex].name;
				updateBarChart(selectedData, selectedMetric);
			},
		},
	},
	dataLabels: {
		enabled: false,
	},
	colors: [
		'#007c91', // Darkest color
		'#0097a7',
		'#00acc1',
		'#00bcd4',
		'#26c6da',
		'#4dd0e1',
		'#80deea',
		'#b2ebf2',
		'#e0f7fa',
		'#ffffff', // Lightest color
	],
	series: series,
	title: {
		text: 'Heat Map Example',
		style: {
			fontFamily: 'Roboto, sans-serif',
			fontWeight: '700',
			fontSize: '24px',
		},
	},
};

// Render the heat map
var heatmapChart = new ApexCharts(
	document.querySelector('#heatmap'),
	heatmapOptions
);
heatmapChart.render();

// Bar chart options
var barChartOptions = {
	chart: {
		type: 'bar',
		height: '100%',
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '80%', // Make the bars 30% thinner
		},
	},
	series: [],
	xaxis: {
		categories: [],
	},
	yaxis: {
		min: 0,
		max: 100,
		labels: {
			formatter: function (value) {
				return Math.round(value); // Format labels as whole numbers
			},
		},
	},
	colors: [
		function ({ value }) {
			if (value < 10) return 'rgba(224, 247, 250, 0.65)';
			if (value < 20) return 'rgba(178, 235, 242, 0.65)';
			if (value < 30) return 'rgba(128, 222, 234, 0.65)';
			if (value < 40) return 'rgba(77, 208, 225, 0.65)';
			if (value < 50) return 'rgba(38, 198, 218, 0.65)';
			if (value < 60) return 'rgba(0, 188, 212, 0.65)';
			if (value < 70) return 'rgba(0, 172, 193, 0.65)';
			if (value < 80) return 'rgba(0, 151, 167, 0.65)';
			return 'rgba(0, 124, 145, 0.65)'; // Darkest color
		},
	],
	title: {
		text: 'Bar Chart Example',
		style: {
			fontFamily: 'Roboto, sans-serif',
			fontWeight: '700',
			fontSize: '24px',
		},
	},
};

// Render the bar chart
var barChart = new ApexCharts(
	document.querySelector('#barchart'),
	barChartOptions
);
barChart.render();

// Function to update the bar chart
function updateBarChart(selectedData, selectedMetric) {
	var barSeries = [
		{
			name: selectedData.x,
			data: [selectedData.y],
		},
	];
	var barCategories = [selectedData.x];

	// Calculate the average value
	var total = series.reduce(
		(sum, metric) =>
			sum +
			metric.data.reduce((metricSum, dataPoint) => metricSum + dataPoint.y, 0),
		0
	);
	var count = series.reduce((sum, metric) => sum + metric.data.length, 0);
	var average = total / count;

	// Add the average bar
	barSeries.push({
		name: 'Average',
		data: [average],
	});
	barCategories.push('Average');

	barChart.updateOptions({
		series: barSeries,
		xaxis: {
			categories: barCategories,
		},
		title: {
			text: selectedMetric + ' - ' + selectedData.x,
		},
	});
}

// Add functionality to the download button
document
	.getElementById('downloadButton')
	.addEventListener('click', function () {
		var userConfirmed = confirm(
			"Click 'OK' to download the heatmap as an image."
		);

		if (userConfirmed) {
			heatmapChart.dataURI().then(({ imgURI, csv }) => {
				var link = document.createElement('a');
				link.href = imgURI;
				link.download = 'heatmap.png';

				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
		}
	});
