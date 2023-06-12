import React, { useState } from 'react'
import MapForUser from './MapForUser'
import ParkingLot from './ParkingLot'
const url = 'https://theparkingspotserver.onrender.com/api/ParkingLot/fetchAllParkingLots_admin';

const User = () => {
  const [markerPosition, setMarkerPosition] = useState();
  const [showMap, setShowMap] = useState(true);
  const [allPL,setAllPL]=useState();
  const [plData, setPlData] = useState();


  const handleClick =()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setMarkerPosition({lat:position.coords.latitude,lng:position.coords.longitude})
    });

    fetchAllPL();
  }

  const fetchAllPL=async ()=>{
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      setAllPL(data);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  return (
    <div className='gradient-bg-welcome flex justify-center flex-col px-20 font-bold' >
      {showMap &&
        <MapForUser setMarkerPosition={setMarkerPosition} setShowMap={setShowMap} markerPosition={markerPosition} allPL={allPL} setPlData={setPlData} />
      }
      <div className='flex justify-center mt-10 mb-10'>

      <button onClick={handleClick} class="relative rounded px-5 py-2 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
        <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span class="relative">Find parking lot</span>
      </button>
      </div>
      <ParkingLot plData={plData} setPlData={setPlData}/>
    </div>

  )
}

export default User