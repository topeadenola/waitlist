"use client";
import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("loading");

  //   const res = await fetch("/api/join-waitlist", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email }),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     setStatus("success");
  //   } else {
  //     setStatus(`error: ${data.error}`);
  //   }
  // };

  return (
    <div className="bg-white w-full text-white custom-font font-light py-10 pb-8 border-none text-sm">
       <div className="flex md:hidden justify-center">
          <div className="flex  gap-4 w-fit ">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/upbreedlearn/about/?viewAsMember=true"
                    >
                      <img
                        className="font-light h-6  object-contain hover:opacity-[0.3]"
                        src="assets/Linkedin.png"
                      />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/upbreedlearn"
                    >
                      <img
                        className=" h-6  object-contain hover:opacity-[0.3]"
                        src="assets/Instagram.png"
                      />
                    </a>

                    <a target="_blank" href="https://x.com/upbreedlearn">
                      <img
                        className=" h-6 object-contain hover:opacity-[0.3]"
                        src="assets/x.png"
                      />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/upbreedlearn"
                    >
                      <img
                        className=" h-6 object-contain hover:opacity-[0.3]"
                        src="assets/Facebook.png"
                      />
                    </a>

                    <a href="">
                      <img
                        className=" h-6 object-contain hover:opacity-[0.3]"
                        src="assets/youtube.png"
                      />
                    </a>
                  </div>
          </div>

      <div className=" ">

        
        <div className=" max-w-6xl mx-auto flex flex-col justify-around gap-6 md:gap-0 md:flex-row md:justify-center md:items-end  pb-4 mb-4 md:pb-2 ">
          <div className="flex-1 gap-6 md:gap-32 flex flex-col px-4 md:flex-row justify-start min-h-[100%] items-start ">
            <div className="min-h-[100%] md:mt-auto mt-6 flex w-full flex-col md:items-start md:justify-end justify-center items-center">
              <a href="/">
                <img
                  src="/assets/logo3.png"
                  className="w-20 md:w-28 object-contain"
                />
              </a>
            </div>
            <div className=" font-light flex my-auto h-full flex-col  items-center justify-center">
              <div className="flex flex-col-reverse md:flex-col gap-6 my-auto">
              
              </div>
            </div>
          </div>
        </div>

        <div className="border-[#4747471A] border-b-2 w-full">

        </div>

          <div className="md:px-6 pt-2 text-[#00230F]">
         
          <div className="max-w-6xl mx-auto flex gap-12 justify-center md:justify-start">
            <p>© 2024 upbreed</p>

            <div className="flex items-start justify-center gap-2">
              <img src="/assets/lock2.png" className="h-3.5" alt="" />
              <p>Secured with SSL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
