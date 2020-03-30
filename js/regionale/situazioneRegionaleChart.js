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
    var rcs = datiRegione.map(function(d) {return d.ricoverati_con_sintomi});
    var ti = datiRegione.map(function(d) {return d.terapia_intensiva});
    var id = datiRegione.map(function(d) {return d.isolamento_domiciliare});
    var dg = datiRegione.map(function(d) {return d.dimessi_guariti});
    var dec = datiRegione.map(function(d) {return d.deceduti});

    var chartData = {
        labels: labels,
        datasets: [{
          label: 'Deceduti',
          data: dec,
          backgroundColor: '#d53b3b',
			lineTension: 0
        }, {
          label: 'Dimessi Guariti',
          data: dg,
          backgroundColor: '#3bd55f',
			lineTension: 0
        }, {
          label: 'Ricoverati con Sintomi',
          data: rcs,
          backgroundColor: '#d5c53b',
			lineTension: 0
        }, {
          label: 'Terapia Intensiva',
          data: ti,
          backgroundColor: '#d5753b',
			lineTension: 0
        }, {
          label: 'Isolamento Domiciliare',
          data: id,
          backgroundColor: '#3ba8d5',
			lineTension: 0
        }]
      };
  
    var chart = new Chart('situazioneRegionaleChart', {
      type: 'line',
      data: chartData,
      options: {
        title: {
            display: false,
            text: 'Situazione Nazionale'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Totale Persone Contagiate"
              }
            }]
          }
        }
    });
  }