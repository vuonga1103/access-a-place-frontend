import React, { useEffect, useState } from "react";
import styles from "./EstablishmentsMap.module.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import BusinessRating from "../EstablishmentsContainer/EstablishmentCard/BusinessRating/BusinessRating";
import "mapbox-gl/dist/mapbox-gl.css";

export default function EstablishmentsMap() {
  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );
  const loaded = useSelector((state) => state.establishmentInformation.loaded);

  const selectedEstablishment = useSelector(
    (state) => state.establishmentInformation.selectedEstablishment
  );

  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 11.5,
  });

  useEffect(() => {
    if (establishments.length)
      setViewport({
        ...viewport,
        latitude: establishments[0].coordinates.latitude,
        longitude: establishments[0].coordinates.longitude,
      });
  }, [establishments]);

  const showEstablishmentMarkers = () => {
    if (establishments.length) {
      return establishments.map((est) => {
        // const markerColor =
        //   selectedEstablishment && selectedEstablishment === est
        //     ? { color: "blue" }
        //     : { color: "black" };

        return (
          <Marker
            key={est.id}
            latitude={est.coordinates.latitude}
            longitude={est.coordinates.longitude}
          >
            <div
              onClick={(e) =>
                dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: est })
              }
            >
              <i
                className="fas fa-map-marker-alt fa-2x"
                // style={markerColor}
              ></i>
              {/* {selectedEstablishment &&
                selectedEstablishment.id === est.id &&
                "hello"} */}
            </div>
          </Marker>
        );
      });
    }
  };

  const showSelectedEstablishmentPopup = () => {
    if (selectedEstablishment) {
      const {
        coordinates: { latitude, longitude },
        image_url,
        name,
        categories,
        average_overall,
      } = selectedEstablishment;

      return (
        <Popup
          latitude={latitude}
          longitude={longitude}
          onClose={() =>
            dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: null })
          }
        >
          <div className={styles["popup-container"]}>
            <img className={styles["popup-image"]} src={image_url} alt={name} />
            <h2 className={`title is-6 ${styles["popup-title"]}`}>{name}</h2>
            <p>{categories.join(", ")}</p>
            <BusinessRating rating={average_overall} />
          </div>
        </Popup>
      );
    }
  };

  if (!establishments.length) return <></>;

  return (
    <div className={styles.container}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
        {showEstablishmentMarkers()}
        {showSelectedEstablishmentPopup()}
      </ReactMapGL>
    </div>
  );
}
