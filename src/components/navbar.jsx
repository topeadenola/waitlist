import React from "react";

const Navbar = ({scrollToAbout, scrollToCareer, scrollToContact}) => {
  return (
    <div className=" bg-[#00230F] flex">
      <div className="flex text-sm md:text-normal gap-6 mx-auto w-full max-w-6xl px-4 py-6 items-center justify-end">
        <div  onClick={() => scrollToAbout()}>about us .</div>
        <div onClick={()=>scrollToCareer()} >career .</div>
        <div onClick={scrollToContact}>contact .</div>
      </div>
    </div>
  );
};

export default Navbar;
