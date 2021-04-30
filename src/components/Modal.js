import React, { useEffect } from "react";
import { useGlobalContext } from "../context/context";

const Modal = ({ message }) => {
  const { setShowModal } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default Modal;
