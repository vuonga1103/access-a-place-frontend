import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer";
import styles from "./EstablishmentPage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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

  return (
    <div className={styles.container}>
      <h2 className={`title is-2 ${styles.name}`}>{establishment.name}</h2>
      <div className={styles["body-container"]}>
        <div className={styles["images-carousel"]}>
          <AliceCarousel autoPlay autoPlayInterval="3000">
            {showEstablishmentImages()}
            {/* <img
              src="https://randomwordgenerator.com/img/picture-generator/57e9d6414c53ad14f1dc8460962e33791c3ad6e04e507440742a7ed1974dc4_640.jpg"
              className={styles.sliderimg}
            />
            <img
              src="https://randomwordgenerator.com/img/picture-generator/57e6d34b4a50b10ff3d8992cc12c30771037dbf85254794177277ddd924f_640.jpg"
              className={styles.sliderimg}
            />
            <img
              src="https://randomwordgenerator.com/img/picture-generator/55e7d5464c5aa514f1dc8460962e33791c3ad6e04e507440772872dc914bc0_640.jpg"
              className={styles.sliderimg}
            />
            <img
              src="https://randomwordgenerator.com/img/picture-generator/55e8d7444e57a814f1dc8460962e33791c3ad6e04e5074417c2e7dd29744c7_640.jpg"
              className={styles.sliderimg}
            /> */}
          </AliceCarousel>
        </div>
        <div className={styles["info"]}>
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
