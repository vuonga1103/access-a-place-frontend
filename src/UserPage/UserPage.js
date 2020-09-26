import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Logo from "../HomePage/Logo/Logo";
import styles from "./UserPage.module.css";
import genericProfileImage from "../assets/profile.png";
import Review from "../EstablishmentPage/ReviewsContainer/Review/Review";
import { useSelector } from "react-redux";
import no_image from "../assets/no_image.jpg";
import Bookmark from "../Bookmark/Bookmark";

export default function UserPage() {
  const params = useParams();
  const userId = parseInt(params.id);
  const history = useHistory();

  const [user, setUser] = useState(null);
  const loggedIn = !!useSelector((state) => state.userInformation.token);
  const loggedInUser = useSelector((state) => state.userInformation);
  const bookmarks = useSelector((state) => state.userInformation.bookmarks);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(`http://localhost:4000/users/${userId}`)
      .then((response) => response.json())
      .then((result) => {
        return result.error ? history.push("/not-found") : setUser(result);
      });
  };

  if (!user) return <></>;

  const userReviews = user.reviews.reverse().map((r) => {
    return <Review key={r.content} review={r} displayOn="user-page" />;
  });

  const userBookmarks = bookmarks.reverse().map((b) => {
    return (
      <div key={b.id} className={styles["bookmark-container"]}>
        <img
          src={b.establishment.image_url || no_image}
          alt="b.establishment.name"
        />
        <br />
        {b.establishment.name.slice(0, 12)}
        <div className={styles.bookmark}>
          <Bookmark establishment={b.establishment} />
        </div>
      </div>
    );
  });

  const { date_joined, first_name, last_name, image_url } = user;

  return (
    <div className={styles["main-container"]}>
      <div className={styles.header}>
        <Logo big />
      </div>

      <div className={styles["photos-reviews-container"]}>
        <div className={styles["photo-container"]}>
          <img src={image_url || genericProfileImage} alt="profile" />
          <div className={styles.details}>
            <strong>
              {first_name} {last_name[0]}.
            </strong>
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
          <div className={styles.reviews}>{userReviews}</div>
        </div>
      </div>

      {loggedIn && loggedInUser.id === userId ? (
        <div className={styles["bookmarks-container"]}>
          <h4 className="title is-4">Bookmarked Places</h4>

          <div className={styles.outer}>{userBookmarks}</div>
        </div>
      ) : null}
    </div>
  );
}
