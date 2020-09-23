import React from "react";
import styles from "./LoadingIcon.module.css";

export default function LoadingIcon() {
  return (
    <>
      <div className={styles["loading-icon"]}>
        {/* <img src={loadingIcon} alt="Loading Icon" /> */}
        <img
          src="https://i2.wp.com/boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?w=970"
          alt="Running around icon"
        />
        <br />
      </div>
      <h6 className={`title is-6 ${styles["loading-text"]}`}>Loading...</h6>
    </>
  );
}
