
  export default function locate(lat1, lon1) { //Запрос данных с FlightRadar24
    // const url = `http://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=${lat1+6.6},${lon1-6.7},${lat1-6.8},${lon1+6.5}&adsb=1&air=1&array=1` //63.9,58.4,57.5,68.7
    const url = `http://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=${lat1+2.6},${lon1-4.7},${lat1-3.8},${lon1+5.5}&adsb=1&air=1&array=1` //63.9,58.4,57.5,68.7
    // const url = `http://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=63.9,58.4,57.5,68.7&adsb=1&air=1&array=1` //63.9,58.4,57.5,68.7
      try{
      return fetch(url, {
      redirect: 'follow',
      referrer: 'no-referrer',
      referrerPolicy: 'no-referrer',
    })
      .then(res => res.json())
      .then(res =>{return res.aircraft})
    }
      catch(err) {console.log(err)
        window.location.reload()}
  }