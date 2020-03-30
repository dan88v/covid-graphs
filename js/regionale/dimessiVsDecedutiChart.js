d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv')
    .then(makeChart);
  
  function makeChart(a) {

    var urlParams = new URLSearchParams(window.location.search);
    var regione = urlParams.get('regione');

    function filterCriteria(d, regione) {
      return d.denominazione_regione === regione;
    }

    var datiRegione = a.filter(function(d) { 
      return filterCriteria(d, regione)
    });
  
    var labels = datiRegione.map(function(d) {return (d.data).substring(5,10)});

    var dg = datiRegione.map(function(d) {return d.dimessi_guariti});
    var dggiorn = new Array;
    for (var i=0;i<dg.length;i++)
    {
      dggiorn[i] = dg[i] - dg[i-1];
      if (i==0) dggiorn[i] = parseInt(dg[i]);
    }

    var dec = datiRegione.map(function(d) {return d.deceduti});
    var decgiorn = new Array;
    for (var i=0;i<dec.length;i++)
    {
      decgiorn[i] = dec[i] - dec[i-1];
      if (i==0) decgiorn[i] = parseInt(dec[i]);
    }

    var to = datiRegione.map(function(d) {return d.totale_ospedalizzati});
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
          label: 'Deceduti',
          data: decgiorn,
          fill: false,
          borderColor: '#992323',
			  lineTension: 0.2
        }, {
          label: 'Nuovi Ricoveri',
          data: togiorn,
          fill: false,
          borderColor: '#eb834b',
			  lineTension: 0.2
        }]
      };
  
    var chart = new Chart('dimessiVsDecedutiChart', {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: false,
            text: 'Dimessi Guariti vs Deceduti per Giorno'
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