import React from "react";
import Rating from "react-rating";
import styles from "./BusinessRating.module.css";

export default function BusinessRating(props) {
  const iconName = (icon) => {
    switch (icon) {
      case "bathroom":
        return "fas fa-restroom";
      case "entrance":
        return "fas fa-door-open";
      case "interior":
        return "fas fa-house-user";
      case "parking":
        return "fas fa-parking";
      default:
        return "fas fa-wheelchair";
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <i className={iconName(props.icon)}></i>
      </div>

      <Rating
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
        fractions={2}
        readonly={!props.write && true}
        initialRating={props.rating}
        onClick={(value) => props.handleRatingChange(value, props.icon)}
      />
    </div>
  );
}
