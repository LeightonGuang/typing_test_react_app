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
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SettingIconSvg } from "@/components/icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const SettingPage = () => {
  const { setTheme } = useTheme();

  const [localTheme, setLocalTheme] = useState<string>("dark");

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    setLocalTheme(localStorageTheme!);
  }, []);

  const themeButtons = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Red Light", value: "red-light" },
    { label: "Red Dark", value: "red-dark" },
  ];

  const handleThemeButton = (theme: string) => {
    setTheme(theme);
    window.location.reload();
  };

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
            type="single"
            collapsible
            className="w-full"
            defaultValue="theme"
          >
            <AccordionItem value="theme" defaultChecked={true}>
              <AccordionTrigger>
                <span className="text-xl">Theme</span>
              </AccordionTrigger>

              <AccordionContent>
                <div className="text-lg">
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
          </Accordion>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default SettingPage;
