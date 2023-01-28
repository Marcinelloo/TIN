import React from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../common/functions/isAuthenticated";
import CurrentTasks from "./CurrentTasks";

const MainContent = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h2>{t("main-page.content")}</h2>
      <p>{t("main-page.description")}</p>
      {isAuthenticated() && <CurrentTasks />}
    </main>
  );
};

export default MainContent;
