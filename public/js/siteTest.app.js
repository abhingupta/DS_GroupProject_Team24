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
		buildOutputChart() {
			Highcharts.chart('outputCharts', {

				chart: {
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
					name: 'Output(day)',
					data: //needs to be [[date1, val1],[date2,val2]]
						this.sensorts.map(entry => [entry.dataCollectedDate, entry.heatRate])
				}]
			});
		},

		buildCompressorChart() {
			Highcharts.chart('compressorEfficiencyCharts', {
				chart: {
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

		renderIcons() {

			// Move icon
			if (!this.series[0].icon) {
				this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
					.attr({
						'stroke': '#303030',
						'stroke-linecap': 'round',
						'stroke-linejoin': 'round',
						'stroke-width': 2,
						'zIndex': 10
					})
					.add(this.series[2].group);
			}
			this.series[0].icon.translate(
				this.chartWidth / 2 - 10,
				this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
				(this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
			);

			// Exercise icon
			if (!this.series[1].icon) {
				this.series[1].icon = this.renderer.path(
						['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
							'M', 8, -8, 'L', 16, 0, 8, 8
						]
					)
					.attr({
						'stroke': '#ffffff',
						'stroke-linecap': 'round',
						'stroke-linejoin': 'round',
						'stroke-width': 2,
						'zIndex': 10
					})
					.add(this.series[2].group);
			}
			this.series[1].icon.translate(
				this.chartWidth / 2 - 10,
				this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
				(this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
			);

			// Stand icon
			if (!this.series[2].icon) {
				this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
					.attr({
						'stroke': '#303030',
						'stroke-linecap': 'round',
						'stroke-linejoin': 'round',
						'stroke-width': 2,
						'zIndex': 10
					})
					.add(this.series[2].group);
			}

			this.series[2].icon.translate(
				this.chartWidth / 2 - 10,
				this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
				(this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
			);
		},
		buildAverageChart() {


			Highcharts.chart('averageCharts', {

				chart: {
					type: 'solidgauge',
					height: '110%',
					events: {
						render: renderIcons()
					}
				},

				title: {
					text: 'Activity',
					style: {
						fontSize: '24px'
					}
				},

				tooltip: {
					borderWidth: 0,
					backgroundColor: 'none',
					shadow: false,
					style: {
						fontSize: '16px'
					},
					pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
					positioner: function (labelWidth) {
						return {
							x: (this.chart.chartWidth - labelWidth) / 2,
							y: (this.chart.plotHeight / 2) + 15
						};
					}
				},

				pane: {
					startAngle: 0,
					endAngle: 360,
					background: [{ // Track for Move
						outerRadius: '112%',
						innerRadius: '88%',
						backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
							.setOpacity(0.3)
							.get(),
						borderWidth: 0
					}, { // Track for Exercise
						outerRadius: '87%',
						innerRadius: '63%',
						backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
							.setOpacity(0.3)
							.get(),
						borderWidth: 0
					}, { // Track for Stand
						outerRadius: '62%',
						innerRadius: '38%',
						backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2])
							.setOpacity(0.3)
							.get(),
						borderWidth: 0
					}]
				},

				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					tickPositions: []
				},

				plotOptions: {
					solidgauge: {
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false,
						rounded: true
					}
				},

				series: [{
					name: 'Move',
					data: [{
						color: Highcharts.getOptions().colors[0],
						radius: '112%',
						innerRadius: '88%',
						y: 80
					}]
				}, {
					name: 'Exercise',
					data: [{
						color: Highcharts.getOptions().colors[1],
						radius: '87%',
						innerRadius: '63%',
						y: 65
					}]
				}, {
					name: 'Stand',
					data: [{
						color: Highcharts.getOptions().colors[2],
						radius: '62%',
						innerRadius: '38%',
						y: 100
					}]
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
			this.formatWorkHours();
			this.buildOutputChart();
			this.buildHeatrateChart();
			this.buildCompressorChart();
			// this.buildAvalibilityChart();
			// this.buildAverageChart();
			// this.renderIcons();

			this.buildReliabilityChart();
			this.buildHybridChart();
			// siteApp.toggle = false;
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
		// this.buildEffortChart();
	}
})
