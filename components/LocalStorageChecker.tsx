"use client";

const defaultSettings: SettingsType = {
  version: "",
  isShowChart: true,
  caret: "block",
};

import { SettingsType } from "@/_types/SettingsType";
import { useEffect, useState } from "react";

const LocalStorageChecker = () => {
  useEffect(() => {
    const checkSettings = async () => {
      try {
        const response = await fetch("/version.json");
        const { version: localVersion } = await response.json();
        defaultSettings.version = localVersion;
        const localSettings = localStorage.getItem("settings");

        if (localSettings) {
          const parsedLocalSettings = JSON.parse(localSettings);
          const localSettingsKeys = Object.keys(parsedLocalSettings);
          const defaultSettingsKeys = Object.keys(defaultSettings);

          // TODO check each key in the object

          const sortedLocalKeys = [...localSettingsKeys].sort();
          console.log(sortedLocalKeys);
          const sortedDefaultKeys = [...defaultSettingsKeys].sort();
          console.log(sortedDefaultKeys);

          // if the keys matches
          if (
            sortedLocalKeys.length === sortedDefaultKeys.length &&
            sortedLocalKeys.every(
              (value, index) => value === sortedDefaultKeys[index],
            )
          ) {
            const updatedSettings = { ...parsedLocalSettings };

            sortedDefaultKeys.forEach((defaultKey) => {
              if (
                parsedLocalSettings[defaultKey as keyof SettingsType] === "" ||
                parsedLocalSettings[defaultKey as keyof SettingsType] ===
                  null ||
                parsedLocalSettings[defaultKey as keyof SettingsType] ===
                  undefined
              ) {
                const defaultValue =
                  defaultSettings[defaultKey as keyof SettingsType];

                updatedSettings[defaultKey as keyof SettingsType] =
                  defaultValue;
              }
            });

            localStorage.setItem("settings", JSON.stringify(updatedSettings));
          } else if (sortedLocalKeys !== sortedDefaultKeys) {
            // when keys don't match
          }
        } else if (!localSettings) {
          localStorage.setItem("settings", JSON.stringify(defaultSettings));
        }
      } catch (error) {
        console.error(error);
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
      }
    };

    checkSettings();
  }, []);

  return null;
};

export default LocalStorageChecker;
