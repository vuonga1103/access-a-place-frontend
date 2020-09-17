import React from "react";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsContainer from "./ReviewsContainer/ReviewsContainer";

export default function EstablishmentPage() {
  return (
    <div>
      EstablishmentPage name, address, hours of op, distance from visitor, num
      reviews, photo
      <ReviewsContainer />
      {/* Only if the user is logged in, display ReviewForm!!!! */}
      <ReviewForm />
    </div>
  );
}
