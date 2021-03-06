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
		client: [],
		sensorts: [],
		senseall: [],
		siteForm: {},
		senseavg: [],
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
		gotoClient(tid) {
			console.log("Client id:" +
				tid);
			fetch('api/client.php?tclientId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.client = json
				})
				.catch(err => {
					console.error('Client FETCH ERROR:');
					console.error(err);
				})
		},
		buildOutputChart() {
			Highcharts.chart('outputCharts', {

				chart: {
					zoomType: 'x',
					backgroundColor: 'transparent'
					// color: white
				},
				title: {

					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Output Chart',
					// color: 'white'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Output'
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Output(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.output])
				}]
			});
		},
		buildHeatrateChart() {
			Highcharts.chart('heatrateCharts', {
				chart: {
					zoomType: 'x',
					backgroundColor: 'transparent'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Heatrate Chart'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Heatrate'
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					color: '#e03c3f',
					name: 'Output(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.heatRate])
				}]
			});
		},

		buildCompressorChart() {
			Highcharts.chart('compressorEfficiencyCharts', {
				chart: {
					zoomType: 'x',

					backgroundColor: 'transparent'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Compressor Efficiency Chart'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Compressor Efficiency'
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Compressor Efficiency(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.compressorEfficiency])
				}]
			});
		},



		buildAvalibilityChart() {
			Highcharts.chart('availabilityCharts', {
				chart: {
					zoomType: 'x',

					backgroundColor: 'transparent'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Availability Chart'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Availability'
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Availability(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.availability])
				}]
			});

		},

		buildReliabilityChart() {
			Highcharts.chart('reliabilityCharts', {
				chart: {
					zoomType: 'x',

					backgroundColor: 'transparent'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Reliability Chart'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					title: {
						text: 'Reliability '
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Reliability(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.reliability])
				}]
			});

		},

		buildHybridChart() {
			Highcharts.chart('hybridCharts', {

				chart: {
					zoomType: 'x',

					backgroundColor: 'transparent',
					type: 'area'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Availability and Reliability'
				},

				xAxis: {
					type: 'datetime'

				},
				yAxis: {
					min: 95,

					title: {

						text: ''
					}

				},
				tooltip: {
					// pointFormat: '{series.data}'
				},
				plotOptions: {
					area: {
						marker: {
							enabled: false,
							symbol: 'circle',
							radius: 2,
							states: {
								hover: {
									enabled: true
								}
							}
						}
					}
				},
				series: [{
					name: 'Availability',
					color: '#31908E',
					data: this.sensorts.map(entry => [entry.dataCollectedDate, entry.availability])
				}, {
					name: 'Reliability',
					color: '#93EC83',
					data: this.sensorts.map(entry => [entry.dataCollectedDate, entry.reliability])
				}]
			});
		},


		buildfiredHoursChart() {
			Highcharts.chart('fireChart', {
				chart: {
					zoomType: 'x',

					backgroundColor: 'transparent'
				},
				title: {
					style: {
						// fontFamily: 'monospace',
						color: '#ffffff',
						fontWeight: 'bold'
					},
					text: 'Fired Hours Chart'
				},

				xAxis: {
					type: 'datetime'
				},
				yAxis: {
					min: 14,
					max: 20,
					title: {
						text: 'Fired hours'
					}
				},
				legend: {
					enabled: true
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [{
					type: 'area',
					name: 'Fired hours(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.firedHours])
				}]
			});


		},

		formatWorkHours() {
			this.sensorts.forEach(
				function (entry) {
					entry.dataCollectedDate = Date.parse(entry.dataCollectedDate);
				}
			);
			console.log(this.workHours);
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
			// this.buildEffortChart();


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
			// this.buildEffortChart();

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

			console.log("sensorDeployed id:" +
				tid);
			fetch('api/sensorAvg.php?sensorDeployedId=' + tid)
				.then(response => response.json())
				.then(json => {
					siteApp.senseavg = json
				})
				.catch(err => {
					console.error('Site FETCH ERROR:');
					console.error(err);
				})

			this.formatWorkHours();
			this.buildOutputChart();
			this.buildHeatrateChart();
			this.buildCompressorChart();
			// this.buildAvalibilityChart();
			// this.buildAverageChart();
			// this.renderIcons();
			// this.buildReliabilityChart();
			this.buildfiredHoursChart();

			this.buildHybridChart();
			// this.buildSyncChart();
			// siteApp.toggle = false;
		}
	},
	created() {

		// Do data fetch
		// this.gotoClient(2);
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

		fetch('api/client.php?clientId=' + siteId)
			.then(response => response.json())
			.then(json => {
				siteApp.client = json
			})
			.catch(err => {
				console.error('Site FETCH ERROR:');
				console.error(err);
			})
		// this.buildEffortChart();
	}
})
