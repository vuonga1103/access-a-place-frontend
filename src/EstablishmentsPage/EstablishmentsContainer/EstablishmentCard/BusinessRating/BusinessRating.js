import React from "react";
import Rating from "react-rating";

export default function BusinessRating(props) {
  return (
    <div>
      <Rating
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
        fractions={2}
        readonly
        initialRating={props.rating}
      />
    </div>
  );
}
