import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pb-20 rounded-4xl">
      <Helmet>
        <title>BokBok — Real-Time Chat Rooms</title>
        <meta name="description" content="BokBok lets you create and join real-time, expiring chat rooms instantly. No sign-up required — just pick a name and start chatting." />
        <link rel="canonical" href="https://bok-bok.vercel.app/" />
        <meta property="og:title" content="BokBok — Real-Time Chat Rooms" />
        <meta property="og:description" content="BokBok lets you create and join real-time, expiring chat rooms instantly. No sign-up required." />
        <meta property="og:url" content="https://bok-bok.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="BokBok — Real-Time Chat Rooms" />
        <meta name="twitter:description" content="Create or join real-time, expiring chat rooms. No sign-up needed." />
      </Helmet>
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-secondary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Connect & Chat
          </span>
          <br className="hidden md:block" /> with seamless elegance.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
          Experience realtime messaging wrapped in a stunning, modern UI. BokBok
          brings your conversations to life with uncompromised style and speed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-200">
          <Link
            to="/about"
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Get Started Free
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <a
            href="#demo"
            className="btn btn-ghost btn-lg rounded-full px-8 border border-base-content/10 hover:bg-base-content/5"
          >
            View Live Demo
          </a>
        </div>
      </section>

      {/* Live Demo Showcase Section */}
      <section
        id="demo"
        className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 animate-fade-in-up animation-delay-300"
      >
        {/* Glow effect closely hugging the window */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur-xl opacity-20 -z-10"></div>

        <div className="mockup-browser bg-base-300 border border-white/10 shadow-2xl overflow-hidden rounded-3xl">
          <div className="mockup-browser-toolbar">
            <div className="input border-white/5 opacity-50">
              https://bok-bok.vercel.app/demo
            </div>
          </div>
          <div className="flex flex-col justify-center px-4 py-8 md:py-12 bg-base-200/50 relative">
            {/* Soft inner glow in the chat container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 p-4 md:p-6 lg:p-8 bg-base-100/50 backdrop-blur-sm sm:rounded-3xl sm:shadow-2xl sm:border border-white/10 dark:border-white/5 transition-all">
                {/* Date Divider */}
                <div className="flex justify-center mb-2">
                  <span className="text-[11px] font-semibold tracking-wider text-base-content/50 uppercase bg-base-200/50 px-3 py-1 rounded-full shadow-sm">
                    Today
                  </span>
                </div>

                {/* Received Message (Left) */}
                <div className="chat chat-start group">
                  <div className="chat-image avatar items-end">
                    <div className="w-10 rounded-full ring-2 ring-base-200 ring-offset-base-100 ring-offset-2 shadow-sm group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <img
                        alt="Obi-Wan Kenobi profile"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1 text-sm font-semibold opacity-80 flex items-center gap-2">
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      Obi-Wan Kenobi
                    </span>
                    <time className="text-xs font-medium opacity-50">
                      12:45 PM
                    </time>
                  </div>
                  <div className="chat-bubble bg-base-200/80 backdrop-blur text-base-content shadow-sm text-[15px] leading-relaxed px-5 py-3 hover:shadow-md transition-shadow group-hover:bg-base-200">
                    You were the Chosen One! It was said that you would destroy
                    the Sith, not join them!
                  </div>
                  <div className="chat-footer opacity-0 group-hover:opacity-60 text-xs font-medium mt-1 transition-opacity duration-300">
                    Delivered
                  </div>
                </div>

                {/* Sent Message (Right) */}
                <div className="chat chat-end group">
                  <div className="chat-image avatar items-end">
                    <div className="w-10 rounded-full ring-2 ring-primary/50 ring-offset-base-100 ring-offset-2 shadow-sm group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <img
                        alt="Anakin profile"
                        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header mb-1 text-sm font-semibold opacity-80 flex flex-row-reverse items-center gap-2">
                    <span className="cursor-pointer hover:underline underline-offset-2">
                      Anakin
                    </span>
                    <time className="text-xs font-medium opacity-50">
                      12:46 PM
                    </time>
                  </div>
                  <div className="chat-bubble chat-bubble-primary shadow-md text-[15px] leading-relaxed px-5 py-3 hover:shadow-lg transition-shadow">
                    I hate you!
                  </div>
                  <div className="chat-footer text-xs font-medium mt-1 inline-flex items-center gap-1 opacity-70">
                    Seen
                    {/* Double check icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-[14px] h-[14px] text-info bg-info/10 rounded-full p-[2px]"
                    >
                      <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex justify-center">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input outline-0"
                  />
                  <button className="btn">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose BokBok?
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Everything you need for a modern chatting experience, built right
            in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-200/50 border border-white/5 hover:bg-base-200 transition-colors hover:-translate-y-1 duration-300">
            <div className="card-body items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                  />
                </svg>
              </div>
              <h3 className="card-title text-xl">Lightning Fast</h3>
              <p className="text-base-content/70">
                Messages are delivered instantly. Zero lag, zero waiting.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-200/50 border border-white/5 hover:bg-base-200 transition-colors hover:-translate-y-1 duration-300">
            <div className="card-body items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <h3 className="card-title text-xl">Secure & Private</h3>
              <p className="text-base-content/70">
                End-to-end encryption ensures your conversations stay yours.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-200/50 border border-white/5 hover:bg-base-200 transition-colors hover:-translate-y-1 duration-300">
            <div className="card-body items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25l7.22-8.178a2 2 0 0 1 2.972 0l1.455 1.571a2 2 0 0 1 0 2.973L6.75 21ZM13.5 10.5l-2.5-2.5M16.5 7.5l-2.5-2.5M19.5 4.5l-2.5-2.5M21 7.5l-2.5-2.5M18 10.5l-2.5-2.5"
                  />
                </svg>
              </div>
              <h3 className="card-title text-xl">Stunning UI</h3>
              <p className="text-base-content/70">
                Carefully crafted design elements that look beautiful on any
                device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 mt-32 mb-10 text-center">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-10 md:p-16 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-base-100/40 backdrop-blur-[2px] -z-10"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start chatting?
          </h2>
          <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join thousands of users experiencing the future of communication
            today.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary btn-lg rounded-full px-10 shadow-xl shadow-primary/20"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
