var clientApp = new Vue({
	el: '#clientMain',
	data: {
		clientData: {
			clientId: null,
			clientName: 'foo',
			clientDescription: 'foo',
			gicsSector: 'foo',
			gicsSubIndustry: 'foo',
			headquarter: 'foo'
		},
		client: [],
		clientForm: {}, // populated by this.getEmptyClientForm()
	},
	computed: {

	},
	methods: {
		handleClientForm(e) {
			const s = JSON.stringify(this.clientForm);

			console.log(s);

			// POST to remote server
			fetch('api/client.php', {
					method: "POST", // *GET, POST, PUT, DELETE, etc.
					headers: {
						"Content-Type": "application/json; charset=utf-8"
					},
					body: s // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(json => {
					this.client.push(json)
				})
				.catch(err => {
					console.error('Client POST ERROR:');
					console.error(err);
				})

			// Reset clientForm
			this.clientForm = this.getEmptyClientForm();
		},


		getEmptyClientForm() {
			return {
				// client_id: this.clientData.id,
				// clientIdnull,
				clientName: null,
				clientDescription: null,
				gicsSector: null,
				gicsSubIndustry: null,
				headquarter: null

			}
		},
		gotoSite(tid) {
			console.log("site id:" +
				tid);
			window.location = 'site.html?siteId=' + tid;
		}
	},
	created() {

		// Do data fetch
		const url = new URL(window.location.href);
		const clientId = url.searchParams.get('clientId');
		console.log('Client: ' + clientId);
		this.clientData.clientId = clientId;

		if (!clientId) {
			//TODO: Error? 404?
			//e.g., window.location = '404.html';
		}

		// Populate clientForm with default values
		this.clientForm = this.getEmptyClientForm();

		// TODO: Fetch task-specific data
		// fetch('api/task?id=4')
		fetch('api/client1.php')
			.then(response => response.json())
			.then(json => {
				clientApp.client = json
			})
			.catch(err => {
				console.error('Client FETCH ERROR:');
				console.error(err);
			})
	}
})
