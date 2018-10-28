Vue.directive('expand', {
	inserted: function (el, binding) {
		if (binding.value !== null) {
			function calcHeight() {
				const currentState = el.getAttribute('aria-expanded')

				el.classList.add('u-no-transition')
				el.removeAttribute('aria-expanded')
				el.style.height = null
				el.style.height = el.clientHeight + 'px'
				el.setAttribute('aria-expanded', currentState)

				setTimeout(function () {
					el.classList.remove('u-no-transition')
				})
			}

			el.classList.add('expand')
			el.setAttribute('aria-expanded', (binding.value) ? 'true' : 'false')
			calcHeight()
			window.addEventListener('resize', calcHeight)
		}
	},
	update: function (el, binding) {
		if (el.style.height && binding.value !== null) {
			el.setAttribute('aria-expanded', (binding.value) ? 'true' : 'false')
		}
	},
})

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
		siteForm: {},
		isExpanded: false // populated by this.getEmptySiteForm()
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
			window.location = 'turbineDeployed.html?turbineDeployedId=' + tid;
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
