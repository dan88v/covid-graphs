d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv')
    .then(makeChart);
  
  function makeChart(a) {
  
    var labels = a.map(function(d) {return (d.data).substring(5,10)});
    var ni = a.map(function(d) {return d.nuovi_attualmente_positivi});
    var t = a.map(function(d) {return d.tamponi});
    
    var tgiorn = new Array;
    for (var i=0;i<t.length;i++)
    {
      tgiorn[i] = t[i] - t[i-1];
      if (i==0) tgiorn[i] = parseInt(t[i]);
    }

    var ratio = new Array;
    //Calcolo Rapporto
    for (var i=0;i<t.length;i++)
    {
      ratio[i] = (ni[i] / tgiorn[i]).toFixed(4);
    }

    var chartData = {
        labels: labels,
        datasets: [{
          type: 'line',
          label: 'Rapporto',
          data: ratio,
          yAxisID: 'y-axis-2',
          fill: false,
          borderColor: '#bc61e2',
          lineTension: 0.2
        }, {
          label: 'Nuovi Positivi',
          data: ni,
          yAxisID: 'y-axis-1',
          backgroundColor: '#616161',
        }, {
          label: 'Tamponi',
          data: tgiorn,
          yAxisID: 'y-axis-1',
          backgroundColor: '#72b1ff',
        }]
      };
  
    var chart = new Chart('nuoviInfettiChart', {
      type: 'bar',
      data: chartData,
      options: {
        title: {
            display: false,
            text: 'Nuovi Positivi'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
						yAxes: [{
							type: 'linear', 
							display: true,
							position: 'left',
							id: 'y-axis-1',
              scaleLabel: {
                display: true,
                labelString: "Totale"
              }
						}, {
							type: 'linear', 
							display: true,
							position: 'right',
							id: 'y-axis-2',
							gridLines: {
								drawOnChartArea: false
							}
						}],
					}
        }
    });
  }