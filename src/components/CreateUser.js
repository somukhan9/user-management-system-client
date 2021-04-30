import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import Modal from "./Modal";
import "./createuser.css";

// post api url
const url = "https://sam-user-management-api.herokuapp.com/api/users";

const CreateUser = () => {
  const [creatingUser, setCreatingUser] = useState(false);
  const {
    setUsers,
    setShow,
    showModal,
    setShowModal,
    updateUser,
    setUpdateUser,
    isUpdating,
    setIsUpdating,
  } = useGlobalContext();
  const [user, setUser] = useState({
    name: isUpdating ? updateUser.name : "",
    email: isUpdating ? updateUser.email : "",
    age: isUpdating ? updateUser.age : "",
    gender: isUpdating ? updateUser.gender : "",
  });

  const fetch = async () => {
    await axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // console.log(err);
        throw new Error(err.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.age || !user.gender) {
      setShowModal(true);
      return;
    }
    setCreatingUser(true);
    try {
      await axios
        .post(url, user)
        .then((res) => {
          // console.log(res);
          setUser({
            name: "",
            email: "",
            age: "",
            gender: "",
          });
          fetch();
          setCreatingUser(false);
          setShow(false);
        })
        .catch((err) => {
          // console.log(err);
          // throw new Error(err.message);
          setCreatingUser(false);
        });
    } catch (error) {}
  };

  const editUser = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.age || !user.gender) {
      setShowModal(true);
      return;
    }
    setCreatingUser(true);
    try {
      await axios
        .put(`${url}/${updateUser._id}`, user)
        .then((res) => {
          // console.log(res);
          setUser({
            name: "",
            email: "",
            age: "",
            gender: "",
          });
          fetch();
          setCreatingUser(false);
          setShow(false);
          setIsUpdating(false);
          setUpdateUser({});
        })
        .catch((err) => {
          // console.log(err);
          // throw new Error(err.message);
          setCreatingUser(false);
        });
    } catch (error) {}
  };

  if (showModal) {
    return (
      <>
        <Modal message="All the inputs must be filled" />
      </>
    );
  }

  return (
    <div className="form">
      <form onSubmit={!isUpdating ? handleSubmit : editUser}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            value={user.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <span>Gender</span>
          <div>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label htmlFor="gender">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label htmlFor="gender">Female</label>
          </div>
        </div>
        {!isUpdating && (
          <button disabled={creatingUser} type="submit">
            {creatingUser ? "Saving...." : "Save"}
          </button>
        )}
        {isUpdating && (
          <button disabled={creatingUser} type="submit">
            {creatingUser ? "Updating...." : "Update"}
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateUser;
