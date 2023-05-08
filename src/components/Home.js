
import React, { useContext } from "react";
import { Appcontext } from "../components/context/AppContext";
import SearchPage from "./pages/SearchPage";
import "./spinner.css";
function Home() {
  const { loading } = useContext(Appcontext);
  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div>
          <SearchPage />
        </div>
      )}
    </div>
  );
}

export default Home;
