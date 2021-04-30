import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";

// api url
const url = "https://sam-user-management-api.herokuapp.com/api/users";

const InfoList = ({ index, _id, name, email, age, gender }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    users,
    setUsers,
    setShow,
    setUpdateUser,
    setIsUpdating,
  } = useGlobalContext();

  const fetch = async () => {
    try {
      await axios
        .get(url)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
    return false;
  };

  const editUser = (e) => {
    setShow(true);
    setIsUpdating(true);
    const user = users.find((user) => user._id === _id);
    setUpdateUser(user);
  };

  const deleteUser = async () => {
    setIsDeleting(true);
    try {
      await axios
        .delete(`${url}/${_id}`)
        .then((res) => {
          setIsDeleting(fetch());
          // setIsDeleting(false);
        })
        .catch((error) => {
          // console.log(error.message);
          // throw new Error(error.message);
          setIsDeleting(false);
        });
    } catch (error) {}
  };

  return (
    <tr className="row">
      <td>{index + 1}</td>
      <td className="name">{name}</td>
      <td>{email}</td>
      <td>{age}</td>
      <td className="gender">{gender}</td>
      <td>
        {/* <FaPencilAlt className="btn-edit" /> */}
        <button className="btn-edit" onClick={editUser}>
          Edit
        </button>
      </td>
      <td>
        {/* <FaTrash className="btn-trash" /> */}
        <button
          disabled={isDeleting}
          className="btn-trash"
          onClick={deleteUser}
        >
          {isDeleting ? "Deleting......" : "Delete"}
        </button>
      </td>
    </tr>
  );
};

export default InfoList;
