import React from "react";
import styles from "./Logo.module.css";

export default function Logo(props) {
  if (props.big) {
    return (
      <div className={styles["icon-container"]}>
        <span className={`icon ${styles["big-access-icon"]}`}>
          <i className="fas fa-universal-access fa-5x"></i>
        </span>
        <span className={styles["big-access-text"]}>Access-A-Place</span>
      </div>
    );
  }

  return (
    <div className={styles["icon-container"]}>
      <span className={`icon ${styles["access-icon"]}`}>
        <i className="fas fa-universal-access fa-2x"></i>
      </span>
      <span className={styles["access-text"]}>Access-A-Place</span>
    </div>
  );
}
