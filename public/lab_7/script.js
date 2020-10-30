/* eslint-disable no-console */
/* eslint-disable linebreak-style */
function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  async function loadData() {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
  
    const arrayOfTenItems = range(10);
    const randomRestaurantsArray = arrayOfTenItems.map((item) => {
      const which = getRandomIntInclusive(0, json.length);
      const restaurant = json[which]; // we are not worrying about uniqueness here
      return restaurant;
    });
    CanvasJS.addColorSet('customColorSet1', [
      '#deeaee',
      '#b1cbbb',
      '#eea29a',
      '#c94c4c'
    ]);

    return {
      animationEnabled: true,
      colorSet: 'customColorSet1',
      title: {
        text: 'Places to Eat Out In Future'
      },
      axisX: {
        interval: 1,
        labelFontSize: 12
      },
      axisY2: {
        interlacedColor: 'rgba(1,77,101,.2)',
        gridColor: 'rgba(1,77,101,.1)',
        title: 'Restaurant Type',
        labelFontSize: 12,
        scaleBreaks: {
          customBreaks: [
            {
              startValue: 40,
              endValue: 50,
              color: 'orange',
              type: 'zigzag'
            },
            {
              startValue: 85,
              endValue: 100,
              color: 'orange',
              type: 'zigzagged'
            },
            {
              startValue: 140,
              endValue: 175,
              color: 'orange',
              type: 'zigzagged'
            }
          ]
        }
      },
      data: [
        {
          type: 'bar',
          name: 'restaurants',
          axisYType: 'secondary',
          dataPoints: datapointsFromRestaurantsList
        }
      ]
    };
  }

  function runThisWithResultsFromServer(jsonFromServer) {
    console.log('jsonFromServer', jsonFromServer);
    sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
    // Process your restaurants list
    // Make a configuration object for your chart
    // Instantiate your chart
    const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
    const options = makeYourOptionsObject(reorganizedData);
    const chart = new CanvasJS.Chart('chartContainer', options);
    chart.render();
  }

  // Leave lines 52-67 alone; do your work in the functions above
  document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
      .catch((err) => {
        console.log(err);
      });
  });
  window.onload = loadData();
}
