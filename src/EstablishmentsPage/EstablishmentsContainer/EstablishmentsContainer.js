import React from "react";
import { useSelector } from "react-redux";
import EstablishmentCard from "./EstablishmentCard/EstablishmentCard";
import styles from "./EstablishmentsContainer.module.css";
import loadingIcon from "../../assets/loading.gif";

export default function EstablishmentsContainer() {
  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );

  const loaded = useSelector((state) => state.establishmentInformation.loaded);

  if (!loaded) {
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
        <h6 className={`title is-6 ${styles.finding}`}>
          Finding those places...
        </h6>
      </>
    );
  }

  if (loaded && !establishments.length) {
    return (
      <h6 className="title is-6">
        No Results Found. Please try another search.
      </h6>
    );
  }

  const searchResults = establishments.map((est) => (
    <EstablishmentCard key={est.id} establishment={est} />
  ));

  return <div className={styles.container}>{searchResults}</div>;
}
