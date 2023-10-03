import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth(code) {
  const [access_token, set_access_token] = useState("");
  const [refresh_token, set_refresh_token] = useState("");
  const [expires_in, set_expires_in] = useState("");


  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code
    }).then(res => {
      console.log(res.data);
    }).catch(() => {
      console.log("error");
    })
  }, [code]);
}
