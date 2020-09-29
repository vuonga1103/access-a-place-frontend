import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EstablishmentsContainer from "./EstablishmentsContainer/EstablishmentsContainer";
import EstablishmentsMap from "./EstablishmentsMap/EstablishmentsMap";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./EstablishmentsPage.module.css";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import BulmaSwitch from "bulma-switch";

export default function EstablishmentsPage() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userInformation.token);

  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );
  const loaded = useSelector((state) => state.establishmentInformation.loaded);

  const { longitude, latitude } = useSelector(
    (state) => state.currentLocationInformation
  );

  const [accessibilitySort, setAccessibilitySort] = useState(false);

  // Extracts params following 'search?' in URL, each param value extracted via .get()
  const params = new URLSearchParams(location.search);
  const termParam = params.get("find_desc");
  const locationParam = params.get("find_loc");
  let search = { term: termParam, location: locationParam };

  useEffect(() => {
    dispatch({ type: "CLEAR_ESTABLISHMENTS" }); // Clears previous search
    fetchEstablishments();

    return () => {
      dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: null });
      dispatch({ type: "SET_NOT_LOADED" });
    };
  }, [longitude, latitude, loggedIn, location]); // Once current location's long and lat are set, to call fetch again

  const fetchEstablishments = () => {
    if (!termParam || !locationParam) {
      return history.push("/");
    }

    if (search.location === "NEAR ME") {
      if (!longitude && !latitude) {
        return; // Early return, no fetching if current location's long and lat are not yet set
      }

      search = {
        term: termParam,
        longitude: longitude,
        latitude: latitude,
      };
    }

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
      .then((establishments) => {
        if (!establishments.error) {
          dispatch({ type: "SET_ESTABLISHMENTS", payload: establishments });
        }
        dispatch({ type: "SET_LOADED" });
      });
  };

  const handleAccessibilitySortClick = () => {
    !accessibilitySort
      ? dispatch({ type: "SORT_ESTABLISHMENTS" })
      : dispatch({ type: "UNSORT_ESTABLISHMENTS" });

    setAccessibilitySort(!accessibilitySort);
  };

  if (!loaded) return <LoadingIcon />;

  return (
    <div className={styles.container}>
      {loaded && !establishments.length ? (
        <h6 className={`title is-6 ${styles["not-found"]}`}>
          Sorry! No results were found. Please try another search.
        </h6>
      ) : (
        <>
          <div className={styles.establishments}>
            <div className={`field ${styles.sort}`}>
              <input
                id="switchThinRoundedOutlinedInfo"
                type="checkbox"
                name="switchThinRoundedOutlinedInfo"
                className="switch is-thin is-rounded is-outlined is-danger"
                checked={accessibilitySort}
                onClick={handleAccessibilitySortClick}
              />
              <label htmlFor="switchThinRoundedOutlinedInfo">
                Sort by Accessibility
              </label>
            </div>
            <EstablishmentsContainer />
          </div>
          <div className={styles.map}>
            <EstablishmentsMap />
          </div>
        </>
      )}
    </div>
  );
}
