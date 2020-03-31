d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv')
    .then(makeChart);

  function makeChart(a) {

    //Ordino in ordine decrescente
    function compare(a, b) {
      const bandA = parseInt(a.totale_casi);
      const bandB = parseInt(b.totale_casi);
    
      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison * -1;
    }

    a.sort(compare);
  
    var labels = a.map(function(d) {return (d.denominazione_regione)});
    var tap = a.map(function(d) {return d.totale_positivi});
    var dg = a.map(function(d) {return d.dimessi_guariti});
    var dec = a.map(function(d) {return d.deceduti});
    var nap = a.map(function(d) {return d.nuovi_positivi});

    var chartData = {
        labels: labels,
        datasets: [{
          label: 'Attualmente Positivi',
          data: tap,
          backgroundColor: '#616161',
        }, {
          label: 'Deceduti',
          data: dec,
          backgroundColor: '#d53b3b',
        }, {
          label: 'Dimessi Guariti',
          data: dg,
          backgroundColor: '#3bd55f',
        }]
      };
  
    var chart = new Chart('totaliPerRegione', {
      type: 'horizontalBar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: false,
            text: 'Totali per Regione'
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
              stacked: true
            }]
          }
        }
    });
  }