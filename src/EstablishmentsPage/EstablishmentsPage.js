import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import EstablishmentsContainer from "./EstablishmentsContainer/EstablishmentsContainer";
import EstablishmentsMap from "./EstablishmentsMap/EstablishmentsMap";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

const API_KEY = process.env.REACT_APP_YELP_API_KEY;

export default function EstablishmentsPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const termParam = params.get("find_desc");
  const locationParam = params.get("find_loc");
  const search = { term: termParam, location: locationParam };

  useEffect(() => {
    dispatch({ type: "CLEAR_ESTABLISHMENTS" });
    fetchEstablishments();
  });

  const fetchEstablishments = () => {
    const query = queryString.stringify(search);
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?${query}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Origin: "localhost",
          withCredentials: true,
        },
      }
    )
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "SET_ESTABLISHMENTS", payload: result.businesses })
      )
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <EstablishmentsContainer />
      <EstablishmentsMap />
    </div>
  );
}
