import React, { useEffect, useState } from "react";
import BusinessRating from "../../../BusinessRating/BusinessRating";
import styles from "./Review.module.css";
import profile from "../../../assets/profile.png";
import no_image from "../../../assets/no_image.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Medal from "../../../Medal/Medal";

export default function Review(props) {
  const loggedInUser = useSelector((state) => state.userInformation);
  const loggedIn = useSelector((state) => state.userInformation.token);
  const dispatch = useDispatch();
  const [numReviews, setNumReviews] = useState(0);

  let {
    id,
    date,
    parking_rating,
    entrance_rating,
    interior_rating,
    bathroom_rating,
    content,
    user_id,
  } = props.review;

  if (props.review.user) {
    user_id = props.review.user.id;
  }

  useEffect(() => {
    getNumReviewsByUser();
  }, []);

  const getNumReviewsByUser = () => {
    fetch(`http://localhost:4000/users/${user_id}/num-reviews`)
      .then((response) => response.json())
      .then((num) => {
        setNumReviews(num);
      });
  };

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
            <span>
              {user.first_name} {user.last_name[0]}.
            </span>

            <Medal numReviews={numReviews} />
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

  const handleDeleteReviewClick = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      fetch(`http://localhost:4000/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `bearer ${localStorage.token}` },
      })
        .then((response) => response.json())
        .then((result) => {
          dispatch({
            type: "SET_ESTABLISHMENT",
            payload: result.establishment,
          });

          dispatch({
            type: "SET_CURRENT_ESTABLISHMENT",
            payload: result.establishment,
          });

          dispatch({
            type: "SET_CURRENT_PAGE_USER",
            payload: result.user,
          });
        });
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
        {loggedIn && loggedInUser.id === user_id && (
          <div className={styles.delete} onClick={handleDeleteReviewClick}>
            Delete
          </div>
        )}
      </div>
    </div>
  );
}
