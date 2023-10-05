import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "./spotifyDataSlice";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (code || token) {
      axios.post('http://localhost:3001/login', {
        code
      }).then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        window.location.reload();
      }).catch(() => {
        window.location = "/home";
      });
    }
  }, [code, token]);


  useEffect(() => {
    if (refreshToken || expiresIn) {
      const interval = setInterval(() => {
        axios.post('http://localhost:3001/refresh', {
          refreshToken,
        }).then(res => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          localStorage.setItem("token", JSON.stringify(res.data.accessToken));

        }).catch(() => {
          window.location = "/";
        });
      }, (expiresIn - 60) * 1000);

      return () => clearInterval(interval);

    }
  }, [refreshToken, expiresIn]);

}

