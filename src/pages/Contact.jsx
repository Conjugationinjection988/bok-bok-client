import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pb-20 overflow-x-hidden rounded-4xl">
      <Helmet>
        <title>Contact — BokBok</title>
        <meta name="description" content="Get in touch with the BokBok team. Send us a message or reach out through our community support channels." />
        <link rel="canonical" href="https://bokbok.chat/contact" />
        <meta property="og:title" content="Contact — BokBok" />
        <meta property="og:description" content="Contact the BokBok team with questions, feature requests, or just to say hello." />
        <meta property="og:url" content="https://bokbok.chat/contact" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {/* Dynamic Background Elements */}
      <div className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[130px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] bg-secondary/10 blur-[150px] rounded-full -z-10 pointer-events-none"></div>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 mt-10">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question, feature
            request, or just want to say hello, drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 animate-fade-in-up animation-delay-100">
            <div className="card bg-base-200/40 border border-white/5 shadow-xl backdrop-blur-md hover:bg-base-200/60 transition-colors">
              <div className="card-body flex-row items-center gap-6 p-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Email Us</h3>
                  <a
                    href="mailto:hello@bokbok.chat"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    hello@bokbok.chat
                  </a>
                </div>
              </div>
            </div>

            <div className="card bg-base-200/40 border border-white/5 shadow-xl backdrop-blur-md hover:bg-base-200/60 transition-colors">
              <div className="card-body flex-row items-center gap-6 p-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Community Support</h3>
                  <p className="text-base-content/70">
                    Join our public forum to get help from the team and other
                    members.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 px-2 hidden lg:block">
              <h4 className="text-lg font-semibold mb-4 text-base-content/80">
                Follow our updates
              </h4>
              <div className="flex gap-4">
                {/* Social Placeholder Circles */}
                <div className="w-12 h-12 rounded-full bg-base-200/80 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-content hover:-translate-y-1 transition-all cursor-pointer shadow-sm">
                  <span className="font-bold">X</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-base-200/80 border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-content hover:-translate-y-1 transition-all cursor-pointer shadow-sm">
                  <span className="font-bold">in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 animate-fade-in-up animation-delay-200">
            <div className="card bg-base-200/50 border border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              {/* Subtle inner glow for the form card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[50px] rounded-full pointer-events-none"></div>

              <div className="card-body p-8 md:p-10 relative z-10">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content/80">
                          Your Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        className="block input input-lg input-bordered bg-base-100/40 focus:bg-base-100 focus:outline-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content/80">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="block input input-lg input-bordered bg-base-100/40 focus:bg-base-100 focus:outline-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-base-content/80">
                        Message
                      </span>
                    </label>
                    <textarea
                      className="block w-full textarea textarea-bordered h-40 bg-base-100/40 focus:bg-base-100 focus:outline-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-inner text-base p-4"
                      placeholder="How can we help?"
                    ></textarea>
                  </div>

                  <button className="btn btn-primary btn-lg rounded-full mt-4 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
                    Send Message
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 ml-2 -rotate-12 group-hover:rotate-0 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
