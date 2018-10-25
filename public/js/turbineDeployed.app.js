var turbineDeployedApp = new Vue({
	el: '#turbineDeployedMain',
	data: {
		turbineDeployedData: {
			turbineDeployedId: null,
			turbineId: null,
			siteId: null,
			serialNumber: 'foo',
			deployedDate: 'foo',
			totalFiredHours: null,
			totalStarts: null,
			lastPlannedOutageDate: 'foo',
			lastUnplannedOutageDate: 'foo'
		},
		turbineDeployed: [],
		turbineDeployedForm: {}, // populated by this.getEmptyTurbineForm()
	},
	computed: {

	},
	methods: {
		handleTurbineDeployedForm(e) {
			const s = JSON.stringify(this.TurbineDeployedForm);

			console.log(s);

			// POST to remote server
			fetch('api/turbineDeployed.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.turbineDeployed.push(json)
				})
				.catch(err => {
					console.error('TurbineDeployed POST ERROR:');
					console.error(err);
				})

			// Reset turbineForm
			this.turbineDeployedForm = this.getEmptyTurbineDeployedForm();
		},


		getEmptyTurbineDeployedForm() {
			return {
				// turbine_id: this.turbineData.id,
				// turbineIdnull,
				serialNumber: null,
				deployedDate: null,
				totalFiredHours: null,
				totalStarts: null,
				lastPlannedOutageDate: null,
				lastUnplannedOutageDate: null

			}
		},
		gotoTurbineDeployed(tid) {
			console.log("turbine deployed id:" +
				tid);
			window.location = 'turbineDeployed.html?turbineDeployedId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const turbineDeployedId = url.searchParams.get('turbineDeployedId');
		console.log('Turbine Deployed: ' + turbineDeployedId);
		this.turbineDeployedData.id = turbineDeployedId;

		if (!turbineDeployedId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate turbineForm with default values
		this.turbineDeployedForm = this.getEmptyTurbineDeployedForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/turbineDeployed.php?turbineDeployedId=' + turbineDeployedId)
			.then(response => response.json())
			.then(json => {
				turbineDeployedApp.turbineDeployed = json
			})
			.catch(err => {
				console.error('TurbineDeployed FETCH ERROR:');
				console.error(err);
			})
	}
})
