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
    <div className="bg-[#001C0C] w-full h-screen max-h-screen custom-font">
      <div className="flex gap-8 items-center justify-center h-full">
        <div className="flex-1 text-right flex-col gap-4 flex items-end justify-start">
          <img src="/logo.png" className="h-10" />

          <p className="text-4xl font-light">Join the Waitlist</p>

          <p className="max-w-lg font-light">
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
                className="focus:outline-none pr-4 py-2 w-72 text-sm bg-[#001C0C]"
              />
              <button type="submit" className="border-[#305B43] text-[#D0EA50] border-l-2 px-2 py-2">
                Send
              </button>

            </form>

          </div>

          {status && <p className=" opacity-5">{status}</p>}

        </div>

        <div className="flex-1 h-full flex justify-start items-center">
          <img src="/heroimg.png" className="h-[50vh]" />
        </div>
        <div>
          <img src="" />
        </div>
      </div>
    </div>
  );
}
