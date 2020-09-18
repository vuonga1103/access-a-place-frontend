import React from "react";
import { useSelector } from "react-redux";
import EstablishmentCard from "./EstablishmentCard/EstablishmentCard";

export default function EstablishmentsContainer() {
  const establishments = useSelector(
    (state) => state.establishmentInformation.establishments
  );

  if (!establishments) return <></>;

  const searchResults = establishments.map((est) => (
    <EstablishmentCard key={est.id} establishment={est} />
  ));

  return <div>{searchResults}</div>;
}
