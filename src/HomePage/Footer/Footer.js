import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`footer ${styles["page-footer"]}`}>
      <div className="content has-text-centered">
        <p>
          <strong>Access-A-Place</strong> by <strong>Anh Vuong</strong> © 2020
        </p>
      </div>
    </footer>
  );
}
