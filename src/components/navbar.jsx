import React from "react";

const Navbar = ({scrollToAbout, scrollToCareer, scrollToContact}) => {
  return (
    <div className=" bg-[#00230F] flex">
      <div className="flex text-sm md:text-base  gap-6 mx-auto w-full max-w-6xl px-4 py-6 items-center justify-end">
        <div className="hover:text-[#D0EA50] cursor-pointer" onClick={() => scrollToAbout()}>about us .</div>
        <div className="hover:text-[#D0EA50] cursor-pointer" onClick={()=>scrollToCareer()} >career .</div>
        <div className="hover:text-[#D0EA50] cursor-pointer" onClick={scrollToContact}>contact .</div>
      </div>
    </div>
  );
};

export default Navbar;
