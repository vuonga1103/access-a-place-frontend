import React from "react";
import { useDispatch } from "react-redux";
import BusinessRating from "./BusinessRating/BusinessRating";
import styles from "./EstablishmentCard.module.css";

export default function EstablishmentCard({ establishment }) {
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: establishment });
  };

  const {
    name,
    image_url,
    location,
    phone,
    categories,
    average_overall,
  } = establishment;

  return (
    <div className={styles["search-result"]} onMouseOver={handleMouseOver}>
      <img src={image_url} alt={name} className={styles["business-image"]} />
      <div className={styles["business-info"]}>
        <h2 className="subtitle">{name}</h2>
        <p>{categories.join(", ")}</p>
        <BusinessRating rating={average_overall} />
      </div>
      <div className={styles["contact-info"]}>
        <p>
          {location[0]}
          <br />
          {location[1]}
        </p>
        <p>{phone}</p>
      </div>
    </div>
  );
}
