// Sample data for the heat map
var series = [
	{
		name: 'Metric1',
		data: [
			{ x: 'W1', y: 22 },
			{ x: 'W2', y: 29 },
			{ x: 'W3', y: 13 },
			{ x: 'W4', y: 32 },
			{ x: 'W5', y: 85 },
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
			{ x: 'W4', y: 34 },
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
			{ x: 'W9', y: 120 },
		],
	},
];

// Function to calculate min and max y-values
function calculateMinMax(series) {
	let min = Infinity;
	let max = -Infinity;

	series.forEach((metric) => {
		metric.data.forEach((dataPoint) => {
			if (dataPoint.y < min) min = dataPoint.y;
			if (dataPoint.y > max) max = dataPoint.y;
		});
	});

	return { min, max };
}

// Calculate min and max y-values
const { min, max } = calculateMinMax(series);

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
			columnWidth: '70%', // Make the bars 30% thinner
			dataLabels: {
				position: 'top', // Position the data labels at the top of the bars
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val) {
			return Math.round(val); // Format data labels as whole numbers
		},
		style: {
			fontSize: '12px',
			colors: ['#304758'],
		},
	},
	fill: {
		type: 'gradient',
		gradient: {
			shade: 'light',
			type: 'vertical',
			shadeIntensity: 0.5,
			gradientToColors: ['#00acc1', '#4dd0e1', '#b2ebf2', '#e0f7fa', '#ffffff'], // Gradient colors
			inverseColors: false,
			opacityFrom: 0.6, // Set opacity to 0.6
			opacityTo: 0.6, // Set opacity to 0.6
			stops: [0, 20, 40, 60, 80, 100],
		},
	},
	series: [],
	xaxis: {
		categories: [],
		labels: {
			show: true,
			style: {
				fontSize: '12px',
				colors: ['#304758'],
			},
		},
	},
	yaxis: {
		min: min,
		max: max,
		labels: {
			formatter: function (value) {
				return Math.round(value); // Format labels as whole numbers
			},
		},
	},
	title: {
		text: 'Bar Chart Example',
		style: {
			fontFamily: 'Roboto, sans-serif',
			fontWeight: '700',
			fontSize: '24px',
		},
	},
	legend: {
		markers: {
			width: 12,
			height: 12,
			radius: 0,
			colors: ['#00acc1', '#4dd0e1', '#b2ebf2', '#e0f7fa', '#ffffff'], // Gradient colors
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

	// Calculate the average value for the selected metric
	var selectedMetricData = series.find(
		(metric) => metric.name === selectedMetric
	).data;
	var total = selectedMetricData.reduce(
		(sum, dataPoint) => sum + dataPoint.y,
		0
	);
	var count = selectedMetricData.length;
	var average = total / count;

	// Add the average bar
	barSeries.push({
		name: 'Average',
		data: [average],
	});
	barCategories.push('Average');

	// Calculate min and max y-values for the selected metric
	const { min, max } = calculateMinMax([
		series.find((metric) => metric.name === selectedMetric),
	]);

	barChart.updateOptions({
		series: barSeries,
		xaxis: {
			categories: barCategories,
			labels: {
				show: true,
				style: {
					fontSize: '12px',
					colors: ['#304758'],
				},
			},
		},
		yaxis: {
			min: min,
			max: max,
			tickAmount: 4,
			labels: {
				formatter: function (value) {
					return Math.round(value); // Format labels as whole numbers
				},
			},
		},
		title: {
			text: selectedMetric + ' - ' + selectedData.x,
		},
		colors: ['#00acc1', '#4dd0e1'], // Set the colors for the series
		legend: {
			markers: {
				width: 12,
				height: 12,
				radius: 0,
				colors: ['#00acc1', '#4dd0e1'], // Set the colors for the legend markers
			},
		},
	});
}

// Function to apply gradient to bars
function applyGradientToBars() {
	const bars = document.querySelectorAll(
		'.apexcharts-bar-area .apexcharts-bar'
	);
	bars.forEach((bar) => {
		bar.style.fill = 'url(#gradient)';
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
