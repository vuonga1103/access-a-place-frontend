import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessRating from "../../EstablishmentsPage/EstablishmentsContainer/EstablishmentCard/BusinessRating/BusinessRating";
import styles from "./ReviewForm.module.css";

export default function ReviewForm() {
  const loggedIn = useSelector((state) => state.userInformation.token);

  const establishment = useSelector(
    (state) => state.establishmentInformation.currentEstablishment
  );

  const dispatch = useDispatch();

  const initialReview = {
    bathroom_rating: null,
    entrance_rating: null,
    interior_rating: null,
    parking_rating: null,
    content: "",
  };

  const [review, setReview] = useState(initialReview);

  const handleRatingChange = (value, icon) => {
    switch (icon) {
      case "bathroom":
        setReview({ ...review, bathroom_rating: value });
        break;
      case "entrance":
        setReview({ ...review, entrance_rating: value });
        break;
      case "interior":
        setReview({ ...review, interior_rating: value });
        break;
      case "parking":
        setReview({ ...review, parking_rating: value });
        break;
      default:
        return null;
    }
  };

  const handleCommentChange = (e) => {
    setReview({ ...review, content: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!review.content) return alert("Please enter a review!");

    fetch("http://localhost:4000/reviews", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
      },
      body: JSON.stringify({ place_id: establishment.place_id, review }),
    })
      .then((response) => response.json())
      .then((establishment) => {
        dispatch({
          type: "SET_CURRENT_ESTABLISHMENT",
          payload: establishment,
        });

        setReview(initialReview);

        alert("Thank you for your review!");
      });
  };

  return (
    <div className={styles.container}>
      <h4 className="title is-4">Write a Review</h4>

      {loggedIn ? (
        <div className={styles.reviews}>
          <div className={styles["ratings-and-comments"]}>
            <div className={styles.ratings}>
              <ul>
                <li>
                  <strong>
                    <u>Click to Rate*</u>
                  </strong>
                </li>
                <li>
                  Parking:{" "}
                  <BusinessRating
                    icon="parking"
                    write
                    handleRatingChange={handleRatingChange}
                    rating={review.parking_rating}
                  />
                </li>
                <li>
                  Entrance:{" "}
                  <BusinessRating
                    icon="entrance"
                    write
                    handleRatingChange={handleRatingChange}
                    rating={review.entrance_rating}
                  />
                </li>
                <li>
                  Interior:{" "}
                  <BusinessRating
                    icon="interior"
                    write
                    handleRatingChange={handleRatingChange}
                    rating={review.interior_rating}
                  />
                </li>
                <li>
                  Bathroom:{" "}
                  <BusinessRating
                    icon="bathroom"
                    write
                    handleRatingChange={handleRatingChange}
                    rating={review.bathroom_rating}
                  />
                </li>
              </ul>
            </div>

            <div className={styles.comment}>
              <p>
                <strong>
                  <u>Things To Consider</u>
                </strong>
                <li>Are there accessible parking spaces?</li>
                <li>Is there a ramp or lift entrance?</li>
                <li>
                  Is there enough interior space to allow for wheelchair
                  maneuverability?
                </li>
                <li>
                  Does the bathroom floor space accommodate a wheelchair turn
                  radius?
                </li>
                <li>
                  Does the establishment provide alternatives for people with
                  visual or auditory impairments?
                </li>
              </p>

              <form className={styles["comment-form"]}>
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Write your review here..."
                      value={review.content}
                      onChange={handleCommentChange}
                    ></textarea>
                  </div>
                  <div className="control">
                    <button
                      className={`button is-primary ${styles.submit}`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <p>
            *Please provide rating from 0.5 to 5. Leave empty if rating is not
            applicable.
          </p>
        </div>
      ) : (
        "Please log in to submit a review."
      )}
    </div>
  );
}
