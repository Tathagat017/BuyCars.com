import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AllRoutes from "./Routes/AllRoutes";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    let title = document.getElementsByTagName("title")[0];
    title.innerText = "BuyCars.com By Tathagat";
  }, []);
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
