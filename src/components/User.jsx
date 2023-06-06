import React, { useState } from 'react'
import MapComponent from './MapComponent'

const User = () => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 34.126405, lng: 74.835872 });
  const [showMap, setShowMap] = useState(true);

  const handleClick =()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  return (
    <div className='gradient-bg-welcome flex justify-center flex-col p-20' style={{  width:'100%'  }}>
      {showMap &&
        <MapComponent setMarkerPosition={setMarkerPosition} setShowMap={setShowMap} markerPosition={markerPosition} />
      }
      <div className='flex justify-center mt-20'>

      <button onClick={handleClick} class="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
        <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span class="relative">Find parking lot</span>
      </button>
      </div>
    </div>

  )
}

export default User