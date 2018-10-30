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


		buildSyncChart() {

			/*
			The purpose of this demo is to demonstrate how multiple charts on the same page
			can be linked through DOM and Highcharts events and API methods. It takes a
			standard Highcharts config with a small variation for each data set, and a
			mouse/touch event handler to bind the charts together.
			*/



			/**
			 * In order to synchronize tooltips and crosshairs, override the
			 * built-in events with handlers defined on the parent element.
			 */
			['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
				window.onload = function () {

					document.getElementById('syncCharts').addEventListener(
						eventType,
						function (e) {
							var chart,
								point,
								i,
								event;

							for (i = 0; i < Highcharts.charts.length; i = i + 1) {
								chart = Highcharts.charts[i];
								// Find coordinates within the chart
								event = chart.pointer.normalize(e);
								// Get the hovered point
								point = chart.series[0].searchPoint(event, true);

								if (point) {
									point.highlight(e);
								}
							}
						}
					);
				}
			});

			/**
			 * Override the reset function, we don't need to hide the tooltips and
			 * crosshairs.
			 */
			Highcharts.Pointer.prototype.reset = function () {
				return undefined;
			};

			/**
			 * Highlight a point by showing tooltip, setting hover state and draw crosshair
			 */
			Highcharts.Point.prototype.highlight = function (event) {
				event = this.series.chart.pointer.normalize(event);
				this.onMouseOver(); // Show the hover marker
				this.series.chart.tooltip.refresh(this); // Show the tooltip
				this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
			};

			/**
			 * Synchronize zooming through the setExtremes event handler.
			 */
			function syncExtremes(e) {
				var thisChart = this.chart;

				if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
					Highcharts.each(Highcharts.charts, function (chart) {
						if (chart !== thisChart) {
							if (chart.xAxis[0].setExtremes) { // It is null while updating
								chart.xAxis[0].setExtremes(
									e.min,
									e.max,
									undefined,
									false, {
										trigger: 'syncExtremes'
									}
								);
							}
						}
					});
				}
			}

			// Get the data. The contents of the data file can be viewed at
			Highcharts.ajax({
				url: 'https://cdn.rawgit.com/highcharts/highcharts/057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/activity.json',
				dataType: 'text',
				success: function (activity) {

					activity = JSON.parse(activity);
					activity.datasets.forEach(function (dataset, i) {

						// Add X values
						dataset.data = Highcharts.map(dataset.data, function (val, j) {
							return [activity.xData[j], val];
						});

						var chartDiv = document.createElement('div');
						chartDiv.className = 'chart';
						document.getElementById('container').appendChild(chartDiv);

						Highcharts.chart(chartDiv, {
							chart: {
								marginLeft: 40, // Keep all charts left aligned
								spacingTop: 20,
								spacingBottom: 20
							},
							title: {
								text: dataset.name,
								align: 'left',
								margin: 0,
								x: 30
							},
							credits: {
								enabled: false
							},
							legend: {
								enabled: false
							},
							xAxis: {
								crosshair: true,
								events: {
									setExtremes: syncExtremes
								},
								labels: {
									format: '{value} km'
								}
							},
							yAxis: {
								title: {
									text: null
								}
							},
							tooltip: {
								positioner: function () {
									return {
										// right aligned
										x: this.chart.chartWidth - this.label.width,
										y: 10 // align to title
									};
								},
								borderWidth: 0,
								backgroundColor: 'none',
								pointFormat: '{point.y}',
								headerFormat: '',
								shadow: false,
								style: {
									fontSize: '18px'
								},
								valueDecimals: dataset.valueDecimals
							},
							series: [{
								data: dataset.data,
								name: dataset.name,
								type: dataset.type,
								color: Highcharts.getOptions().colors[i],
								fillOpacity: 0.3,
								tooltip: {
									valueSuffix: ' ' + dataset.unit
								}
							}]
						});
					});
				}
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
			this.buildSyncChart();
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
