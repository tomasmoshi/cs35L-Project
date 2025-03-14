import React from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";
import HelpModal from "../Help/Help";
import Login from "../Login/Login";
import Discover from "../Discover/Discover";

function ModalButton({ label, modalType, onToggle, activeModal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (["discover", "post", "home"].includes(modalType)) {
      onToggle(null);
      setTimeout(() => {
        if (modalType === "discover") navigate("/Discover");
        else if (modalType === "post") navigate("/eventform");
        else if (modalType === "home") navigate("/");
      }, 100);
    } else {
      onToggle(modalType);
    }
  };

  return (
    <>
      <button className="nav-button" onClick={handleClick}>
        {label}
      </button>

      {activeModal === "login" && modalType === "login" && <Login onClose={() => onToggle(null)} />}
      {activeModal === "about" && modalType === "about" && <AboutUs onClose={() => onToggle(null)} />}
      {activeModal === "help" && modalType === "help" && <HelpModal onClose={() => onToggle(null)} />}
    </>
  );
}

export default ModalButton;