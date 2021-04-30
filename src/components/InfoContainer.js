import React from "react";
import InfoList from "./InfoList";
import "./infoContainer.css";
import { useGlobalContext } from "../context/context";

const InfoContainer = () => {
  const { users } = useGlobalContext();

  return (
    <div className="infoContainer">
      <table className="infoContainer_table">
        <thead>
          <tr className="row">
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <InfoList key={user._id} index={index} {...user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfoContainer;
