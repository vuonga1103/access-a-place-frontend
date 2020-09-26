import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer";
import styles from "./EstablishmentPage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import moment from "moment";
import BusinessRating from "../BusinessRating/BusinessRating";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import { Link } from "react-scroll";
import selectedMarker from "../assets/selectedMarker.png";
import no_image from "../assets/no_image.jpg";
import Bookmark from "../Bookmark/Bookmark";

export default function EstablishmentPage() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const establishment = useSelector(
    (state) => state.establishmentInformation.currentEstablishment
  );
  const loggedIn = useSelector((state) => state.userInformation.token);
  const slug = params.slug;

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "200px",
    latitude: 0,
    longitude: 0,
    zoom: 13,
  });

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_ESTABLISHMENT", payload: null }); // Clear previous currentEstablishment if any
    fetchEstablishment();
  }, []);

  const fetchEstablishment = () => {
    fetch("http://localhost:4000/yelp-establishment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    })
      .then((response) => response.json())
      .then((establishment) => {
        if (establishment.error) {
          history.push("/not-found");
        } else {
          dispatch({
            type: "SET_CURRENT_ESTABLISHMENT",
            payload: establishment,
          });

          // Sets map's viewport at start with establishment's coordinates
          setViewport({
            ...viewport,
            latitude: establishment.coordinates.latitude,
            longitude: establishment.coordinates.longitude,
          });
        }
      });
  };

  if (!establishment) return <LoadingIcon />;

  // Returns an array of images or no-image-available image, to be placed in carousel
  const showEstablishmentImages = () => {
    if (establishment) {
      if (!establishment.photos.length) {
        return [
          <img
            key="img"
            src={no_image}
            alt="none"
            className={styles.sliderimg}
          />,
        ];
      }

      return establishment.photos.map((url) => {
        return (
          <img
            key={url}
            src={url}
            alt={establishment.name}
            className={styles.sliderimg}
          />
        );
      });
    }
  };

  const showOpenTimes = () => {
    if (establishment.hours[0]) {
      return establishment.hours[0]["open"].map((dayObj) => {
        const dayOfWeek = moment().day(dayObj.day).format("ddd");
        let openTime = moment(dayObj.start, "HH:mm").format("hh:mma");
        let closeTime = moment(dayObj.end, "HH:mm").format("hh:mma");

        openTime = openTime[0] === "0" ? openTime.slice(1) : openTime;
        closeTime = closeTime[0] === "0" ? closeTime.slice(1) : closeTime;

        return (
          <li key={establishment.name + dayOfWeek}>
            <div>
              <strong>{`${dayOfWeek}: `}</strong>
            </div>
            <div>{` ${openTime} - ${closeTime}`}</div>
          </li>
        );
      });
    }
  };

  const showIsOpenOrClosed = () => {
    if (establishment.hours[0]) {
      return establishment.hours[0]["is_open_now"] ? (
        <span>
          <i className="fas fa-door-open"></i> <strong>Open Now!</strong>
        </span>
      ) : (
        <span>
          <i className="fas fa-door-closed"></i> <strong>Closed Now</strong>
        </span>
      );
    }
  };

  const {
    name,
    categories,
    location,
    phone,
    average_overall,
    average_parking,
    average_interior,
    average_entrance,
    average_bathroom,
    hours,
    coordinates,
  } = establishment;

  return (
    <div className={styles.container}>
      <div className={styles["heading-container"]}>
        <div>
          <h2 className={`title is-2 ${styles.name}`}>
            {name}{" "}
            {loggedIn && (
              <span className={styles.bookmark}>
                <Bookmark establishment={establishment} />
              </span>
            )}
          </h2>

          <div>
            {categories.join(", ")} {showIsOpenOrClosed()}
            <br />
            <Link to="write-review" smooth={true}>
              <i className="fas fa-pen-alt"></i> Write Accessibility Review!
            </Link>
          </div>
        </div>

        <div>
          <h4 className={`subtitle ${styles.address}`}>
            {location[0]} <br /> {location[1]} <br />
            {phone}
            <br />
          </h4>
        </div>
      </div>

      <div className={styles["body-container"]}>
        <div className={styles["images-carousel"]}>
          <AliceCarousel autoPlay autoPlayInterval={3000}>
            {showEstablishmentImages()}
          </AliceCarousel>
        </div>

        <div className={styles["info"]}>
          <div className={styles["ratings-container"]}>
            <strong>
              <u>Accessibility Ratings</u>
            </strong>
            <table>
              <tbody>
                <tr>
                  <td>Overall: </td>
                  <td>
                    <BusinessRating rating={average_overall} />
                  </td>
                </tr>
                <tr>
                  <td>Parking: </td>
                  <td>
                    <BusinessRating rating={average_parking} icon="parking" />
                  </td>
                </tr>
                <tr>
                  <td>Entrance: </td>
                  <td>
                    <BusinessRating rating={average_entrance} icon="entrance" />
                  </td>
                </tr>

                <tr>
                  <td>Interior: </td>
                  <td>
                    <BusinessRating rating={average_interior} icon="interior" />
                  </td>
                </tr>
                <tr>
                  <td>Bathroom:</td>
                  <td>
                    <BusinessRating rating={average_bathroom} icon="bathroom" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className={styles["hours-container"]}>
            <li>
              {hours[0] && (
                <u>
                  <strong>Hours of Operation</strong>
                </u>
              )}
            </li>
            {showOpenTimes()}
          </ul>
        </div>
      </div>

      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
        <Marker
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        >
          <img
            src={selectedMarker}
            alt="map-marker"
            className={styles.marker}
          />
        </Marker>
      </ReactMapGL>

      <ReviewsContainer />
      <div id="write-review">
        <ReviewForm />
      </div>
    </div>
  );
}
