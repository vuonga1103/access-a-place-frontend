import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EstablishmentsContainer from "./EstablishmentsContainer/EstablishmentsContainer";
import EstablishmentsMap from "./EstablishmentsMap/EstablishmentsMap";
import queryString from "query-string";

const API_KEY = process.env.REACT_APP_YELP_API_KEY;

export default function EstablishmentsPage() {
  const search = useSelector((state) => state.establishmentInformation.search);

  const dispatch = useDispatch();

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
      .catch((error) => console.warn(error));
  };

  return (
    <div>
      <EstablishmentsContainer />
      <EstablishmentsMap />
    </div>
  );
}
