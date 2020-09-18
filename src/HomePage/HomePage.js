import React from "react";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import cityImage from "../assets/background.jpg";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles["homepage-container"]}>
      <div className={styles.banner}>
        <img src={cityImage} alt="city-banner" />

        <div className={styles["banner-overlay"]}></div>
      </div>
      <Logo big />

      <div className={styles["search-bar"]}>
        <SearchBar />
      </div>

      <div className={styles.quote}>
        <p>
          “I can’t change the direction of the wind, <br />
          but I can adjust my sails to always reach my destination.”
        </p>
        <p className={styles.author}>– Jimmy Dean</p>
      </div>
    </div>
  );
}
