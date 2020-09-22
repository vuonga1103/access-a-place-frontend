import React from "react";
import BusinessRating from "../../EstablishmentsPage/EstablishmentsContainer/EstablishmentCard/BusinessRating/BusinessRating";
import styles from "./ReviewForm.module.css";

export default function ReviewForm() {
  return (
    <div className={styles.container}>
      <h4 className="title is-4">Submit a Review</h4>

      <div className={styles.reviews}>
        <h6 className="title is-6">Rate This Establishment</h6>
        <div className={styles["ratings-and-comments"]}>
          <div className={styles.ratings}>
            <ul>
              <li>
                <strong>
                  <u>Click to Rate</u>
                </strong>
              </li>
              <li>
                Parking <BusinessRating icon="parking" write />
              </li>
              <li>
                Entrance: <BusinessRating icon="entrance" write />
              </li>
              <li>
                Interior: <BusinessRating icon="interior" write />
              </li>
              <li>
                Bathroom: <BusinessRating icon="bathroom" write />
              </li>
            </ul>
          </div>

          <div className={styles.comment}>
            <p>
              <strong>
                <u>Things To Consider</u>
              </strong>
              <li>Are there accessible parking spaces?</li>
              <li>Is there a ramped or lift entrance?</li>
              <li>
                Is there enough interior space to allow for wheelchair
                maneuverability?
              </li>
              <li>
                Does bathroom floor space accommodate a wheelchair turn radius?
              </li>
            </p>

            <form className={styles["comment-form"]}>
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Write your review here..."
                  ></textarea>
                </div>
                <div className="control">
                  <button className={`button is-primary ${styles.submit}`}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
