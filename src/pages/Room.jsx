import { Link } from "react-router-dom";

const Room = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pb-20 rounded-4xl">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-secondary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Create Room
          </span>
          <br className="hidden md:block" /> and start BokBok-ing!
        </h1>

        <p className="mt-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-100">
          Experience realtime messaging wrapped in a stunning. BokBok
          brings your conversations to life with uncompromised style and speed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up animation-delay-200">
          <Link
            to="/room/create"
            className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Create Room
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
        </div>
      </section>
    </div>
  );
};

export default Room;
