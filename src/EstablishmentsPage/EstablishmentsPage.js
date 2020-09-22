import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EstablishmentsContainer from "./EstablishmentsContainer/EstablishmentsContainer";
import EstablishmentsMap from "./EstablishmentsMap/EstablishmentsMap";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./EstablishmentsPage.module.css";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function EstablishmentsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);
  const termParam = params.get("find_desc");
  const locationParam = params.get("find_loc");
  const search = { term: termParam, location: locationParam };

  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );

  const loaded = useSelector((state) => state.establishmentInformation.loaded);

  useEffect(() => {
    dispatch({ type: "CLEAR_ESTABLISHMENTS" });

    fetchEstablishments();

    return () => {
      dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: null });
      dispatch({ type: "SET_NOT_LOADED" });
    };
  }, []);

  const fetchEstablishments = () => {
    // If no term or location is input in the URL search params, then take user back to home
    if (!termParam || !locationParam) {
      return history.push("/");
    }

    console.log("fetch hit");

    const query = queryString.stringify(search);

    fetch("http://localhost:4000/yelp-establishments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          dispatch({ type: "SET_ESTABLISHMENTS", payload: result });
        }
        dispatch({ type: "SET_LOADED" });
      });
  };

  if (!loaded) {
    return <LoadingIcon />;
  }

  if (loaded && !establishments.length) {
    return (
      <h6 className="title is-6">
        No Results Found. Please try another search.
      </h6>
    );
  }

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
