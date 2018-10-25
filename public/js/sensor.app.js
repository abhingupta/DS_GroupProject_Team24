var sensorApp = new Vue({
	el: '#sensorMain',
	data: {
		sensorData: {
			sensorId: null,
			sensorName: 'foo',
			sensorDescription: 'foo',
			manufacturer: 'foo',
			totalLifeExpectancyHours: 'foo'
		},
		sensor: [],
		sensorForm: {}, // populated by this.getEmptySensorForm()
	},
	computed: {

	},
	methods: {
		handleSensorForm(e) {
			const s = JSON.stringify(this.SensorForm);

			console.log(s);

			// POST to remote server
			fetch('api/sensor.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.sensor.push(json)
				})
				.catch(err => {
					console.error('Sensor POST ERROR:');
					console.error(err);
				})

			// Reset sensorForm
			this.sensorForm = this.getEmptySensorForm();
		},


		getEmptySensorForm() {
			return {
				// sensor_id: this.sensorData.id,
				// sensorIdnull,
				sensorName: null,
				sensorDescription: null,
				manufacturer: null,
				totalLifeExpectancyHours: null

			}
		},
		gotoSensor(tid) {
			console.log("sensor id:" +
				tid);
			window.location = 'sensor.html?sensorId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const sensorId = url.searchParams.get('sensorId');
		console.log('Sensor: ' + sensorId);
		this.sensorData.id = sensorId;

		if (!sensorId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate sensorForm with default values
		this.sensorForm = this.getEmptySensorForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/sensor.php?sensorId=' + sensorId)
			.then(response => response.json())
			.then(json => {
				sensorApp.sensor = json
			})
			.catch(err => {
				console.error('Sensor FETCH ERROR:');
				console.error(err);
			})
	}
})
