var sensorTimeSeriesApp = new Vue({
	el: '#sensorTimeSeriesMain',
	data: {
		sensorTimeSeriesData: {
			sensorTimeSeriesId: null,
			sensorDeployedId: null,
			dataCollectedDate: 'foo',
			output: null,
			heatRate: null,
			compressorEfficiency: null,
			availability: null,
			reliability: null,
			trips: null,
			starts: null
		},
		sensorTimeSeries: [],
		sensorTimeSeriesForm: {}, // populated by this.getEmptySensorTimeSeriesForm()
	},
	computed: {

	},
	methods: {
		handleSensorTimeSeriesForm(e) {
			const s = JSON.stringify(this.SensorTimeSeriesForm);

			console.log(s);

			// POST to remote server
			fetch('api/sensorTimeSeries.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.sensorTimeSeries.push(json)
				})
				.catch(err => {
					console.error('SensorTimeSeries POST ERROR:');
					console.error(err);
				})

			// Reset sensorTimeSeriesForm
			this.sensorTimeSeriesForm = this.getEmptySensorTimeSeriesForm();
		},


		getEmptySensorTimeSeriesForm() {
			return {
				// sensorTimeSeries_id: this.sensorTimeSeriesData.id,
				// sensorTimeSeriesIdnull,
				dataCollectedDate: null

			}
		},
		gotoSensorTimeSeries(tid) {
			console.log("sensorTimeSeries id:" +
				tid);
			window.location = 'sensorTimeSeries.html?sensorTimeSeriesId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const sensorTimeSeriesId = url.searchParams.get('sensorTimeSeriesId');
		console.log('SensorTimeSeries: ' + sensorTimeSeriesId);
		this.sensorTimeSeriesData.id = sensorTimeSeriesId;

		if (!sensorTimeSeriesId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate sensorTimeSeriesForm with default values
		this.sensorTimeSeriesForm = this.getEmptySensorTimeSeriesForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/sensorTimeSeries.php?sensorTimeSeriesId=' + sensorTimeSeriesId)
			.then(response => response.json())
			.then(json => {
				sensorTimeSeriesApp.sensorTimeSeries = json
			})
			.catch(err => {
				console.error('SensorTimeSeries FETCH ERROR:');
				console.error(err);
			})
	}
})
