function graficosSidebar() {
  var grap= '<canvas id="graficos_oficiales" width="400" height="400" style="background-color: #f8fafc;"></canvas><canvas id="graficos_suboficiales" width="400" height="400" style="background-color: #f8fafc;"></canvas>';
  document.getElementById("detalles").innerHTML = grap;
  //openSidebar();
  cargarEstadisticasPersonal();
}

function cargarEstadisticasPersonal() {
  console.log(cod_uni);
  let post_fields = {
      cod_uni : cod_uni
  }

  fetch("datos_area_personal_grados.php", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_fields),
  })
  .then(
      function(response) {
          if (response.status !== 200) {
              console.warn('Looks like there was a problem. Status Code: ' +
                  response.status);
              return;
          }
          response.json().then(function(datos) {

            console.log(datos);
              let cantidadesOf = [];
              let labelsOf = [];

              datos.oficiales.forEach(element => {
                  labelsOf.push(element.category)
                  cantidadesOf.push(element.first)
              });

              let cantidadesSubof = [];
              let labelsSubof = [];
              datos.suboficiales.forEach(element => {
                  labelsSubof.push(element.category)
                  cantidadesSubof.push(element.first)
              });

              cargarPersonalOficialesChart(labelsOf, cantidadesOf)
              cargarPersonalSuboficialesChart(labelsSubof, cantidadesSubof)
          });
      }
  )
  .catch(function(err) {
      console.error('Fetch Error -', err);
  });
}

function cargarPersonalOficialesChart(labels, data) {
  var personalOficialesCtx = document.getElementById('graficos_oficiales').getContext('2d');
  var personalOficialesChart
  let DATA_COUNT = 5;
  let NUMBER_CFG = {
      count: DATA_COUNT,
      min: 0,
      max: 100
  };

  let info = {
      labels,
      datasets: [{
          label: '# Personal',
          data,
          backgroundColor: [
              'rgb(182, 63, 42)',
              'rgb(182,  87, 62)',
              'rgb(144, 22, 1)',
              'rgb(182,  87, 62)',
              'rgb(144, 22, 1)',
              'rgb(224 106 75)'
          ]
      }]
  };

  let config = {
      type: 'bar',
      data: info,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Oficiales'
              }
          }
      },
  };

  personalOficialesChart = new Chart(personalOficialesCtx, config);
}

function cargarPersonalSuboficialesChart(labels, data) {
  var personalSuboficialesCtx = document.getElementById('graficos_suboficiales').getContext('2d');
  var personalSuboficialesChart
  let DATA_COUNT = 5;
  let NUMBER_CFG = {
      count: DATA_COUNT,
      min: 0,
      max: 100
  };

  let info = {
      labels,
      datasets: [{
          label: '# Personal',
          data,
          backgroundColor: [
              'rgb(182, 63, 42)',
              'rgb(182,  87, 62)',
              'rgb(144, 22, 1)',
              'rgb(224 106 75)'
          ]
      }]
  };

  let config = {
      type: 'bar',
      data: info,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Suboficiales'
              }
          }
      },
  };

  personalSuboficialesChart = new Chart(personalSuboficialesCtx, config)
}