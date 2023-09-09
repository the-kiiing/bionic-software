import React, { useEffect, useState } from "react";
import axios from "axios";

const AxiosApi = () => {
  const [quote, setQuote] = useState("");

  const refresh = () => {
    axios
      .get("https://api.kanye.rest/")
      .then((res) => {
        setQuote(res.data.quote);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(refresh, []);

  return (
    <div style={{ border: "1px solid", padding: "15px" }}>
      <h1>Kanye West Quote</h1>
      <p>{quote}</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default AxiosApi;
