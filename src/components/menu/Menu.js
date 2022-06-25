import React from "react";
import styles from "./menu.module.scss";
import { NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <section className={styles.menu}>
      <div className={styles.menu__bar}>
        <nav className={styles.menu__content}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? styles["menu__icon-wrap--active"]
                  : styles["menu__icon-wrap"]
              }
            >
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive
                  ? styles["menu__icon-wrap--active"]
                  : styles["menu__icon-wrap"]
              }
            >
              <i className="fa-solid fa-check-double"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="pomo"
              className={({ isActive }) =>
                isActive
                  ? styles["menu__icon-wrap--active"]
                  : styles["menu__icon-wrap"]
              }
            >
              <i className="fa-solid fa-hourglass"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="notes"
              className={({ isActive }) =>
                isActive
                  ? styles["menu__icon-wrap--active"]
                  : styles["menu__icon-wrap"]
              }
            >
              <i className="fa-solid fa-note-sticky"></i>
            </NavLink>
          </li>
        </nav>
      </div>
    </section>
  );
};

export default Menu;
