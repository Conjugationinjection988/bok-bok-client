import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <header className="">
        <Header />
      </header>
      <main className="mt-5 rounded-full">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
