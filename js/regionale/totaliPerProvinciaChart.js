d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-province/dpc-covid19-ita-province-latest.csv')
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

    datiRegione.sort(compare);
  
    var labels = datiRegione.map(function(d) {return (d.denominazione_provincia)});
    var tap = datiRegione.map(function(d) {return d.totale_casi});

    var chartData = {
        labels: labels,
        datasets: [{
          label: 'Totale Casi',
          data: tap,
          backgroundColor: '#616161',
        }]
      };
  
    var chart = new Chart('totaliPerProvincia', {
      type: 'horizontalBar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: false,
            text: 'Totali per Provincia'
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