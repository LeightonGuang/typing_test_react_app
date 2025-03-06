"use client";

const defaultSettings: SettingsType = {
  version: "",
  isShowChart: true,
  caret: "block",
};

import { SettingsType } from "@/_types/SettingsType";
import { useEffect } from "react";

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
          const defaultSettingsKeys = Object.keys(defaultSettings) as Array<
            keyof SettingsType
          >;

          // if the keys matches
          if (
            localSettingsKeys.length === defaultSettingsKeys.length &&
            localSettingsKeys.every(
              (value, index) => value === defaultSettingsKeys[index],
            )
          ) {
            const updatedSettings = { ...parsedLocalSettings };

            defaultSettingsKeys.forEach((defaultKey) => {
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
          } else if (
            !(
              localSettingsKeys.length === defaultSettingsKeys.length &&
              localSettingsKeys.every(
                (value, index) => value === defaultSettingsKeys[index],
              )
            )
          ) {
            // mismatching keys
            const updatedSettings: SettingsType = { ...defaultSettings };

            defaultSettingsKeys.forEach((defaultKey: keyof SettingsType) => {
              const localSettingValue = parsedLocalSettings[defaultKey];
              const isValidValue = (value: any) =>
                value !== "" && value !== null && value !== undefined;

              if (isValidValue(localSettingValue)) {
                // @ts-ignore
                updatedSettings[defaultKey] =
                  localSettingValue as SettingsType[typeof defaultKey];
              }
            });

            localStorage.setItem("settings", JSON.stringify(updatedSettings));
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
