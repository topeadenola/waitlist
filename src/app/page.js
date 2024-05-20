"use client"; 

import { useState } from "react";


export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/join-waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus(`error: ${data.error}`);
    }
  };

  return (
    <div className="bg-[#001C0C] w-screen text-white h-screen md:max-h-screen custom-font">
      <div className="flex overflow-auto flex-col-reverse md:flex-row gap-8 md:items-center md:justify-center h-full">
        <div className="flex-1 text-center md:text-right flex-col gap-4 flex md:items-end justify-center items-center md:justify-start">
          <img src="/logo.png" className="h-10" />

          <p className="text-4xl font-light">Join the Waitlist</p>

          <p className="max-w-lg font-light px-4 md:px-0">
            Join us on this exciting journey as we revolutionize education and
            nurture imaginations across Africa and the rest of the world.
          </p>
          <div className="border-[#305B43] border-2 rounded-xl w-fit h-fit flex items-center justify-center px-6 bg-cover bg-no-repeat">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please insert your email here..."
                required
                className="focus:outline-none pr-4 py-2 w-60 md:w-72 text-sm text-white bg-[#001C0C]"
              />
              <button type="submit" className="border-[#305B43] text-[#D0EA50] border-l-2 px-2 py-2">
                Send
              </button>

            </form>

          </div>

          {status && <p className=" opacity-5">{status}</p>}

        </div>

        <div className="md:flex-1 md:h-full md:items-center my-12 flex md:justify-start justify-center">
          <img src="/heroimg.png" className="md:h-[50vh] md:w-[50vh] h-[60vw] object-contain" />
        </div>
        <div>
          <img src="" />
        </div>
      </div>
    </div>
  );
}
