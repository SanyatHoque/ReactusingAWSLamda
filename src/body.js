import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Switch from "react-switch";


export default function Body() {
  const [viewport, setViewport] = useState({
    latitude: (43.6708+43.0896)/2,
    longitude: -79.3899,
    width: "90%",
    height: "150vh",
    zoom: 9
  });
  const [selectedPark, setSelectedPark] = useState(null);
  
  const [data0,setData0] = useState();

  const [data_eventsHourly,setData_eventsHourly] = useState([]);
  let [hour_eventsHourly,setHour_eventsHourly] = useState([]);
  let [events_eventsHourly,setEvents_eventsHourly] = useState([]);
  let [date_eventsHourly,setDate_eventsHourly] = useState([]);

  const [data_eventsDaily,setData_eventsDaily] = useState([]);
  let [events_eventsDaily,setEvents_eventsDaily] = useState([]);
  let [date_eventsDaily,setDate_eventsDaily] = useState([]);

  const [data_statsHourly,setData_statsHourly] = useState([]);
  let [hour_statsHourly,setHour_statsHourly] = useState([]);
  let [impressions_statsHourly,setImpressions_statsHourly] = useState([]);
  let [date_statsHourly,setDate_statsHourly] = useState([]);
  let [clicks_statsHourly,setClicks_statsHourly] = useState([]);
  let [revenue_statsHourly,setRevenue_statsHourly] = useState([]);

  const [data_statsDaily,setData_statsDaily] = useState([]);
  let [impressions_statsDaily,setImpressions_statsDaily] = useState([]);
  let [date_statsDaily,setDate_statsDaily] = useState([]);
  let [clicks_statsDaily,setClicks_statsDaily] = useState([]);
  let [revenue_statsDaily,setRevenue_statsDaily] = useState([]);

  const [dataPoi,setDataPoi] = useState([]);
  let [poi_id,setPoi_id] = useState([]);
  let [name,setName] = useState([]);
  let [lat,setLat] = useState([]);
  let [lon,setLon] = useState([]);

  const [checked1,setChecked1] = useState(false);
  const [checked2,setChecked2] = useState(false);
  const [checked3,setChecked3] = useState(false);
  const [checked4,setChecked4] = useState(false);
var FETCH = 'https://xomwdkz2n3.execute-api.ca-central-1.amazonaws.com/production'  // AWS Lambda
// var FETCH = 'http://localhost:8080';
/////////////////////////////////////////////////// events/hourly

useEffect(() => {
  const getDataEventsHourly = () => {
    fetch(FETCH+'/events/hourly', {
        method: "GET"
    }).then((res1) => {
        return res1.text();
    }).then((restext1) => {
        return JSON.parse(restext1);
    }).then((resJson1) => {
        setData_eventsHourly(resJson1)
        
    })
  }
  getDataEventsHourly();
}, []);

console.log('data console',data_eventsHourly)
var x1 = [];
var x2 = [];
var x3 = [];
data_eventsHourly.map(x =>{
  let hr = x['hour'];
  let eve = x['events'];
  let dte = x['date'];
  x1.push(hr);
  x2.push(eve);
  x3.push(dte.slice(0, 10));
})
hour_eventsHourly = x1;
events_eventsHourly = x2;
date_eventsHourly = x3;
console.log('hour console',hour_eventsHourly);
console.log('events console',events_eventsHourly);
console.log('date console',date_eventsHourly);

let data014 = date_eventsHourly ; 
let data015 = hour_eventsHourly ;
let data016 = events_eventsHourly ;
console.log('data014',data014)
let datamain_eventsHourly = [];
datamain_eventsHourly.push(data014,data015,data016)
datamain_eventsHourly = datamain_eventsHourly[0].map((_, colIndex) => datamain_eventsHourly.map(row => row[colIndex]));
datamain_eventsHourly = [['Date','hour','events'],...datamain_eventsHourly];
console.log('datamain_eventsHourly',datamain_eventsHourly)

/////////////////////////////////////////////////// events/daily
useEffect(() => {
  const getDataEventsDaily = () => {
    fetch(FETCH+'/events/daily', {
        method: "GET"
    }).then((res) => {
        return res.text();
    }).then((restext) => {
        return JSON.parse(restext);
    }).then((resJson) => {
        setData_eventsDaily(resJson)
        
    })
  }
getDataEventsDaily();
}, []);

console.log('data console',data_eventsDaily)
var x1 = [];
var x2 = [];
data_eventsDaily.map(x =>{

  let eve = x['events'];
  let dte = x['date'];

  x1.push(parseInt(eve));
  x2.push(dte.slice(0,10));
})
events_eventsDaily = x1;
date_eventsDaily = x2;
console.log('events console',events_eventsDaily);
console.log('date console',date_eventsDaily);

data014 = date_eventsDaily ; 
data016 = events_eventsDaily ;
let datamain_eventsDaily = [];
datamain_eventsDaily.push(data014,data016)
datamain_eventsDaily = datamain_eventsDaily[0].map((_, colIndex) => datamain_eventsDaily.map(row => row[colIndex]));
datamain_eventsDaily = [['Date','events'],...datamain_eventsDaily];
console.log('datamain_eventsHourly',datamain_eventsDaily)
/////////////////////////////////////////////////// stats/hourly
useEffect(() => {
  const getDataStatsHourly = () => {
    fetch(FETCH+'/stats/hourly', {
        method: "GET"
    }).then((res) => {
        return res.text();
    }).then((restext) => {
        return JSON.parse(restext);
    }).then((resJson) => {
        setData_statsHourly(resJson)
        
    })
  }
getDataStatsHourly();
}, []);

console.log('data_statsHourly console',data_statsHourly[0])
var x1=[];
var x2 = [];
var x3 = [];
var x4 = [];
var x5 = [];
data_statsHourly.map(x =>{
  let hr = x['hour'];
  let imp = x['impressions'];
  let dte = x['date'];
  let clks = x['clicks'];
  let rev = x['revenue'];
  x1.push(hr);
  x2.push(imp/1000);
  x3.push(dte.slice(0, 10));
  x4.push(clks);
  x5.push(parseInt(rev));
})
hour_statsHourly = x1;
impressions_statsHourly = x2;
date_statsHourly = x3;
clicks_statsHourly = x4;
revenue_statsHourly = x5;
console.log('hour console',hour_statsHourly);
console.log('impressions console',impressions_statsHourly);
console.log('date console',date_statsHourly);
console.log('clicks console',clicks_statsHourly);
console.log('revenue console',revenue_statsHourly);

data014 = date_statsHourly ; 
data015 = impressions_statsHourly ;
data016 = clicks_statsHourly ;
let data017 = revenue_statsHourly ;
let data018 = hour_statsHourly ;
console.log('data014',data014)
let datamain_statsHourly = [];
datamain_statsHourly.push(data014,data015,data016,data017,data018)
datamain_statsHourly = datamain_statsHourly[0].map((_, colIndex) => datamain_statsHourly.map(row => row[colIndex]));
datamain_statsHourly = [['Date','impressions/1000','clicks','revenue','hour'],...datamain_statsHourly];
console.log('datamain_statsHourly',datamain_statsHourly)
/////////////////////////////////////////////////// stats/daily
useEffect(() => {
  const getDataStatsDaily = () => {
    fetch(FETCH+'/stats/daily', {
        method: "GET"
    }).then((res) => {
        return res.text();
    }).then((restext) => {
        return JSON.parse(restext);
    }).then((resJson) => {
        setData_statsDaily(resJson)
        
    })
  }
getDataStatsDaily();
}, []);

console.log('data console',data_statsDaily[0])
var x1 = [];
var x2 = [];
var x3 = [];
var x4 = [];
data_statsDaily.map(x =>{
  let imp = x['impressions'];
  let dte = x['date'];
  let clks = x['clicks'];
  let rev = x['revenue'];
  x1.push(parseInt(imp)/1000);
  x2.push(dte.slice(0, 10));
  x3.push(parseInt(clks));
  x4.push(parseInt(rev));
})

impressions_statsDaily = x1;
date_statsDaily = x2;
clicks_statsDaily = x3;
revenue_statsDaily = x4;
console.log('impressions console',impressions_statsDaily);
console.log('date console',date_statsDaily);
console.log('clicks console',clicks_statsDaily);
console.log('revenue console',revenue_statsDaily);

data014 = date_statsDaily ; 
data015 = impressions_statsDaily ;
data016 = clicks_statsDaily ;
data017 = revenue_statsDaily ;
let datamain_statsDaily = [];
datamain_statsDaily.push(data014,data015,data016,data017)
datamain_statsDaily = datamain_statsDaily[0].map((_, colIndex) => datamain_statsDaily.map(row => row[colIndex]));
datamain_statsDaily = [['Date','impressions/1000','clicks','revenue'],...datamain_statsDaily];
console.log('datamain_statsDaily',datamain_statsDaily)
/////////////////////////////////////////////////// Map Visualization
useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
}, []);

