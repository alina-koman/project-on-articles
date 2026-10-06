import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.root}>
    <Container maxWidth="lg" className={styles.inner}>
      <Link className={styles.brand} to="/">
        Статті
      </Link>
      <p className={styles.note}>Історії, думки та ідеї, якими варто ділитися.</p>
      <span className={styles.copyright}>
        © {new Date().getFullYear()} Статті
      </span>
    </Container>
  </footer>
);
