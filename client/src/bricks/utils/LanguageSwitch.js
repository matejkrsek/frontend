import { Button } from "primereact/button";
import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "cz", lang: "CZ" },
  { code: "en", lang: "EN" },
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
      }}
    >
      {languages.map((lng) => {
        return (
          <Button
            className={lng.code === i18n.language ? "selected" : ""}
            key={lng.code}
            onClick={() => changeLanguage(lng.code)}
            style={{
              borderRadius: "5px",
              border: "1px solid transparent",

              backgroundColor:
                lng.code === i18n.language
                  ? "var(--yellow-color)"
                  : "var(--background-color)",

              color: "var(--primary-text-color)",
              borderColor: lng.code === i18n.language ? "grey" : "white",

              borderWidth: lng.code === i18n.language ? "3px" : "1px", // Změna tloušťky okraje podle stavu selected
            }}
          >
            <b>{lng.lang}</b>
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageSwitch;
