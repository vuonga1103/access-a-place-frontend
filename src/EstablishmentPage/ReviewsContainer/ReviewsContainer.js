import React from "react";
import Review from "./Review/Review";
import styles from "./ReviewsContainer.module.css";

export default function ReviewsContainer({ establishment }) {
  if (!establishment) return <></>;

  const showReviews = () => {
    return establishment.reviews.map((r) => {
      return <Review key={r.id} review={r} />;
    });
  };

  return (
    <div className={styles.container}>
      <h3 className="title is-3">Reviews</h3>
      {showReviews()}
    </div>
  );
}
