import React, { useContext, useEffect, useState } from "react";
import { ParkingProviderContext } from "../context/ParkingProviderContext";
const { ethereum } = window;
import { Loader } from '.';


const url = 'http://localhost:8000/api/ParkingLot/approvePL_admin/';
const url_refresh = 'http://localhost:8000/api/ParkingLot/admin_approve';

const PendingPL = ({ pendingPL, setPendingPL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();
  const { currentAccount, connectWallet, handleChange, formData, createEthereumContract } = useContext(ParkingProviderContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  const addPLtoBlockchain = async (pl) => {
    setIsLoading(true)
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.createParkingLot(pl.Email, pl.WalletAddress, pl.Name, pl.Fee, pl.TotalSlots, parseInt(pl.Lattitude), parseInt((pl.Lattitude % 1) * 1e6), parseInt(pl.Longitude), parseInt((pl.Longitude % 1) * 1e6));

        console.log(transactionHash);
        // await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        setMsg("Success");
        console.log(pl._id)
        approveByAdmin(pl);

      } else {
        setMsg("Account is not connected.");
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      setMsg("Something went wrong. Please try again!");
      setIsLoading(false);
    }
  };

  const approveByAdmin = async (pl) => {
    try {
      let newurl = `${url}${pl._id}`;
      console.log(newurl)
      const response = await fetch(newurl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(pl)
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error);
      // setErrmsg("Something went wrong. Please try again")
      setIsLoading(false)
      return;
    }
  }

  const handleClick = async (e) => {
    // console.log(e.target)
    console.log(pendingPL.find(ele => ele._id === e.target.id));
    console.log(currentAccount)
    addPLtoBlockchain(pendingPL.find(ele => ele._id === e.target.id));
  }

  const refreshPL = async () => {
    try {

      const response = await fetch(url_refresh, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data)
      setPendingPL(data.allParkingLots);
      // console.log(pendingPL)
    } catch (error) {
      console.log(error);
      // setErrmsg("Something went wrong. Please try again")
      setIsLoading(false)
      return;
    }
  }
  return (
    <>
      <div className="flex flex-1 justify-center items-center flex-col mf:mr-10 ">

        <div className="flex gap-10">
          <h1 className="text-3xl sm:text-4xl text-white text-gradient py-1">
            Parking Lots to Approve </h1>
          <button onClick={refreshPL} class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
            <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#AB7C94" d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" /></svg>
            <span class="mx-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Refresh</span>
            <span class="absolute inset-0 border-2 border-white rounded-full"></span>
          </button>


        </div>
        <div className="hr" ></div>
        {isLoading && <Loader />}
        <h2 style={msg === 'Success' ? { color: '#2e7d32' } : { color: '#c62828' }}>{msg}</h2>
      </div>
      <div className="container2 py-10">

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="d-flex approve-card blue-glassmorphism mt-4 " style={{ justifyContent: 'space-around', fontWeight: 'bolder' }}>
            <span className="w-[50px]" >Name</span>
            <span className="w-[360px]">Wallet Address</span>
            <span className="w-[30px]" >Fee</span>
            <span className="w-[30px]" >Slots</span>
            <span className="w-[30px]" >Status</span>
            <button type="button" className="" style={{ width: '3.5rem' }}>
            </button>
            <span>Action</span>
            <button type="button" className="" style={{ width: '3.5rem' }}>
            </button>
          </div>
          <span className="relative flex h-3 w-3">
          </span>
        </div>
        {pendingPL && pendingPL.map((item) => {
          // console.log(item)
          return (
            <div key={item._id} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="d-flex approve-card blue-glassmorphism mt-4" style={{ justifyContent: 'space-around' }}>
                <span className="w-[50px] item-center">{item.Name}</span>
                <span className="w-[360px] item-center">{item.WalletAddress}</span>
                <span className="w-[30px] item-center">{item.Fee}</span>
                <span className="w-[30px] item-center">{item.TotalSlots}</span>
                <span className={"w-[30px] item-center"}>{item.Status}</span>
                <button type="button" className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#dc2626] rounded-full cursor-pointer bg-red-500" style={{ width: '6rem' }}>
                  Decline
                </button>
                <button onClick={handleClick} id={item._id} type="button" className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#16a34a] rounded-full cursor-pointer bg-lime-700" style={{ width: '6rem' }}>
                  Approve
                </button>
              </div>
              <span className="relative flex h-3 w-3">

                <span className=" dot animate-ping absolute h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className=" dot relative rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </div>
          )
        })
        }

      </div>
    </>
  );
};

export default PendingPL;