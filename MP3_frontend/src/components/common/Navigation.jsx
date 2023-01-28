import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../common/functions/isAuthenticated";

const Navigation = (props) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e, lng) => {
    i18n.changeLanguage(lng);
  };

  const loginLogoutLink = isAuthenticated() ? (
    <button onClick={props.handleLogout}>{t("auth.logout")}</button>
  ) : (
    <Link to="/login">{t("auth.login")}</Link>
  );

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="">
            {t("nav.main-page")}
          </Link>
        </li>
        <li>
          <Link to="/employees"> {t("nav.employees")}</Link>
        </li>
        <li>
          <Link to="/employees-tasks">{t("nav.employeeTasks")}</Link>
        </li>
        <li>
          <Link to="/tasks">{t("nav.tasks")}</Link>
        </li>
        <li className="lang">{loginLogoutLink}</li>
      </ul>
      {i18n.language == "pl" ? (
        <button
          type="button"
          className="list-actions-button-edit"
          onClick={(e) => changeLanguage(e, "en")}
        >
          EN
        </button>
      ) : (
        <button
          type="button"
          className="list-actions-button-edit"
          onClick={(e) => changeLanguage(e, "pl")}
        >
          PL
        </button>
      )}
    </nav>
  );
};

export default Navigation;
