import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import EstablishmentsContainer from "./EstablishmentsContainer/EstablishmentsContainer";
import EstablishmentsMap from "./EstablishmentsMap/EstablishmentsMap";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./EstablishmentsPage.module.css";

export default function EstablishmentsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const termParam = params.get("find_desc");
  const locationParam = params.get("find_loc");
  const search = { term: termParam, location: locationParam };

  useEffect(() => {
    dispatch({ type: "CLEAR_ESTABLISHMENTS" });
    fetchEstablishments();
  });

  const fetchEstablishments = () => {
    // If no term or location is input in the URL search params, then take user back to home
    if (!termParam || !locationParam) {
      return history.push("/");
    }

    const query = queryString.stringify(search);

    fetch("http://localhost:4000/yelp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((establishments) => {
        dispatch({ type: "SET_ESTABLISHMENTS", payload: establishments });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.establishments}>
        <EstablishmentsContainer />
      </div>
      <div className={styles.map}>
        <EstablishmentsMap />
      </div>
    </div>
  );
}
