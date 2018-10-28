var siteApp = new Vue({
	el: '#siteMain',
	data: {
		siteData: {
			siteId: null,
			siteName: 'foo',
			siteDescription: 'foo',
			gicsSector: 'foo',
			gicsSubIndustry: 'foo',
			headquarter: 'foo'
		},
		site: [],
		turbine: [],
		sensordeployed: [],
		sensor: [],
		sensorts: [],
		senseall: [],
		siteForm: {},
		toggle: true // populated by this.getEmptySiteForm()
	},
	computed: {

	},
	methods: {
		handleSiteForm(e) {
			const s = JSON.stringify(this.siteForm);

			console.log(s);

			// POST to remote server
			fetch('api/site.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.site.push(json)
				})
				.catch(err => {
					console.error('Site POST ERROR:');
					console.error(err);
				})

			// Reset siteForm
			this.siteForm = this.getEmptySiteForm();
		},


		getEmptySiteForm() {
			return {
				// site_id: this.siteData.id,
				// siteIdnull,
				siteName: null,
				siteDescription: null,
				gicsSector: null,
				gicsSubIndustry: null,
				headquarter: null

			}
		},
		gotoTurbineDeployed(tid) {
			console.log("TurbineDeployed id:" +
				tid);
			fetch('api/turbineDeployedTest.php?turbineDeployedId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.turbine = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})
		},

		gotoSensorDeployed1(tid) {
			// siteApp.toggle = false;
			console.log("TurbineDeployed id:" +
				tid);
			fetch('api/sensorDeployedTest.php?sensorDeployedId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.senseall = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})

		},
		gotoSensorDeployed(tid) {
			// siteApp.toggle = false;
			console.log("TurbineDeployed id:" +
				tid);
			fetch('api/sensorDeployedTest.php?sensorDeployedId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.sensordeployed = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})

		},

		gotoSensor(tid) {
			console.log("TurbineDeployed id:" +
				tid);
			fetch('api/sensor.php?sensorId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.sensor = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})
			siteApp.toggle = false;


		},

		gotoSensorTimeSeries(tid) {
			console.log("TurbineDeployed id:" +
				tid);
			fetch('api/sensorTimeSeries.php?sensorTimeSeriesId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.sensorts = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const siteId = url.searchParams.get('siteId');
		console.log('Site: ' + siteId);
		this.siteData.siteId = siteId;

		if (!siteId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate siteForm with default values
		this.siteForm = this.getEmptySiteForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/site.php?siteId=' + siteId)
			.then(response => response.json())
			.then(json => {
				siteApp.site = json
			})
			.catch(err => {
				console.error('Site FETCH ERROR:');
				console.error(err);
			})
	}
})
