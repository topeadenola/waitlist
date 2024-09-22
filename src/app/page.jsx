"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [email1, setEmail1] = useState("");
  const [status, setStatus] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("Reach out to our sales Team");
  const [message, setMessage] = useState("");

  const aboutText = `
  Upbreed Learn is a software-as-a-service (SaaS) platform that aims to revolutionize education across Africa and beyond. We provide an extensive range of online courses, empowering learners with skills and knowledge tailored to their personal and professional growth. Our platform offers an immersive, flexible learning experience through personalized recommendations, adaptive technology, and diverse course offerings.
  
  What sets Upbreed Learn apart is our commitment to fostering collaboration and community. Learners can connect with peers, mentors, and industry experts, enhancing their educational journey. We offer access to top African instructors who bring real-world expertise, ensuring that the content is both relevant and inspiring.
  
  Whether you're looking to upskill, explore a new hobby, or advance in your career, Upbreed Learn offers flexible, high-quality education at an affordable price. Our subscription-based model provides unlimited access to learning resources across devices, making learning accessible anytime, anywhere.
  
  Join us as we create a global learning ecosystem and transform education through technology, empowering individuals to reach their full potential.
  `;

  const text1 =
    "Join us at Upbreed Learn, where we are redefining online education by bringing experts and learners together through engaging and high-quality courses. As we continue to expand, we're looking for passionate, creative, and driven individuals to join our dynamic team. Our mission is to provide exceptional learning experiences that inspire and empower our subscribers. Whether it's helping someone discover a new passion, advance their career, or simply learn something new, our goal is to impact lives positively. We are a fast-growing startup with a vision to build a";

  const text2 =
    " With our headquarters in Lagos, Nigeria, and plans for future offices in key locations around the world, we’re excited about the road ahead. If you're ready to be part of a team that's making a difference in the world of online learning, we’d love to hear from you!";

  const [popupVisible, setPopupVisible] = useState(false);

  const router = useRouter();

  const handleFormPop = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const scrollToJobs = () => {
    const jobsSection = document.querySelector("#jobs");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading...");

    try {
      // Mock API call
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`/api/v1/users/wait-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email1,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Sent");
        setTimeout(() => {
          router.push(
            `/success?message=${encodeURIComponent(
              result.message || "Form submitted successfully!"
            )}`
          );
        }, 500); // Redirect after 2 seconds
      } else {
        console.log("ress", result.message);
        setStatus("Try Again");
        setTimeout(() => {
          router.push(
            `/error?message=${encodeURIComponent(
              result.message || "Something went wrong"
            )}`
          );
        }, 500); // Redirect after 2 seconds

        throw new Error(`Form submission failed: ${result.message}`);
      }
    } catch (error) {
      setTimeout(() => {
        router.push(
          `/error?message=${encodeURIComponent(
            error.message || "Something went wrong"
          )}`
        );
      }, 500); // Redirect after 2 seconds

      setStatus("Try Again");
    } finally {
      setEmail1("");
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    setStatus("loading...");

    // Basic validation for empty fields
    if (!name || !email || !reason || !message) {
      toast.error("All fields are required!");
      console.log("Try Again");
      return; // Stop the submission if any field is empty
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${baseUrl}/v1/users/contact-us`, {
        method: "POST",
        mode: "cors", // Changed to "cors" for cross-origin requests
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          reason,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Sent");
        toast.success("Form submitted successfully!"); // Toastify success message
      } else {
        setStatus("Try Again");
        toast.error("Form submission failed!"); // Toastify error message
        throw new Error(`Form submission failed: ${result.message}`);
      }
    } catch (error) {
      setStatus("Try Again");
      toast.error("An error occurred while submitting the form."); // Error notification with Toastify
    } finally {
      // Clear form fields
      setName("");
      setEmail("");
      setReason("Reach out to our sales Team");
      setMessage("");
    }
  };

  return (
    <div className="bg-[#001C0C] w-screen overflow-x-hidden text-white h-screen md:max-h-screen custom-font">
      <div className="relative flex overflow-auto flex-col-reverse md:flex-row gap-8 md:items-center md:justify-center h-full">
        <div className="flex-1 text-center md:text-right flex-col gap-2 md:gap-4 flex md:items-end justify-start items-center md:justify-start">
          <img src="/logo.png" className="md:h-10 h-7" />

          <p className="text-4xl font-light">Join the Waitlist</p>

          <p className="max-w-lg text-sm md:text-base font-light px-12 md:px-0">
            Join us on this exciting journey as we revolutionize education and
            nurture imaginations across Africa and the rest of the world.
          </p>
          <div className=" mt-8 md:mt-20 border-[#305B43] border-2 rounded-xl w-fit h-fit flex items-center justify-center px-6 bg-cover bg-no-repeat">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                placeholder="Please insert your email here..."
                required
                className="focus:outline-none pr-4 py-2 w-48 md:w-72 text-sm text-white bg-[#001C0C]"
              />
              <button
                type="submit"
                className="border-[#305B43] text-[#D0EA50] border-l-2 px-2 py-2 pl-8 hover:text-white"
              >
                Send
              </button>
            </form>
          </div>

          {status && <p className=" opacity-[60%]">{status}</p>}
        </div>

        <div className="md:flex-1 md:h-full md:items-center mt-12 md:mt-0 flex md:justify-start justify-center items-end">
          <img
            src="/heroimg.png"
            className="md:h-[50vh] md:ml-6 md:w-[50vh] w-[60vw] object-contain"
          />
        </div>
        <div>
          <img src="" />
        </div>

        <div class="arrow-container animated fadeInDown" onClick={scrollToJobs}>
          <div class="arrow-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div class="arrow-1 animated hinge infinite zoomIn"></div>
        </div>
      </div>

      <div className="bg-white">
        <section className="flex font-semibold flex-col max-w-6xl mx-auto py-24 pb-32 md:px-32 px-8 gap-10">
          <div className="text-2xl font-extrabold text-left text-black">
            Who we are
          </div>

          <div className=" text-black text-justify">
            {aboutText.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>

      <div className=" bg-[#00230F]   flex flex-col">
        <section className=" px-4 md:px-0 mx-auto max-w-6xl py-20">
          <div className="text-[#D0EA50] custom-font-bold text-4xl">Career</div>

          <p className=" px-2 md:px-0 font-light pt-10 text-justify">
            {" "}
            {text1}{" "}
            <span className="text-[#D0EA50] text-xl font-medium">
              global community of learners.
            </span>
            {text2}
          </p>
        </section>
        <section
          id="jobs"
          className="py-20 md:gap-52 px-12 flex-col md:flex-row h-full bg-[#F2F2F2] w-full gap-10 flex  justify-center items-center text-black"
        >
          <div className=" flex flex-col gap-10">
            <div>
              <div className="flex text-center flex-col items-center justify-center">
                <p className="custom-font-bold text-2xl">
                  INSTRUCTIONAL DESIGNERS
                </p>
                <p>Hybrid</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="custom-font-bold text-2xl">FINANCE MANAGER</p>
                <p>Hybrid</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="custom-font-bold text-2xl">BUSINESS EXCECUTOR</p>
                <p>Hybrid</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="custom-font-bold text-2xl">GRAPHICS DESIGNERS </p>
                <p>Remote</p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-40">
            <div>
              <div className="flex flex-col items-center justify-center">
                <p className="custom-font-bold text-2xl">Growth Manager</p>
                <p>Hybrid</p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center">
                <p
                  onClick={handleFormPop}
                  className="underline cursor-pointer text-[#305B43]"
                >
                  Apply here!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white w-full">
        <section className="flex font-semibold flex-col max-w-6xl mx-auto pt-24 md:px-32 px-4 gap-10">
          <div className="text-2xl text-left text-black">Contact Us</div>

          <form
            onSubmit={handleSubmit2}
            className="md:mx-24 text-[#777777] text-justify bg-gradient-to-b from-white to-[#BCBCBC1A] py-10 rounded-xl md:px-24 px-2 flex flex-col gap-6"
          >
            <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-center gap-6 items-start">
              <div className="text-[#8D8D8D] font-light text-end">
                Full Name
              </div>
              <div className="md:col-span-4 w-full">
                <input
                  type="text"
                  name="fullName"
                  value={name} // Binding the name state
                  onChange={(e) => setName(e.target.value)} // Updating name on change
                  className="w-full rounded-lg bg-[#73737327] py-2 px-4"
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-center gap-6 items-start">
              <div className="text-[#8D8D8D] font-light text-end">Email</div>
              <div className="md:col-span-4 w-full">
                <input
                  type="email"
                  name="email"
                  value={email} // Binding the email state
                  onChange={(e) => setEmail(e.target.value)} // Updating email on change
                  className="w-full rounded-lg bg-[#73737327] py-2 px-4"
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-center gap-6 items-start">
              <div className="text-[#8D8D8D] font-light text-end">Reason</div>
              <div className="md:col-span-4 w-full">
                <select
                  id="reason"
                  value={reason} // Binding the reason state
                  onChange={(e) => setReason(e.target.value)} // Updating reason on change
                  className="bg-[#73737327] p-2 rounded-lg px-4 w-full"
                >
                  <option>Reach out to our sales Team</option>
                  <option>Support Us</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col w-full md:grid md:grid-cols-5 justify-center gap-6 items-start">
              <div className="text-[#8D8D8D] font-light text-end">Message</div>
              <div className="md:col-span-4 w-full">
                <textarea
                  name="message"
                  value={message} // Binding the message state
                  onChange={(e) => setMessage(e.target.value)} // Updating message on change
                  className="w-full rounded-lg bg-[#73737327] py-2 px-4 h-40"
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col w-full md:grid md:grid-cols-5 justify-center gap-6 items-start">
              <div></div>
              <div className="w-full col-span-4">
                <div className="flex px-2 md:px-0 w-full justify-between md:items-start items-center">
                  <div className="flex gap-4 w-fit ">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/upbreedlearn/about/?viewAsMember=true"
                    >
                      <img
                        className="font-light h-4  object-contain hover:opacity-[0.3]"
                        src="assets/Linkedin.png"
                      />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.instagram.com/upbreedlearn"
                    >
                      <img
                        className=" h-4  object-contain hover:opacity-[0.3]"
                        src="assets/Instagram.png"
                      />
                    </a>

                    <a target="_blank" href="https://x.com/upbreedlearn">
                      <img
                        className=" h-4 object-contain hover:opacity-[0.3]"
                        src="assets/x.png"
                      />
                    </a>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/upbreedlearn"
                    >
                      <img
                        className=" h-4 object-contain hover:opacity-[0.3]"
                        src="assets/Facebook.png"
                      />
                    </a>

                    <a href="">
                      <img
                        className=" h-4 object-contain hover:opacity-[0.3]"
                        src="assets/Union.png"
                      />
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="px-14 py-2.5 rounded-xl bg-[#00230F] text-[#D0EA50]"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>

      <div>
        <Footer />
      </div>

      {/* Modal Popup for Google Form */}
      {popupVisible && (
        <div className="fixed px-6 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <button
              className="text-black float-right"
              onClick={handleClosePopup}
            >
              Close
            </button>
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

export default Home;
