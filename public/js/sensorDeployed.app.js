var sensorDeployedApp = new Vue({
	el: '#sensorDeployedMain',
	data: {
		sensorDeployedData: {
			sensorDeployedId: null,
			sensorId: null,
			turbineDeployedId: null,
			serialNumber: 'foo',
			deployedDate: 'foo'
		},
		sensorDeployed: [],
		sensorDeployedForm: {}, // populated by this.getEmptySensorDeployedForm()
	},
	computed: {

	},
	methods: {
		handleSensorDeployedForm(e) {
			const s = JSON.stringify(this.SensorDeployedForm);

			console.log(s);

			// POST to remote server
			fetch('api/sensorDeployed.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.sensorDeployed.push(json)
				})
				.catch(err => {
					console.error('SensorDeployed POST ERROR:');
					console.error(err);
				})

			// Reset sensorDeployedForm
			this.sensorDeployedForm = this.getEmptySensorDeployedForm();
		},


		getEmptySensorDeployedForm() {
			return {
				// sensorDeployed_id: this.sensorDeployedData.id,
				// sensorDeployedIdnull,
				serialNumber: null,
				deployedDate: null

			}
		},
		gotoSensor(tid) {
			console.log("sensorDeployed id:" +
				tid);
			window.location = 'sensor.html?sensorId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const sensorDeployedId = url.searchParams.get('sensorDeployedId');
		console.log('SensorDeployed: ' + sensorDeployedId);
		this.sensorDeployedData.id = sensorDeployedId;

		if (!sensorDeployedId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate sensorDeployedForm with default values
		this.sensorDeployedForm = this.getEmptySensorDeployedForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/sensorDeployed.php?sensorDeployedId=' + sensorDeployedId)
			.then(response => response.json())
			.then(json => {
				sensorDeployedApp.sensorDeployed = json
			})
			.catch(err => {
				console.error('SensorDeployed FETCH ERROR:');
				console.error(err);
			})
	}
})
