import React from "react";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import cityImage from "../assets/background.jpg";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div>
      <div className={styles.banner}>
        <img src={cityImage} alt="city-banner" />

        <div className={styles["banner-overlay"]}></div>
      </div>
      <Logo big />
      <SearchBar />
    </div>
  );
}