/////////////////////////////////////////////////// stats/daily
useEffect(() => {
  const getPoi = () => {
    fetch(FETCH+'/poi', {
        method: "GET"
    }).then((res) => {
        return res.text();
    }).then((restext) => {
        return JSON.parse(restext);
    }).then((resJson) => {
        setDataPoi(resJson)
        
    })
  }
getPoi();
}, []);

console.log('data console',dataPoi)
var x1 = [];
var x2 = [];
var x3 = [];
var x4 = [];
dataPoi.map(x =>{
  let poi_idEach = x['poi_id'];
  let nameEach = x['name'];
  let latEach = x['lat'];
  let lonEach = x['lon'];
  x1.push(poi_idEach);
  x2.push(nameEach);
  x3.push(latEach);
  x4.push(lonEach);
})
poi_id = x1;
name = x2;
lat = x3;
lon = x4;
console.log('poi_id console',poi_id);
console.log('name console',name);
console.log('lat console',lat);
console.log('lot console',lon);

data014 = poi_id ; 
data015 = name ;
data016 = lat ;
data017 = lon ;

const handleChange1 = nextChecked => {
  setChecked1(nextChecked);
};
const handleChange2 = nextChecked => {
  setChecked2(nextChecked);
};
const handleChange3 = nextChecked => {
  setChecked3(nextChecked);
};
const handleChange4 = nextChecked => {
  setChecked4(nextChecked);
};

  return (
    <div>
      <div className="Headerr">
      <label className="bla">
        <span>Show Data on Hourly Events</span>
      <Switch
            checked={checked1}
            onChange={handleChange1}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
      />
      </label>

      <label className="bla">
        <span>Show Data on Daily Events</span> 
     <Switch
            checked={checked2}
            onChange={handleChange2}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
      />
      </label>

      <label className="bla">
        <span>Show Data on Hourly Stats</span> 
           <Switch
            checked={checked3}
            onChange={handleChange3}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
      />
      </label>

      <label className="bla">
        <span>Show Data on Daily Stats</span> 
           <Switch
            checked={checked4}
            onChange={handleChange4}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
      />
      </label>
      </div>

      {checked1 ? (
      <>
      <div className="heading"><h1>Data about Hourly Events</h1></div>
      <Chart
      className='Chart'
        width={'90vw'}
        height={'100vh'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={datamain_eventsHourly}
        options={{
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Number',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </>
      ):null}

      {checked2 ? (
      <>
      <div className="heading"><h1>Data about Daily Events</h1></div>
      <Chart
        className='Chart'
        width={'90vw'}
        height={'100vh'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={datamain_eventsDaily}
        options={{
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Number',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </>
      ):null}

      {checked3 ? (
      <>
      <div className="heading"><h1>Data about Hourly Stats</h1></div>
      <Chart
        className='Chart'
        width={'90vw'}
        height={'100vh'}
        chartType="LineChart"
        fill
        loader={<div>Loading Chart</div>}
        data={datamain_statsHourly}
        options={{
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Number',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </>
      ):null}


      {checked4 ? (
      <>
      <div className="heading"><h1>Data about Daily Stats</h1></div>
      <Chart
        className='Chart'
        width={'90vw'}
        height={'100vh'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={datamain_statsDaily}
        options={{
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Number',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />  
      </>
      ):null}

      
      <div className="heading"><h1>POI Map</h1></div>
      <ReactMapGL
        className="Mapping"
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoic2FueWF0IiwiYSI6ImNrcXRjZTNtcjFod3MycW5iZ2xub3V1aW8ifQ.wbfAngSg3LqEj6LW9ugkcg"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >

        {dataPoi.map(x => (
          <Marker
            key={x['poi_id']}
            latitude={x['lat']}
            longitude={x['lon']}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPark(x);
                console.log('SELECTED selectedPark', selectedPark)
              }}
            >
              <img src="https://spng.pngfind.com/pngs/s/597-5975318_png-file-svg-location-icon-png-transparent-png.png" />
            </button>

          </Marker>
        ))}

            {selectedPark ? (
              <Popup
                latitude={selectedPark.lat}
                longitude={selectedPark.lon}
                onClose={() => {
                  setSelectedPark(null);
                }}
              >
                <div>
                  <h2>{selectedPark.name}</h2>
                  <p>POI Id: {selectedPark.poi_id}</p>
                </div>
              </Popup>
            ) : null}
      </ReactMapGL>
    </div>
  );
}
