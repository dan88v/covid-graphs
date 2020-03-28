d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv')
    .then(makeChart);
  
  function makeChart(a) {
  
    var labels = a.map(function(d) {return (d.data).substring(5,10)});

    var dg = a.map(function(d) {return d.dimessi_guariti});
    var dggiorn = new Array;
    for (var i=0;i<dg.length;i++)
    {
      dggiorn[i] = dg[i] - dg[i-1];
      if (i==0) dggiorn[i] = parseInt(dg[i]);
    }

    var to = a.map(function(d) {return d.totale_ospedalizzati});
    var togiorn = new Array;
    for (var i=0;i<to.length;i++)
    {
      togiorn[i] = to[i] - to[i-1];
      if (i==0) togiorn[i] = parseInt(to[i]);
    }

    var chartData = {
        labels: labels,
        datasets: [{
          label: 'Dimessi',
          data: dggiorn,
          fill: false,
          borderColor: '#239942',
			  lineTension: 0.2
        }, {
          label: 'Nuovi Ricoveri',
          data: togiorn,
          fill: false,
          borderColor: '#ff00de',
			  lineTension: 0.2
        }]
      };
  
    var chart = new Chart('dimessiMenoNuoviRicoveri', {
      type: 'line',
      data: chartData,
      options: {
        title: {
            display: false,
            text: 'Dimessi Meno Nuovi Ospedalizzati'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
						yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Totale Persone"
              }
            }]
          }
        }
    });
  }