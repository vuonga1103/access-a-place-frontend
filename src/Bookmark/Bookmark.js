import React, { useState } from "react";
import styles from "./Bookmark.module.css";
import bookmark_filled from "../assets/bookmark_filled.png";
import bookmark_unfilled from "../assets/bookmark_unfilled.png";
import { useDispatch, useSelector } from "react-redux";

export default function Bookmark({ establishment }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.userInformation.bookmarks);

  const bookMarkFound = !!bookmarks.find((b) => {
    return b.establishment.id === establishment.id;
  });
  const [bookmark, setBookmark] = useState(bookMarkFound);

  const handleClick = () => {
    fetch("http://localhost:4000/add-or-remove-bookmark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.token}`,
      },
      body: JSON.stringify({ establishment }),
    })
      .then((response) => response.json())
      .then((result) => {
        // If establishment was previously bookmarked, setBookmark state to false, and remove from redux store user's bookmarks state
        if (bookmark) {
          setBookmark(false);
          dispatch({ type: "REMOVE_BOOKMARK", payload: result });
          // Otherwise setBookmark state to true and add bookmark to redux store user's bookmarks state
        } else {
          setBookmark(true);
          dispatch({ type: "ADD_BOOKMARK", payload: result });
        }
      });
  };

  return (
    <img
      src={bookmark ? bookmark_filled : bookmark_unfilled}
      alt="bookmark-icon"
      className={styles.bookmark}
      onClick={handleClick}
    />
  );
}
