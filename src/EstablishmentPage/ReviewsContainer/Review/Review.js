import React from "react";
import BusinessRating from "../../../BusinessRating/BusinessRating";
import styles from "./Review.module.css";
import profile from "../../../assets/profile.png";

export default function Review({ review }) {
  const {
    user,
    date,
    parking_rating,
    entrance_rating,
    interior_rating,
    bathroom_rating,
    content,
  } = review;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div>
          <img
            src={user.image_url ? user.image_url : profile}
            alt="user profile"
          />
          <div classNName={styles.name}>
            {user.first_name} {user.last_name[0]}.
          </div>
          <div className={styles.date}>{date}</div>
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
                    <BusinessRating rating={parking_rating} icon={"parking"} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Entrance: </strong>
                  </td>
                  <td>
                    <BusinessRating
                      rating={entrance_rating}
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
                      rating={interior_rating}
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
                      rating={bathroom_rating}
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
          {content}
        </div>
      </div>
    </div>
  );
}
