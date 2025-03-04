"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import { SettingIconSvg } from "@/components/icons";
import { SettingsType } from "@/_types/SettingsType";

const themeButtons = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Red Light", value: "red-light" },
  { label: "Red Dark", value: "red-dark" },
  { label: "Blue Light", value: "blue-light" },
  { label: "Blue Dark", value: "blue-dark" },
  { label: "Orange Light", value: "orange-light" },
  { label: "Orange Dark", value: "orange-dark" },
];

const SettingPage = () => {
  const { setTheme } = useTheme();
  const [versionNumber, setVersionNumber] = useState<string>("");
  const [localSettings, setLocalSettings] = useState<SettingsType>(
    {} as SettingsType,
  );
  const [localTheme, setLocalTheme] = useState<string>("dark");

  const handleThemeButton = (theme: string) => {
    setTheme(theme);
    window.location.reload();
  };

  const handleCursorButton = (caret: "bar" | "block" | "underline") => {
    const localSettings = localStorage.getItem("settings");

    if (localSettings) {
      const updatedSettings: SettingsType = JSON.parse(localSettings);

      if (caret === "block" || caret === "underline" || caret === "bar") {
        updatedSettings.caret = caret;
        localStorage.setItem("settings", JSON.stringify(updatedSettings));
        setLocalSettings(updatedSettings);
        // TODO toast notification for caret change
      } else {
        console.error("Invalid caret value");
      }
    } else if (!localSettings) {
      const newSettings: SettingsType = {
        version: versionNumber,
        isShowChart: true,
        caret: "block",
      };

      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  };

  useEffect(() => {
    const getVersion = async () => {
      try {
        const response = await fetch("/version.json");
        const { version: localVersion } = await response.json();
        setVersionNumber(localVersion);
      } catch (error) {
        console.error(error);
      }
    };

    getVersion();

    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) setLocalTheme(localStorageTheme);

    const localSettings = localStorage.getItem("settings");
    if (localSettings) setLocalSettings(JSON.parse(localSettings));
  }, []);

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <Card className="w-4/6 rounded-none">
        <CardHeader>
          <div className="flex items-center gap-4">
            <SettingIconSvg className="h-6 w-6" />
            <h1 className="text-2xl">Setting</h1>
          </div>
        </CardHeader>

        <CardContent>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["theme", "caret"]}
          >
            <AccordionItem value="theme" defaultChecked={true}>
              <AccordionTrigger>
                <span className="text-xl">Theme</span>
              </AccordionTrigger>

              <AccordionContent>
                <div className="text-lg">
                  {/* TODO: stack same colours in the same column */}
                  <div className="flex w-full gap-2">
                    {themeButtons.map((button) => (
                      <Button
                        key={button.value}
                        onClick={() => handleThemeButton(button.value)}
                        className={`w-full rounded-sm ${button.value}`}
                        disabled={localTheme === button.value}
                      >
                        {button.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="caret">
              <AccordionTrigger>
                <span className="text-xl">Caret</span>
              </AccordionTrigger>

              <AccordionContent>
                <div className="text-lg">
                  <div className="flex w-full gap-2">
                    <Button
                      className="rounded-sm"
                      onClick={() => {
                        handleCursorButton("block");
                      }}
                      disabled={localSettings.caret === "block"}
                    >
                      {"Block ( █ )"}
                    </Button>

                    <Button
                      className="rounded-sm"
                      onClick={() => {
                        handleCursorButton("bar");
                      }}
                      disabled={localSettings.caret === "bar"}
                    >
                      {"Bar ( | )"}
                    </Button>

                    <Button
                      className="rounded-sm"
                      onClick={() => {
                        handleCursorButton("underline");
                      }}
                      disabled={localSettings.caret === "underline"}
                    >
                      {"Underline ( _ )"}
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default SettingPage;
