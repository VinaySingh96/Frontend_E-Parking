import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
const { ethereum } = window;
import { Loader } from '.';
import Card from "./Card";

const PendingPL = ({ pendingPL, setPendingPL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();
  const { currentAccount, connectWallet, handleChange, formData, createEthereumContract } = useContext(TransactionContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  const sendTransaction = async (pl) => {
    setIsLoading(true)
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const transactionHash = await transactionsContract.createParkingLot(pl._id, pl.Name, pl.Fee, pl.TotalSlots, pl.Lattitude, pl.Longitude);

        console.log(transactionHash);
        // await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        setMsg("Success");

      } else {
        setMsg("Account is not connected.");
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      setMsg("Something went wrong. Please try again!");
      setIsLoading(false);
      throw new Error("No ethereum object");
    }
  };
  const handleClick = async (e) => {
    // console.log(e.target)
    console.log(pendingPL.find(ele => ele._id === e.target.id));
    console.log(currentAccount)
    sendTransaction(pendingPL.find(ele => ele._id === e.target.id));
  }
  return (
    <>
      <div className="flex flex-1 justify-center items-center flex-col mf:mr-10 ">
        <h1 className="text-3xl sm:text-4xl text-white text-gradient py-1">
          Parking Lots to Approve </h1>
        <div className="hr" ></div>
        {isLoading && <Loader />}
        <h2 style={msg==='Success'?{color:'#2e7d32'}:{color:'#c62828'}}>{msg}</h2>
      </div>
      <div className="container2 py-10">

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="d-flex approve-card blue-glassmorphism mt-4 " style={{ justifyContent: 'space-around', fontWeight: 'bolder' }}>
            <span className="w-[50px]" >Name</span>
            <span className="w-[300px]">Wallet Address</span>
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
        {pendingPL.map((item) => {
          // console.log(item)
          return (
            <div key={item._id} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="d-flex approve-card blue-glassmorphism mt-4" style={{ justifyContent: 'space-around' }}>
                <span className="w-[50px] item-center">{item.Name}</span>
                <span className="w-[300px] item-center">{item.WalletAddress}</span>
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