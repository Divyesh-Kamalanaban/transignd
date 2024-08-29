  import React from "react";
  import { Link } from "react-router-dom";
  import './Home.css';
  // import codesolid from './Icons/code-solid.svg';
  // import audioregular from "./Icons/file-audio-regular.svg";
  // import headphones from "./Icons/headphones-solid.svg";
  // import music from "./Icons/music-solid.svg";
  // import radio from "./Icons/radio-solid.svg"; 
  // import record from "./Icons/record-vinyl-solid.svg";
  // import sliders from "./Icons/sliders-solid.svg";
  // import volumehigh from "./Icons/volume-high-solid.svg";
  // import volumelow from "./Icons/volume-low-solid.svg";
  // import volumeoff from "./Icons/volume-off-solid.svg";
  // import volumex from "./Icons/volume-xmark-solid.svg";

  // function IconRows(){
  //   return (
  //     <div className="Row flex z-10 justify-center">
  //       <svg src={codesolid} alt="Code Solid Icon" className="icons" />
  //       <img src={audioregular} alt="Audio Regular Icon" className="icons" />
  //       <img src={headphones} alt="Headphones Icon" className="icons" />
  //       <img src={microphoneslash} alt="Microphone Slash Icon" className="icons"/>
  //       <img src={microphone} alt="Microphone Icon" className="icons"/>
  //       <img src={music} alt="Music Icon" className="icons"/>
  //       <img src={radio} alt="Radio Icon" className="icons"/>
  //       <img src={record} alt="Record Icon" className="icons"/>
  //       <img src={sliders} alt="Sliders Icon" className="icons"/>
  //       <img src={volumehigh} alt="Volume High Icon" className="icons"/>
  //       <img src={volumelow} alt="Volume Low Icon" className="icons"/>
  //       <img src={volumeoff} alt="Volume Off Icon" className="icons"/>
  //       <img src={volumex} alt="Volume X Icon" className="icons"/>
  //     </div>
  //   );
  // }
  function Home() {
    
    return (
      <div className="h-screen w-screen sm:bg-[#2e2e2e] sm:bg-none bg-cover bg-center bg-home-grey flex flex-col justify-center items-center text-white sm:flex-row">
        <div className="flex sm:flex-1 h-1/3 flex-col justify-end sm:justify-center md:w-2/5 md:h-full p-2">
          <h1>Communication was never this easy.</h1>
          <p>
            Transignd enables everyone to easily communicate with people with
            impaired hearing and speech ability by harnessing the power of AI.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center flex-3 md:flex-row sm:bg-home-green sm:h-full w-3/5 bg-cover md:cutoff-left">
          <div className="ISL-Text text-center bg-[#737373] flex-1 rounded-md m-1.5 p-2 drop-shadow-md md:h-[25vh] flex flex-col justify-center items-center md:ml-11 h-max">
            <p>Use our free tool to translate Indian Sign Language to Text.</p>

            <Link
              to="/ISL-TEXT"
              className="bg-[#84e296] p-3 rounded-2xl m-1 text-[#2e2e2e] w-1/2 drop-shadow-md text-center"
            >
              ISL to Text
            </Link>
          </div>

          <div className="Audio-ISL text-center bg-[#737373] flex-1 rounded-md m-1.5 p-2 drop-shadow-md md:h-[25vh] flex flex-col justify-center items-center">
            <p>Use our free tool to translate Audio to Indian Sign Language.</p>

            
            <Link
              to="/AUDIO-ISL"
              className="bg-[#84e296] p-3 rounded-2xl m-1 text-[#2e2e2e] w-1/2 drop-shadow-md text-center"
            >
              Audio to ISL
            </Link>
          </div>
        </div>
      </div>
    );
  }
  export default Home;