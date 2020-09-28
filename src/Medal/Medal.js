import React from "react";
import bronze from "../assets/bronze.png";
import silver from "../assets/silver.png";
import gold from "../assets/gold.png";
import styles from "./Medal.module.css";

export default function Medal({ numReviews }) {
  const bronzeStatus = numReviews < 10;
  const silverStatus = numReviews >= 10 && numReviews < 20;
  const goldStatus = numReviews >= 20;

  const showMedalIcon = () => {
    if (bronzeStatus) {
      return bronze;
    } else if (silverStatus) {
      return silver;
    } else if (goldStatus) {
      return gold;
    }
  };

  return (
    <span className={styles.container}>
      <img src={showMedalIcon()} alt="medal" className={styles.icon} />
      <span className={styles.text}>
        <strong>
          {bronzeStatus && "Bronze Status"}
          {silverStatus && "Silver Status"}
          {goldStatus && "Gold Status"}
        </strong>
        <br />
        <strong>Bronze: </strong> &lt;10 reviews
        <br />
        <strong>Silver: </strong>
        10-19 reviews
        <br />
        <strong>Gold: </strong>
        20 reviews +
      </span>
    </span>
  );
}
