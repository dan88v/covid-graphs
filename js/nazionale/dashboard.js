d3.csv('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv')
    .then(makeDashboard);
  function makeDashboard(a) {

    var date = a.map(function(d) {return d.data});
    var rcs = a.map(function(d) {return d.ricoverati_con_sintomi});
    var ti = a.map(function(d) {return d.terapia_intensiva});
    var id = a.map(function(d) {return d.isolamento_domiciliare});
    var dg = a.map(function(d) {return d.dimessi_guariti});
    var dec = a.map(function(d) {return d.deceduti});
    var t = a.map(function(d) {return d.tamponi});

  $('span.ultimoAggiornamento').text(date[(date.length)-1]);
  $('span.totaleTamponi').text(t[(t.length)-1]);
  $('span.totaleRicoverati').text(rcs[(rcs.length)-1]);
  $('span.totaleGuariti').text(dg[(dg.length)-1]);
  $('span.totaleDeceduti').text(dec[(dec.length)-1]);
  $('span.totaleIsolamentoDomiciliare').text(id[(id.length)-1]);
  $('span.totaleTerapiaIntensiva').text(ti[(ti.length)-1]);

  //DELTA
  var deltaTotaleTamponi = (t[(t.length)-1])-(t[(t.length)-2]);
  if (deltaTotaleTamponi > 0) { 
    deltaTotaleTamponi = "+" + deltaTotaleTamponi ;
  } else if (deltaTotaleTamponi < 0) {
    deltaTotaleTamponi = "" + deltaTotaleTamponi;
  }
  $('span.deltaTotaleTamponi').text(deltaTotaleTamponi);

  var deltaTotaleRicoverati = (rcs[(rcs.length)-1])-(rcs[(rcs.length)-2]);
  if (deltaTotaleRicoverati > 0) { 
    deltaTotaleRicoverati = "+" + deltaTotaleRicoverati ;
  } else if (deltaTotaleRicoverati < 0) {
    deltaTotaleRicoverati = "" + deltaTotaleRicoverati;
  }
  $('span.deltaTotaleRicoverati').text(deltaTotaleRicoverati);

  var deltaTotaleGuariti = (dg[(dg.length)-1])-(dg[(dg.length)-2]);
  if (deltaTotaleGuariti > 0) { 
    deltaTotaleGuariti = "+" + deltaTotaleGuariti ;
  } else if (deltaTotaleGuariti < 0) {
    deltaTotaleGuariti = "" + deltaTotaleGuariti;
  }
  $('span.deltaTotaleGuariti').text(deltaTotaleGuariti);

  var deltaTotaleDeceduti = (dec[(dec.length)-1])-(dec[(dec.length)-2]);
  if (deltaTotaleDeceduti > 0) { 
    deltaTotaleDeceduti = "+" + deltaTotaleDeceduti ;
  } else if (deltaTotaleDeceduti < 0) {
    deltaTotaleDeceduti = "" + deltaTotaleDeceduti;
  }
  $('span.deltaTotaleDeceduti').text(deltaTotaleDeceduti);

  var deltaTotaleIsolamentoDomiciliare = (id[(id.length)-1])-(id[(id.length)-2]);
  if (deltaTotaleIsolamentoDomiciliare > 0) { 
    deltaTotaleIsolamentoDomiciliare = "+" + deltaTotaleIsolamentoDomiciliare ;
  } else if (deltaTotaleIsolamentoDomiciliare < 0) {
    deltaTotaleIsolamentoDomiciliare = "" + deltaTotaleIsolamentoDomiciliare;
  }
  $('span.deltaTotaleIsolamentoDomiciliare').text(deltaTotaleIsolamentoDomiciliare);

  var deltaTotaleTerapiaIntensiva = (ti[(ti.length)-1])-(ti[(ti.length)-2]);
  if (deltaTotaleTerapiaIntensiva > 0) { 
    deltaTotaleTerapiaIntensiva = "+" + deltaTotaleTerapiaIntensiva ;
  } else if (deltaTotaleTerapiaIntensiva < 0) {
    deltaTotaleTerapiaIntensiva = "" + deltaTotaleTerapiaIntensiva;
  }
  $('span.deltaTotaleTerapiaIntensiva').text(deltaTotaleTerapiaIntensiva);

  var labels = [
      'Ricoverati', 
      'Terapia Intensiva',
      'Isolamento Domiciliare',
      'Guariti',
      'Deceduti',
    ];
    var graphData = [
      rcs[(rcs.length)-1],
      ti[(ti.length)-1],
      id[(id.length)-1],
      dg[(dg.length)-1],
      dec[(dec.length)-1]
    ];
  
    var chart = new Chart('doughnut', {
      type: 'doughnut',
      responsive: true,
      data: {
        labels: labels,
        datasets: [
          {
            data: graphData,
            backgroundColor: ['#d5c53b', '#d5753b', '#3ba8d5', '#3bd55f', '#d53b3b'],
          }
        ],
      },
      options: {
          legend: {
            display: false,
          }
        }
    });
  }