import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from "./components/User";
import Index1 from "./Index1";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index1 />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
