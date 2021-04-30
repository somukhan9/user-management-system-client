import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        updateUser,
        setUpdateUser,
        show,
        setShow,
        showModal,
        setShowModal,
        isUpdating,
        setIsUpdating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
