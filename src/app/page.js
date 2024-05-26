"use client"; 

import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);


  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);





  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading...")

    try {
        // Mock API call
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const response = await fetch(`${baseUrl}/v1/users/wait-list`, {
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
            setIsSuccess(true);
            setPopupMessage('Form submitted successfully! Thanks for joining us');
            setStatus("Sent")

        } else {
          console.log("ress", result.message)
          setStatus("Try Again")
            throw new Error(`Form submission failed: ${result.message}`);

        }
    } catch (error) {
        setIsSuccess(false);
        setPopupMessage(error.message);
        setStatus("Try Again")

    } finally {
        setPopupVisible(true);
        setEmail("")
        setTimeout(() => {
            setPopupVisible(false);
        }, 3000);
    }
};

  return (
    <div className="bg-[#001C0C] w-screen text-white h-screen md:max-h-screen custom-font">
      <div className="flex overflow-auto flex-col-reverse md:flex-row gap-8 md:items-center md:justify-center h-full">
        <div className="flex-1 text-center md:text-right flex-col gap-4 flex md:items-end justify-start items-center md:justify-start">
          <img src="/logo.png" className="h-10" />

          <p className="text-4xl font-light">Join the Waitlist</p>

          <p className="max-w-lg text-sm md:text-base font-light px-12 md:px-0">
            Join us on this exciting journey as we revolutionize education and
            nurture imaginations across Africa and the rest of the world.
          </p>
          <div className=" md:mt-20 border-[#305B43] border-2 rounded-xl w-fit h-fit flex items-center justify-center px-6 bg-cover bg-no-repeat">
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

          {status && <p className=" opacity-5">{status}</p>}

        </div>

        <div className="md:flex-1 md:h-full md:items-center mt-24 md:mt-0 flex md:justify-start justify-center items-end">
          <img src="/heroimg.png" className="md:h-[50vh] md:ml-6 md:w-[50vh] h-[60vh] object-contain" />
        </div>
        <div>
          <img src="" />
        </div>
      </div>



      {popupVisible && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black text-green-950 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md flex items-center space-x-4 shadow-lg">
                        <span className="text-lg">{popupMessage}</span>
                      
                            {isSuccess ? (
                            <svg
                                className="text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width="24"
                                height="24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width="24"
                                height="24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
}
