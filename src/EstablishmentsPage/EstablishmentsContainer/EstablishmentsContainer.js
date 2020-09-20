import React from "react";
import { useSelector } from "react-redux";
import EstablishmentCard from "./EstablishmentCard/EstablishmentCard";
import styles from "./EstablishmentsContainer.module.css";

export default function EstablishmentsContainer() {
  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );

  if (!establishments.length) return <div>No Result Found</div>;

  const searchResults = establishments.map((est) => (
    <EstablishmentCard key={est.id} establishment={est} />
  ));

  return <div className={styles.container}>{searchResults}</div>;
}
