import "./App.css";
import { Route, Routes } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import Groups from "./Components/Groups";
function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="group/:groupID" element={<Groups />} />
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
}

export default App;
