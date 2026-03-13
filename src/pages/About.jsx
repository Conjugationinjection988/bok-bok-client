import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pb-20 rounded-4xl">
      <Helmet>
        <title>About — BokBok</title>
        <meta name="description" content="Learn what BokBok is about — a frictionless, real-time public chat platform. No accounts, no barriers. Just open, expiring chat rooms." />
        <link rel="canonical" href="https://bok-bok.vercel.app/about" />
        <meta property="og:title" content="About — BokBok" />
        <meta property="og:description" content="A frictionless public chat platform. No sign-up, no barriers — just conversations." />
        <meta property="og:url" content="https://bok-bok.vercel.app/about" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Dynamic Background Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-secondary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-32">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 mt-10">
            About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">BokBok</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            A frictionless, public digital square where communication flows freely. No accounts, no barriers.
          </p>
        </div>

        <div className="space-y-12 animate-fade-in-up animation-delay-100">

          <div className="card bg-base-200/50 border border-white/5 shadow-xl backdrop-blur-sm">
            <div className="card-body md:flex-row items-center gap-8 p-8 md:p-12">
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Zero Friction Entry</h2>
                <p className="text-base-content/70 text-lg leading-relaxed">
                  We believe that chatting shouldn't require answering a dozen questions or verifying your email. With BokBok, you simply choose a display name and dive straight into the conversation. It's that simple.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-base-200/50 border border-white/5 shadow-xl backdrop-blur-sm">
            <div className="card-body md:flex-row-reverse items-center gap-8 p-8 md:p-12">
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632l-.046-.012a3.001 3.001 0 0 1-.1-5.022L12 10.5l7.645 7.645ZM12 10.5v9" />
                </svg>
              </div>
              <div className="text-left md:text-right">
                <h2 className="text-2xl font-bold mb-3">The Public Square</h2>
                <p className="text-base-content/70 text-lg leading-relaxed">
                  BokBok is designed to mimic a bustling town hall. There are no private one-on-one DMs. Everyone talks to everyone. It's a massive, shared group forum where ideas are broadcasted to the whole community.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 text-center animate-fade-in-up animation-delay-200">
          <Link to="/" className="btn btn-primary btn-lg rounded-full px-12 shadow-lg shadow-primary/30">
            Join the Conversation
          </Link>
        </div>

      </section>
    </div>
  );
}
