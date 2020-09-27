import React from "react";
import styles from "./BookmarkedItem.module.css";
import no_image from "../../assets/no_image.jpg";
import { Link } from "react-router-dom";

export default function BookmarkedItem({ bookmark }) {
  return (
    <div className={styles.establishment}>
      <Link to={`/establishment/${bookmark.establishment.alias}`}>
        <img
          src={bookmark.establishment.image_url || no_image}
          alt="bookmark.establishment.name"
        />
      </Link>

      <br />
      {bookmark.establishment.name.slice(0, 20)}
    </div>
  );
}
