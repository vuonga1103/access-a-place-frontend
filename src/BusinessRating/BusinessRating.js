import React from "react";
import Rating from "react-rating";
import styles from "./BusinessRating.module.css";

export default function BusinessRating(props) {
  // Turns icon name into corresponding icon CSS class
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
        initialRating={props.rating}
        readonly={!props.write && true} // Rating can only be changed if prop write was passed in
        onClick={(value) => props.handleRatingChange(value, props.icon)} // If user changes rating, handle change via setting state to new rating value
      />
    </div>
  );
}
