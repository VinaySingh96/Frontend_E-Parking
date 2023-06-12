import React, { useContext, useState } from "react";

import AllParkingLot from "./AllParkingLot";
import "./AllParkingLot.css";
import Update from "./Update";
import BookingsProvider from "./BookingsProvider";


const ParkingLotsProvider = ({ allPL, setAllPL }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [parkingLot, setParkingLot] = useState(false);
  const [hide, setHide] = useState(false);
  const [errmsg, setErrmsg] = useState();

  const url_refresh = 'https://theparkingspotserver.onrender.com/api/ParkingLot/fetchAllParkingLots';

  const refreshPL = async () => {
    console.log('hi')
    console.log(localStorage.getItem('token'))
    try {
      const response = await fetch(url_refresh, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      const data = await response.json();
      console.log(data)
      if(data.length==0){
        setErrmsg("No Parking lot.")
      }
      else{
        setErrmsg("");
      }
      setAllPL(data)
    } catch (error) {
      console.log(error);
      setErrmsg("Something went wrong. Please try again reason : "+error)
      // setIsLoading(false)
      return;
    }
  }

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 ">
      <div className="flex flex-col md:p-12 py-12 px-4 justify-center items-center">

        <div className="flex gap-10">
          <h1 className="text-3xl sm:text-4xl text-white text-gradient py-1">
            My Parking Lots </h1>
          <button onClick={refreshPL} class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
            <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path fill="#AB7C94" d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" /></svg>
            <span class="mx-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Refresh</span>
            <span class="absolute inset-0 border-2 border-white rounded-full"></span>
          </button>

        </div>
        <h2 className="text-red-600">{errmsg}</h2>
        {showUpdate && <Update setShowUpdate={setShowUpdate} setHide={setHide} parkingLot={parkingLot} />}
        <div className="flex flex-wrap justify-center items-center mt-10 w-[80%]" style={hide ? { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' } : {}}>
          {allPL.map((item) => {
            return (
              <AllParkingLot key={item._id} parkingLot={item} setShowUpdate={setShowUpdate} setParkingLot={setParkingLot} setHide={setHide} />
            )
          }
          )}
        </div>
        <BookingsProvider />
        
      </div>
    </div>
  );
};

export default ParkingLotsProvider;
