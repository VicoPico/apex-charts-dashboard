// heatmap-chart.js

import { series } from './data/heatmap-data.js';

let heatmapChart;

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

export function renderHeatmapChart(updateBarChart) {
	const { min, max } = calculateMinMax(series);

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
		colors: ['#007c91'],
		colorScale: {
			ranges: [
				{
					from: 0,
					to: 0,
					color: '#ffffff',
				},
				{
					from: min,
					to: min + (max - min) * 0.1,
					color: '#e0f7fa',
				},
				{
					from: min + (max - min) * 0.1,
					to: min + (max - min) * 0.2,
					color: '#b2ebf2',
				},
				{
					from: min + (max - min) * 0.2,
					to: min + (max - min) * 0.3,
					color: '#80deea',
				},
				{
					from: min + (max - min) * 0.3,
					to: min + (max - min) * 0.4,
					color: '#4dd0e1',
				},
				{
					from: min + (max - min) * 0.4,
					to: min + (max - min) * 0.5,
					color: '#26c6da',
				},
				{
					from: min + (max - min) * 0.5,
					to: min + (max - min) * 0.6,
					color: '#00bcd4',
				},
				{
					from: min + (max - min) * 0.6,
					to: min + (max - min) * 0.7,
					color: '#00acc1',
				},
				{
					from: min + (max - min) * 0.7,
					to: min + (max - min) * 0.8,
					color: '#0097a7',
				},
				{
					from: min + (max - min) * 0.8,
					to: max,
					color: '#007c91',
				},
			],
		},
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

// In the future, if the metrics are not related in any meaningful way,
// the color scale should be updated to reflect the individual ranges
// of each metric to provide a more accurate visualization.

export { heatmapChart };
