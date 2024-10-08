import { series } from './data/heatmap-data.js';

const barChartOptions = {
	chart: {
		type: 'bar',
		height: '100%',
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '20%', // Adjusted to 50% of the current width
			dataLabels: {
				position: 'top',
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val) {
			return Math.round(val);
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
			gradientToColors: ['#00acc1', '#4dd0e1', '#b2ebf2', '#e0f7fa', '#ffffff'],
			inverseColors: false,
			opacityFrom: 0.6,
			opacityTo: 0.6,
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
		min: 0,
		max: 100,
		labels: {
			formatter: function (value) {
				return Math.round(value);
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
			colors: ['#00acc1', '#4dd0e1', '#b2ebf2', '#e0f7fa', '#ffffff'],
		},
	},
	annotations: {
		yaxis: [],
	},
};

let barChart;

export function renderBarChart() {
	barChart = new ApexCharts(
		document.querySelector('#barchart'),
		barChartOptions
	);
	barChart.render();
	return barChart;
}

export function updateBarChart(selectedData, selectedMetric) {
	const barSeries = [
		{
			name: selectedData.x,
			data: [selectedData.y],
		},
	];
	const barCategories = [selectedData.x];

	const selectedMetricData = series.find(
		(metric) => metric.name === selectedMetric
	).data;
	const total = selectedMetricData.reduce(
		(sum, dataPoint) => sum + dataPoint.y,
		0
	);
	const count = selectedMetricData.length;
	const average = total / count;

	const min = Math.min(...selectedMetricData.map((data) => data.y));
	const max = Math.max(...selectedMetricData.map((data) => data.y));

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
					return Math.round(value);
				},
			},
		},
		title: {
			text: selectedMetric + ' - ' + selectedData.x,
		},
		colors: ['#00acc1', '#4dd0e1'],
		legend: {
			markers: {
				width: 12,
				height: 12,
				radius: 0,
				colors: ['#00acc1', '#4dd0e1'],
			},
		},
		annotations: {
			yaxis: [
				{
					y: average,
					borderColor: '#A62A44',
					strokeDashArray: 4, // Make the line dotted
					label: {
						borderColor: '#A62A44',
						style: {
							color: '#fff',
							background: '#A62A44',
						},
						text: 'Average: ' + Math.round(average),
					},
				},
			],
		},
	});

	barChart.updateSeries([
		{
			name: selectedData.x,
			data: [selectedData.y],
		},
	]);
}
