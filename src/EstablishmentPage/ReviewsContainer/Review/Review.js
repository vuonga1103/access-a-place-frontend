import React from "react";
import BusinessRating from "../../../EstablishmentsPage/EstablishmentsContainer/EstablishmentCard/BusinessRating/BusinessRating";
import styles from "./Review.module.css";
import profile from "../../../assets/profile.png";

export default function Review({ review }) {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <img src={profile} alt="user profile" />
          <br />
          {review.user.first_name} {review.user.last_name[0]}.
          <br />
          {review.date}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.ratings}>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Parking: </strong>
                  </td>
                  <td>
                    <BusinessRating
                      rating={review.parking_rating}
                      icon={"parking"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Entrance: </strong>
                  </td>
                  <td>
                    <BusinessRating
                      rating={review.entrance_rating}
                      icon={"entrance"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Interior: </strong>
                  </td>
                  <td>
                    <BusinessRating
                      rating={review.interior_rating}
                      icon={"interior"}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Bathroom: </strong>
                  </td>
                  <td>
                    <BusinessRating
                      rating={review.bathroom_rating}
                      icon={"bathroom"}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.comment}>
          <hr />
          <strong>Comment: </strong>
          {review.content}
        </div>
      </div>
    </div>
  );
}
