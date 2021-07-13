import React, { useState, useEffect } from "react";
import Footer from './footer';
import Body from './body.js'

import './search.css';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [query,setQuery] = useState('');
  const [showResults, setShowResults] = useState(false)
  const [dataSearch,setDataSearch] = useState();

  var FETCH = 'https://xomwdkz2n3.execute-api.ca-central-1.amazonaws.com/production'  // AWS Lambda
//   var FETCH = 'http://localhost:8080'

  useEffect(() => {
    const getDataSearch = () => {
      fetch(FETCH+`/api/search?poi_name=${query}`, {
          method: "GET"
      }).then((res1) => {
          return res1.text();
      }).then((restext1) => {
          return JSON.parse(restext1);
      }).then((resJson1) => {
          return setDataSearch(resJson1)
      })
    }
    getDataSearch();
  }, [query]);

  const onClick = (e) => {
      e.preventDefault();
      setQuery(search);     
      setSearch('');
    }
      
return (
  <div>

  <div className="empty-div-above"></div>

  <div className="dispay-flex">
  <form className="topnav" onSubmit={onClick} >
      <input className="SearchBar" type="text" placeholder="Type POI name here... eg. EQ Works" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <button className="SearchIcon" type="submit">Search</button>
  </form>


  </div>
  <div className="empty-div"></div>

    {dataSearch? (<div className="searchPOIbox">
        {dataSearch.slice(0,15).map((x,key) => 

                <table id="customers">
                    <tr>
                        <th>Date</th>
                        <th>Hour</th>
                        <th>Events</th>
                        <th>poi_id</th>
                        <th>Impressions</th>
                        <th>Clicks</th>
                        <th>Revenue</th>
                        <th>Name</th>
                        <th>Geolocation</th>
                    </tr>
                    <tr>
                        <td><i>{x.date.slice(0, 10)}</i></td>
                        <td>{x.hour}</td>
                        <td>{x.events}</td>
                        <td>{x.poi_id}</td>
                        <td>{x.impressions}</td>
                        <td>{x.clicks}</td>
                        <td>{x.revenue.slice(0, 6)}</td>
                        <td><i>{x.name}</i></td>
                        <td>({x.lat},{x.lon})</td>
                    </tr>
                </table>

        )}
        </div>) 
        : (<div className="searchResNotFound"><i>Sorry No Matches Were Found...</i></div>)}


  </div>
    );
};
