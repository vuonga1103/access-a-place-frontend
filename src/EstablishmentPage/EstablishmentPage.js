import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer";
import styles from "./EstablishmentPage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import moment from "moment";

export default function EstablishmentPage() {
  const [establishment, setEstablishment] = useState(null);
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    fetchEstablishment();
  }, []);

  const fetchEstablishment = () => {
    const slug = params.slug;

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
          setEstablishment(establishment);
        }
      });
  };

  const showEstablishmentImages = () => {
    if (establishment) {
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

  if (!establishment) return <></>;

  const showOpenTimes = () => {
    if (establishment) {
      return establishment.hours[0]["open"].map((dayObj) => {
        const dayOfWeek = moment().day(dayObj.day).format("dddd");
        let openTime = moment(dayObj.start, "HH:mm").format("hh:mm");
        let closeTime = moment(dayObj.end, "HH:mm").format("hh:mm");

        openTime = openTime[0] === "0" ? openTime.slice(1) : openTime;
        closeTime = closeTime[0] === "0" ? closeTime.slice(1) : closeTime;

        return (
          <li key={dayOfWeek}>
            <strong>{`${dayOfWeek}: `}</strong>
            {` ${openTime} - ${closeTime}`}
          </li>
        );
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["heading-container"]}>
        <h2 className={`title is-2 ${styles.name}`}>{establishment.name}</h2>

        <h4 className={`subtitle ${styles.address}`}>
          {establishment.location[0]} <br /> {establishment.location[1]} <br />
          {establishment.phone}
          <br />
        </h4>
      </div>

      <div className={styles["body-container"]}>
        <div className={styles["images-carousel"]}>
          <AliceCarousel autoPlay autoPlayInterval={3000}>
            {showEstablishmentImages()}
          </AliceCarousel>
        </div>

        <div className={styles["info"]}>
          <ul>
            <li>
              <strong>Categories: </strong>
              {establishment.categories.join(", ")}
            </li>
            {establishment.hours[0]["is_open_now"] ? (
              <li>
                <i className="fas fa-door-open"></i> <strong>Open Now!</strong>
              </li>
            ) : (
              <li>
                <i className="fas fa-door-closed"></i>{" "}
                <strong>Closed Now</strong>
              </li>
            )}
            {showOpenTimes()}
          </ul>
          EstablishmentPage name, address, hours of op, distance from visitor,
          num reviews, photo
        </div>
      </div>

      <ReviewsContainer />
      {/* Only if the user is logged in, display ReviewForm!!!! */}
      <ReviewForm />
    </div>
  );
}
