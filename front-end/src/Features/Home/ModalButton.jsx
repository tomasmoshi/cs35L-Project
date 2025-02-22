import React, { useState } from "react";
import AboutUs from "./AboutUs";
import HelpModal from "./Help";
import Login from "./Login";

function ModalButton({ label, modalType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <button className="nav-button" onClick={toggleModal}>
        {label}
      </button>

      {isModalOpen && modalType === "about" && (
        <AboutUs onClose={toggleModal} />
      )}
      
      {isModalOpen && modalType === "help" && (
        <HelpModal onClose={toggleModal} />
      )}

      {isModalOpen && modalType === "login" && (
        <Login onClose={toggleModal} />
      )}

    </>
  );
}

export default ModalButton;
