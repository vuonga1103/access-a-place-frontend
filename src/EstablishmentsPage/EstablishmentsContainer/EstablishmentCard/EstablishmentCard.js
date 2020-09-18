import React from "react";
import styles from "./EstablishmentCard.module.css";

export default function EstablishmentCard({ establishment }) {
  const {
    name,
    image_url,
    location: { display_address },
    display_phone,
    categories,
  } = establishment;

  return (
    <div className={styles["search-result"]}>
      <img src={image_url} alt={name} className={styles["business-image"]} />
      <div className={styles["business-info"]}>
        <h2 className="subtitle">{name}</h2>
        <p>{categories.map((c) => c.title).join(", ")}</p>
      </div>
      <div className={styles["contact-info"]}>
        <p>
          {display_address[0]}
          <br />
          {display_address[1]}
        </p>
        <p>{display_phone}</p>
      </div>
    </div>
  );
}
