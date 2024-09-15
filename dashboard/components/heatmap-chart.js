// Sample data for the heat map
export const series = [
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

let heatmapChart;

export function renderHeatmapChart(updateBarChart) {
	const heatmapOptions = {
		chart: {
			type: 'heatmap',
			height: '100%',
			width: '100%',
			toolbar: {
				show: false,
			},
			events: {
				dataPointSelection: function (event, chartContext, config) {
					const selectedData =
						series[config.seriesIndex].data[config.dataPointIndex];
					const selectedMetric = series[config.seriesIndex].name;
					updateBarChart(selectedData, selectedMetric);
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		colors: [
			'#007c91',
			'#0097a7',
			'#00acc1',
			'#00bcd4',
			'#26c6da',
			'#4dd0e1',
			'#80deea',
			'#b2ebf2',
			'#e0f7fa',
			'#ffffff',
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

	heatmapChart = new ApexCharts(
		document.querySelector('#heatmap'),
		heatmapOptions
	);
	heatmapChart.render();
}

export { heatmapChart };
