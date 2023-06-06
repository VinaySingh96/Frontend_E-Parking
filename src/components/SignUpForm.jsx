import React, { Component, useState } from "react";
import Loader from "./Loader";

const url = 'http://localhost:8000/api/auth/createUser';

const SignUpForm = ({ setSignIn, setLogin,setUser }) => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [loader, setLoader] = useState(false);
  const [errmsg, setErrmsg] = useState();

  const handleChange = (e) => {
    // console.log(e.target.value)
    setInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async(e) => {
    setLoader(true);
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(info);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        // Adding body or contents to send
        body: JSON.stringify(info)
      });
      const data = await response.json();
      if(!response.ok){
        setErrmsg("User for this email already exists. Please Sign In");
        setLoader(false);
        return;
      }
      localStorage.setItem('token',data.authToken);
      setUser(data.name);
      console.log(data)
    } catch (error) {
      setErrmsg("Something went wrong. Please try again.");
      setLoader(false);
      console.log(error);
      return;
    }
    setLogin(true);
  }

  const onClick=()=>{
    setSignIn(true)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="appForm">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ width:'85%',textAlign: 'center', color: 'white', fontFamily: 'sans-serif', fontSize: '22 px', fontWeight: 'bold' }}>Sign Up</h1>
          <button className="btn-primary" onClick={onClick} style={{ width: '20%', textAlign: 'center', color: 'grey', fontFamily: 'sans-serif', fontSize: '22 px', fontWeight: 'bold' }}>Sign In</button>
        </div>
        <h2 style={{textAlign:'center',color:'red',marginLeft:'-50px'}}>{errmsg}</h2>
        <div className="formCenter">
          <form onSubmit={handleSubmit} className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput text-black"
                placeholder="Enter your full name"
                name="name"
                value={info.name}
                onChange={handleChange}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput text-black"
                placeholder="Enter your email"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput text-black"
                placeholder="Enter your password"
                name="password"
                value={info.password}
                onChange={handleChange}
              />
            </div>



            <div className="formField">
            <button href="#_" class="relative inline-flex items-center justify-start inline-block px-14 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
                <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">Sign Up</span>
              </button>
            </div>
            {loader?(<Loader />):""}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
