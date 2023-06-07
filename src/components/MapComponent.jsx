import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ setMarkerPosition, setShowMap, markerPosition }) => {
  // const [markerPosition, setMarkerPosition] = useState();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDeosvjuXnbDOLK0qsW-vBgqUoHIcRCkhY',
  });

  const handleMapClick = (event) => {
    const { latLng } = event;
    setMarkerPosition({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
    // console.log(markerPosition.lat)
    // console.log(markerPosition.lng)
  };
  const handleClick = () => {
    setShowMap(false);
  }

  return isLoaded ? (
    <div className='flex flex-col w-[100%] justify-center'>
      <button
        type="button"
        onClick={handleClick}
        className="text-white w-[20%] mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-red-400 rounded-full cursor-pointer"
      >
        Close
      </button>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={markerPosition}
        zoom={12}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker key="marker1" position={markerPosition} title='Hello World!' />}
        
      </GoogleMap>
    </div>
  ) : (
    <div>Loading Map...</div>
  );
};

export default MapComponent;
