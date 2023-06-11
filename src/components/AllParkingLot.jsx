import React, { useState, useRef } from "react";
import "./AllParkingLot.css";
import logo from '../../images/parkingLogo.png'
import { FiEdit } from 'react-icons/fi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import './AllParkingLot.css';

const url = 'https://theparkingspotserver.onrender.com/api/ParkingLot/deleteParkingLot';

const DeletePL = ({ setDeleteClick , parkingLot}) => {
  const handleClick = async(e) => {
    setDeleteClick(false)
    if(e.target.name==='close') return;
    try {
      const response = await fetch(`${url}/${parkingLot._id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
        // Adding body or contents to send
      });
      const data = await response.json();
      if(!response.ok){
        // if problem in verification in backend (To Do)
        return;
      }
      else{
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      // setErrmsg("Something went wrong. Please try again")
      // setLoader(false)
      return;
    }
  }
  return (
    <div className="deletemodal">
      <span>Remove Parking Lot ?</span>
      <span style={{ fontFamily: 'sans-serif', fontWeight: '600', fontSize: '10px', color: 'red' }}>This will delete the parking lot permanently!</span>
      <div className="flex justify-center gap-[2%] w-[80%]">
        <button className="btn close" name="close" onClick={handleClick}>Close</button>
        <button className="btn confirm" name="confirm" onClick={handleClick}>Confirm</button>
      </div>
    </div>
  )
}
export default function Card({ parkingLot, setShowUpdate, setParkingLot, setHide }) {

  const [deleteClick, setDeleteClick] = useState(false);
  const handleClick = (e) => {
    if (e.target.name == 'delete') {
      setDeleteClick(!deleteClick);
    }
    if (e.target.name == 'edit') {
      setHide(true);
      setShowUpdate(true)
      setParkingLot(parkingLot);
    }
  }
  return (
    <>
    {/* p-6 border border-gray-200 rounded-lg shadow bg-gray-800 text-white border-gray-700 */}
      <div className="card p-4 mb-3 border-gray-200 rounded-lg shadow bg-gray-800 text-white border-gray-700 shadow-lg shadow-cyan-500/50 text-white w-[200%]" >
        <h1 className="sneaaker-img" style={{ textAlign: 'center', color: 'yellow', fontSize: '20px', fontWeight: 'bold' }}>{parkingLot.Name}</h1>

        <div className="flex">
          <div className="box1 w-[120%]" >
            <span>Fee  </span>
            <span>Total Slots  </span>
            <span> Wallet Address  </span>
          </div>
          <div className="box2  w-[100%]" >
            <span> : {parkingLot.Fee}</span>
            <span> : {parkingLot.TotalSlots}</span>
            <span> : {parkingLot.WalletAddress}</span>
          </div>
        </div>

        <div className="flex justify-around w-[80%]">
          <div className="cta edit"  >
            <FiEdit fontSize={24} className="icon" />
            <button className="button-text" name="edit" onClick={handleClick} >Edit Info</button>
          </div>
          <div className="cta delete" name="delete" >
            <MdOutlineDeleteOutline fontSize={24} className="icon" />
            <button className="button-text" name="delete" onClick={handleClick}>Remove</button>
          </div>
        </div>
        {deleteClick && <DeletePL setDeleteClick={setDeleteClick} parkingLot={parkingLot} />}
      </div>
    </>
  );
}
