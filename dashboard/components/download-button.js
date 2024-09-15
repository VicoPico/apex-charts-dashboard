import { heatmapChart } from './heatmap-chart.js';

export function addDownloadButtonFunctionality() {
	document
		.getElementById('downloadButton')
		.addEventListener('click', function () {
			const userConfirmed = confirm(
				"Click 'OK' to download the heatmap as an image."
			);

			if (userConfirmed) {
				heatmapChart.dataURI().then(({ imgURI, csv }) => {
					const link = document.createElement('a');
					link.href = imgURI;
					link.download = 'heatmap.png';

					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				});
			}
		});
}
