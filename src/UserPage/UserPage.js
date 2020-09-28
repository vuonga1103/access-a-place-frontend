import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Logo from "../HomePage/Logo/Logo";
import styles from "./UserPage.module.css";
import genericProfileImage from "../assets/profile.png";
import Review from "../EstablishmentPage/ReviewsContainer/Review/Review";
import { useDispatch, useSelector } from "react-redux";
import BookmarkedItem from "./BookmarkedItem/BookmarkedItem";
import Medal from "../Medal/Medal";

export default function UserPage() {
  const params = useParams();
  const userId = parseInt(params.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = !!useSelector((state) => state.userInformation.token);
  const loggedInUser = useSelector((state) => state.userInformation);
  const currentPageUser = useSelector(
    (state) => state.currentPageUserInformation
  );

  const bookmarks = useSelector((state) => state.userInformation.bookmarks);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(`http://localhost:4000/users/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        return result.error
          ? history.push("/not-found")
          : dispatch({
              type: "SET_CURRENT_PAGE_USER",
              payload: result,
            });
      });
  };

  if (!currentPageUser) return <></>;

  const userReviews = currentPageUser.reviews.map((r, i) => {
    return <Review key={i + r.content} review={r} displayOn="user-page" />;
  });

  const userBookmarks = () => {
    return bookmarks.map((b) => <BookmarkedItem key={b.id} bookmark={b} />);
  };

  const {
    date_joined,
    first_name,
    last_name,
    image_url,
    reviews,
  } = currentPageUser;

  return (
    <div className={styles["main-container"]}>
      <div className={styles.header}>
        <Logo big />
      </div>

      <div className={styles["photos-reviews-container"]}>
        <div className={styles["photo-container"]}>
          <img
            src={image_url || genericProfileImage}
            alt="profile"
            className={styles.profile}
          />
          <div className={styles.details}>
            <strong>
              {first_name} {last_name[0]}.{" "}
            </strong>

            <Medal numReviews={reviews.length} />

            <br />
            <span className="tag is-danger is-light">Joined {date_joined}</span>
            <br />
            <span className="tag is-danger is-light">
              {userReviews.length} Review(s)
            </span>
          </div>
        </div>

        <div className={styles["reviews-container"]}>
          <h4 className="title is-4">Recent Reviews</h4>

          {userReviews.length ? (
            <div className={styles.reviews}>{userReviews}</div>
          ) : (
            <div>No Reviews Yet</div>
          )}
        </div>
      </div>

      {loggedIn && loggedInUser.id === userId ? (
        <div className={styles["bookmarks-container"]}>
          <h4 className="title is-4">Bookmarked Places</h4>
          {bookmarks.length ? (
            <div className={styles.outer}>{userBookmarks()}</div>
          ) : (
            <div>No Bookmarks Yet</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
