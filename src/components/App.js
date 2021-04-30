import useApi from "../custom/useApi";
import InfoContainer from "./InfoContainer";
import CreateUser from "./CreateUser";
import { useGlobalContext } from "../context/context";
import "./App.css";
import { useRef, useState } from "react";

// api get url
const url = "https://sam-user-management-api.herokuapp.com/api/users";

const AUTH_1 = "1810674110";
const AUTH_2 = "1812574104";

function App() {
  const [authorized, setAuthorized] = useState(false);
  const authorizeRef = useRef(null);
  const { loading } = useApi(url);
  const { show, setShow, setIsUpdating } = useGlobalContext();

  const closeForm = () => {
    setShow(false);
    setIsUpdating(false);
  };

  const handleAuthorization = () => {
    if (!authorizeRef.current.value) {
      return;
    }
    if (
      authorizeRef.current.value === AUTH_1 ||
      authorizeRef.current.value === AUTH_2
    ) {
      setAuthorized(true);
      return;
    }
  };

  if (loading) {
    return <h2 className="section-title">Loading...</h2>;
  }

  return (
    <div className="app">
      <h2 className="section-title">User Management</h2>
      {show && (
        <div className="app__container">
          <div className="create_user">
            <span className="cancel-btn" onClick={closeForm}>
              &times;
            </span>
            <CreateUser />
          </div>
        </div>
      )}
      {authorized && (
        <>
          <button
            onClick={() => {
              setAuthorized(false);
            }}
            className="unauthorization"
          >
            UnAuthorize
          </button>
          <button onClick={() => setShow(true)} className="create-user-btn">
            create user
          </button>
        </>
      )}
      {!authorized && (
        <div className="authorization">
          <input type="text" name="id" ref={authorizeRef} autoComplete="off" />
          <button type="button" onClick={handleAuthorization}>
            Authorize
          </button>
        </div>
      )}
      <InfoContainer />
    </div>
  );
}

export default App;
