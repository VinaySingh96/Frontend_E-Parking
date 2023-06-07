import React, { useState, useContext, useEffect } from "react";
import { Loader } from ".";
import MapComponent from "./MapComponent";

const url = 'http://localhost:8000/api/ParkingLot/createParkingLot';
const CreatePL = ({ text }) => {
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 34.126405, lng: 74.835872 });
  const [showMap, setShowMap] = useState(false);

  const defaultValue = {
    Name: "",
    WalletAddress: "",
    Fee: '',
    TotalSlots: '',
    Lattitude: '',
    Longitude: ''
  }
  const [ParkingLot, setParkingLot] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleSubmit = async (e) => {
    ParkingLot.Lattitude=markerPosition.lat;
    ParkingLot.Longitude=markerPosition.lng;
    console.log(ParkingLot);
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('token');
    console.log(token)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "auth-token": token
        },
        // Adding body or contents to send
        body: JSON.stringify(ParkingLot)
      });
      const data = await response.json();
      if (response.ok) {
        setMsg("Success")
      }
      else {
        setMsg(`Error :  ${data.Error}`);
      }
      setParkingLot(defaultValue);
      console.log(data);
      setIsLoading(false);
    } catch {
      setMsg("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  };

  const onChange = (e) => {
    setParkingLot((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleClick = () => {
    setShowMap(true);
  }
  return (
    <>
      <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Name} placeholder="Parking Lot Name" name="Name" type="text" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.WalletAddress} placeholder="Your Wallet Address" name="WalletAddress" type="text" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.Fee} placeholder="Fee/hour (ETH)" name="Fee" type="number" onChange={onChange} />
        <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={ParkingLot.TotalSlots} placeholder="Total Slots" name="TotalSlots" type="number" onChange={onChange} />
        <div className="flex  w-[100%]">
          <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" value={markerPosition.lat.toFixed(6)+" , "+markerPosition.lng.toFixed(6)} placeholder="" name="Location" type="text" />
          <button
            type="button"
            onClick={handleClick}
            className="text-white w-full mt-2 border-[1px] p-1 border-[#3d4f7c] hover:bg-yellow-500 rounded-full cursor-pointer">
            Choose Location
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-2" />

        {isLoading
          ? <Loader />
          : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Create Parking Lot
            </button>
          )}
        <h2 style={msg === 'Success' ? { color: '#2e7d32' } : { color: '#c62828' }}>{msg}</h2>

      </div>
      {showMap &&
        <MapComponent setMarkerPosition={setMarkerPosition} setShowMap={setShowMap} markerPosition={markerPosition} />
      }
    </>
  )
}

export default CreatePL;