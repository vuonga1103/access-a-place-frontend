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

export default function EstablishmentPage() {
  const dispatch = useDispatch();
  const establishment = useSelector(
    (state) => state.establishmentInformation.currentEstablishment
  );

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "200px",
    latitude: 0,
    longitude: 0,
    zoom: 13,
  });

  const history = useHistory();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_ESTABLISHMENT", payload: null });

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
          alert("Establishment not found!");
          history.push("/");
        } else {
          dispatch({
            type: "SET_CURRENT_ESTABLISHMENT",
            payload: establishment,
          });
          setViewport({
            ...viewport,
            latitude: establishment.coordinates.latitude,
            longitude: establishment.coordinates.longitude,
          });
        }
      });
  };

  const showEstablishmentImages = () => {
    if (establishment) {
      if (!establishment.photos.length) {
        return [
          <img
            key="img"
            src="https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg"
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

  if (!establishment) return <LoadingIcon />;

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

  return (
    <div className={styles.container}>
      <div className={styles["heading-container"]}>
        <div>
          <h2 className={`title is-2 ${styles.name}`}>{establishment.name}</h2>
          <div>
            {establishment.categories.join(", ")} {showIsOpenOrClosed()}
            <br />
            <Link to="write-review" smooth={true}>
              <i className="fas fa-pen-alt"></i> Write Accessibility Review!
            </Link>
          </div>
        </div>

        <div>
          <h4 className={`subtitle ${styles.address}`}>
            {establishment.location[0]} <br /> {establishment.location[1]}{" "}
            <br />
            {establishment.phone}
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
                    <BusinessRating rating={establishment.average_overall} />
                  </td>
                </tr>
                <tr>
                  <td>Parking: </td>
                  <td>
                    <BusinessRating
                      rating={establishment.average_parking}
                      icon="parking"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Entrance: </td>
                  <td>
                    <BusinessRating
                      rating={establishment.average_entrance}
                      icon="entrance"
                    />
                  </td>
                </tr>

                <tr>
                  <td>Interior: </td>
                  <td>
                    <BusinessRating
                      rating={establishment.average_interior}
                      icon="interior"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Bathroom:</td>
                  <td>
                    <BusinessRating
                      rating={establishment.average_bathroom}
                      icon="bathroom"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className={styles["hours-container"]}>
            <li>
              {establishment.hours[0] && (
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
          latitude={establishment.coordinates.latitude}
          longitude={establishment.coordinates.longitude}
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
