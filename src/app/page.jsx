"use client"; 

import React from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';



function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);


  const [popupVisible, setPopupVisible] = useState(false);
 
  const router = useRouter();

  const handleFormPop = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  





  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading...")

    try {
        // Mock API call
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const response = await fetch(`/api/v1/users/wait-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email
            }),
        });

        const result = await response.json();


        if (response.ok) {
            setStatus("Sent")
            setTimeout(() => {
              router.push(`/success?message=${encodeURIComponent(result.message || 'Form submitted successfully!')}`);
            }, 500); // Redirect after 2 seconds

        } else {
          console.log("ress", result.message)
          setStatus("Try Again")
          setTimeout(() => {
            router.push(`/error?message=${encodeURIComponent(result.message || 'Something went wrong')}`);
          }, 500); // Redirect after 2 seconds

            throw new Error(`Form submission failed: ${result.message}`);

        }
    } catch (error) {
      setTimeout(() => {
        router.push(`/error?message=${encodeURIComponent(error.message || 'Something went wrong')}`);
      }, 500); // Redirect after 2 seconds

    setStatus("Try Again")

    } finally {
        setEmail("")
       
    }
};

  return (
    <div className="bg-[#001C0C] w-screen text-white h-screen md:max-h-screen custom-font">
      <div className="flex overflow-auto flex-col-reverse md:flex-row gap-8 md:items-center md:justify-center h-full">
        <div className="flex-1 text-center md:text-right flex-col gap-4 flex md:items-end justify-start items-center md:justify-start">
          <img src="/logo.png" className="md:h-10 h-7" />

          <p className="text-4xl font-light">Join the Waitlist</p>

          <p className="max-w-lg text-sm md:text-base font-light px-12 md:px-0">
            Join us on this exciting journey as we revolutionize education and
            nurture imaginations across Africa and the rest of the world.
          </p>
          <div className=" mt-20 border-[#305B43] border-2 rounded-xl w-fit h-fit flex items-center justify-center px-6 bg-cover bg-no-repeat">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please insert your email here..."
                required
                className="focus:outline-none pr-4 py-2 w-48 md:w-72 text-sm text-white bg-[#001C0C]"
              />
              <button type="submit" className="border-[#305B43] text-[#D0EA50] border-l-2 px-2 py-2 pl-8 hover:text-white">
                Send
              </button>

            </form>

          </div>

          {status && <p className=" opacity-[60%]">{status}</p>}

        </div>

        <div className="md:flex-1 md:h-full md:items-center mt-24 md:mt-0 flex md:justify-start justify-center items-end">
          <img src="/heroimg.png" className="md:h-[50vh] md:ml-6 md:w-[50vh] w-[60vw] object-contain" />
        </div>
        <div>
          <img src="" />
        </div>
      </div>



      <section className="py-20 bg-white gap-10 flex  justify-center items-center text-black">

        <div className="flex-1 flex flex-col gap-10">
        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">MARKETING</p>
            <p>Hybrid / Remote</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">FRONT END DEVELOPER</p>
            <p>Hybrid / Remote</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">BACK END DEVELOPER</p>
            <p>Hybrid / Remote</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">DATA ANALYST </p>
            <p>Hybrid / Remote</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">COURSE CURATOR</p>
            <p>Hybrid / Remote</p>
          </div>
        </div>
        </div>
      
        <div className="flex-1 flex flex-col gap-40">


        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="custom-font-bold text-2xl">Growth Manager</p>
            <p>Hybrid</p>
          </div>
        </div>

     
        <div>
          <div className="flex flex-col items-center justify-center" >
            <p onClick={handleFormPop}  className="underline cursor-pointer text-[#305B43]">Apply here!</p>
          </div>
        </div>
        </div>
      
      </section>



      {/* Modal Popup for Google Form */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <button className="text-black float-right" onClick={handleClosePopup}>Close</button>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScZdRnqx--yDWVftzJGPYC9oANZmOz0meukKuLPQj7LWy1xQQ/viewform?embedded=true"
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Google Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}


  
    </div>
  );
}


export default Home