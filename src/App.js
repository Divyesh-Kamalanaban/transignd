import "./App.css";
import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from './Home';
import Isltext from "./ISL-TEXT";
import About from "./About";
import AudioISL from "./AUDIO-ISL";

// NavBar component
function NavBar() {
  return (
    <div className="Navbar flex bg-[#494949] w-[80vw] translate-x-[10vw] mt-4 fixed rounded-xl drop-shadow-md justify-center sm:justify-around sm:w-[60vw] sm:translate-x-[20vw] text-wrap z-10">
      <div className="font-['League_Spartan'] font-bold sm:flex h-fit justify-center items-center text-3xl p-2 hidden">
        <span className="text-[#EAFFDA] tracking-tighter">tran</span>
        <span className="text-[#84e296] tracking-tighter">signd</span>
      </div>
      <div className="Links flex justify-around p-4 text-[#EAFFDA]">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/About">About</Link>
        </span>
        <span>
          <Link to="/work">Work</Link>
        </span>
        <span>
          <Link to="/contact">Contact</Link>
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    
      <div className="font-[Inter] tracking-tight font-light">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About />} />
          <Route path="/ISL-TEXT" element={<Isltext />} />
          <Route path="/AUDIO-ISL" element={<AudioISL/>} />
        </Routes>
      </div>
  );
}

export default App;
