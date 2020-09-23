import React from "react";
import Logo from "../HomePage/Logo/Logo";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div>
        <Logo big />
      </div>
      <p className={styles.content}>
        It is estimated that about 65 million people worldwide are wheelchair
        users. Yet it is known that the majority of establishments built are not
        built with accessibility or universal design in mind. This creates an
        environmental barrier that limits the way that people with disability
        can access the physical world around them.
      </p>
      <p className={styles.content}>
        Access-A-Place was built to remedy this problem through crowd-sourcing
        reviews of establishments’ accessibility. It would be nice, as a
        wheelchair user, to know that the grocery store you’re heading to does
        have accessible parking, or that the new salon in the neighborhood has a
        ramped entrance.
      </p>
      <p className={styles.content}>
        Access-A-Place takes the guesswork out of planning your outings. As a
        community, we can help everyone access places and participate in
        everyday activities regardless of whether or not they have a disability.
        Create a better world and review your local establishments today!
      </p>
    </div>
  );
}
