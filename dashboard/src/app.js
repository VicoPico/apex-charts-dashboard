import { renderHeatmapChart } from '../components/heatmap-chart.js';
import { renderBarChart, updateBarChart } from '../components/bar-chart.js';
import { addDownloadButtonFunctionality } from '../components/download-button.js';

// Render the heatmap chart
renderHeatmapChart(updateBarChart);

// Render the bar chart
const barChart = renderBarChart();

// Add functionality to the download button
addDownloadButtonFunctionality();
