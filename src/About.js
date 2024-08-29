function About() {
  return (
    <div className="h-screen w-screen bg-[#2e2e2e] flex flex-col justify-center items-center text-white sm:flex-row">
      <div className="flex sm:flex-1 h-1/3 flex-col justify-end sm:justify-center">
        <h1>About us</h1>
        <p>
          We are a group of passionate students from SRMIST, Ramapuram with a
          goal to bolster society with technology, wherever required. We pinned
          down on problems related to communicating with speech impaired people
          and this is our solution for this problem.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center flex-3 sm:bg-[#eaffda] sm:h-full w-3/5">
        <div className="Person-Details bg-[#737373] rounded-md m-1.5 p-2 drop-shadow-md sm:h-[25vh] flex flex-col justify-center items-center w-full sm:w-1/2 text-wrap">
          <h3>Person Name</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            commodo euismod mauris quis consectetur. Vestibulum ac ullamcorper
            felis. Nunc iaculis.
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;