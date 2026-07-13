"use client";

import { MantineProvider, createTheme, type MantineColorsTuple } from "@mantine/core";

// Warm cactus-green primary scale — fits the "nature + cute" Ong Match vibe.
const ongGreen: MantineColorsTuple = [
  "#effbeb",
  "#dbf2cc",
  "#b6e596",
  "#90d95d",
  "#74d033",
  "#61ca1b",
  "#54bd10",
  "#45a407",
  "#3b9100",
  "#2f7d00",
];

const theme = createTheme({
  primaryColor: "ong-green",
  defaultRadius: "xl",
  colors: {
    "ong-green": ongGreen,
  },
  fontFamily:
    "var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans Thai', sans-serif",
  headings: { fontWeight: "700" },
});

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
