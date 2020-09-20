import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BusinessRating from "./BusinessRating/BusinessRating";
import styles from "./EstablishmentCard.module.css";

export default function EstablishmentCard({ establishment }) {
  const dispatch = useDispatch();

  const handleMouseOver = () => {
    dispatch({ type: "SET_SELECTED_ESTABLISHMENT", payload: establishment });
  };

  const {
    name,
    alias,
    image_url,
    location,
    phone,
    categories,
    average_overall,
  } = establishment;

  return (
    <div className={styles["search-result"]} onMouseOver={handleMouseOver}>
      <Link to={`/establishment/${alias}`}>
        <img src={image_url} alt={name} className={styles["business-image"]} />
      </Link>
      <div className={styles["business-info"]}>
        <h2 className="subtitle">
          <Link to={`/establishment/${alias}`}>{name}</Link>
        </h2>
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
