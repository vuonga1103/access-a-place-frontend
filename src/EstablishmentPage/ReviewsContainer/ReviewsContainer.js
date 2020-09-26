import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review/Review";
import styles from "./ReviewsContainer.module.css";

export default function ReviewsContainer() {
  const establishment = useSelector(
    (state) => state.establishmentInformation.currentEstablishment
  );

  if (!establishment) return <></>;

  const showReviews = () => {
    if (establishment.reviews.length) {
      const reviews = establishment.reviews
        .reverse() // Ensures that most recent reviews show up first
        .map((r) => (
          <Review key={r.id} review={r} displayOn="establishment-page" />
        ));
      return <div className={styles.reviews}>{reviews}</div>;
    } else {
      return (
        <div className={styles["no-reviews"]}>
          No accessibility reviews available for this establishment yet. Be the
          first to review this place!
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <h4 className="title is-4">Reviews</h4>
      {showReviews()}
    </div>
  );
}
