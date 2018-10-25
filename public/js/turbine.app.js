var turbineApp = new Vue({
	el: '#turbineMain',
	data: {
		turbineData: {
			siteId: null,
			siteName: 'foo',
			siteDescription: 'foo',
			gicsSector: 'foo',
			gicsSubIndustry: 'foo',
			headquarter: 'foo'
		},
		turbine: [],
		turbineForm: {}, // populated by this.getEmptySiteForm()
	},
	computed: {

	},
	methods: {
		handleTurbineForm(e) {
			const s = JSON.stringify(this.TurbineForm);

			console.log(s);

			// POST to remote server
			fetch('api/turbine.php', {
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
					console.error('Turbine POST ERROR:');
					console.error(err);
				})

			// Reset siteForm
			this.turbineForm = this.getEmptyTurbineForm();
		},


		getEmptyTurbineForm() {
			return {
				// site_id: this.siteData.id,
				// siteIdnull,
				turbineName: null,
				siteDescription: null,
				gicsSector: null,
				gicsSubIndustry: null,
				headquarter: null

			}
		},
		gotoTurbine(tid) {
			console.log("turbine id:" +
				tid);
			window.location = 'turbine.html?turbineId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const siteId = url.searchParams.get('turbineId');
		console.log('Turbine: ' + turbineId);
		this.turbineData.id = turbineId;

		if (!turbineId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate siteForm with default values
		this.turbineForm = this.getEmptyTurbineForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/turbine.php?turbineId=' + turbineId)
			.then(response => response.json())
			.then(json => {
				turbineApp.turbine = json
			})
			.catch(err => {
				console.error('Turbine FETCH ERROR:');
				console.error(err);
			})
	}
})
