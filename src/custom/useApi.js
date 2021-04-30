import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";

const useApi = (url) => {
  const { setUsers } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      await axios
        .get(url)
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err);
          setLoading(false);
        });
    } catch (error) {}
  }, [url, setUsers]);

  useEffect(() => {
    getUsers();
  }, [url, getUsers]);

  return { loading };
};

export default useApi;
