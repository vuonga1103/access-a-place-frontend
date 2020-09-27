import React from "react";
import BusinessRating from "../../../BusinessRating/BusinessRating";
import styles from "./Review.module.css";
import profile from "../../../assets/profile.png";
import no_image from "../../../assets/no_image.jpg";
import { Link } from "react-router-dom";

export default function Review(props) {
  const {
    date,
    parking_rating,
    entrance_rating,
    interior_rating,
    bathroom_rating,
    content,
  } = props.review;

  const displayUserInfo = () => {
    if (props.displayOn === "establishment-page") {
      const { user } = props.review;
      return (
        <div>
          <Link to={`/users/${user.id}`}>
            {" "}
            <img
              src={user.image_url || profile}
              alt="user profile"
              className={styles["user-img"]}
            />
          </Link>

          <div className={styles.name}>
            {user.first_name} {user.last_name[0]}.
          </div>
          <div className={styles.date}>{date}</div>
        </div>
      );
    }
  };

  const displayEstInfo = () => {
    if (props.displayOn === "user-page") {
      console.log("review:", props.review);
      const { place_name, place_alias, image_url, date } = props.review;
      return (
        <div>
          <Link to={`/establishment/${place_alias}`}>
            <img
              src={image_url || no_image}
              alt="establishment"
              className={styles["est-img"]}
            />
          </Link>

          <div className={styles.name}>{place_name.slice(0, 11)}</div>
          <div className={styles.date}>{date}</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["est-or-user-info"]}>
        {displayUserInfo()}
        {displayEstInfo()}
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
