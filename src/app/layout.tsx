import type { Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "./globals.css";
import { UIProvider } from "@/components/providers/UIProvider";
import { QueryProvider } from "@/context/query/QueryProvider";
import { NextAuthProvider } from "@/context/auth/NextAuthProvider";

export const metadata: Metadata = {
  title: "Ong Match — หาคนไทป์เดียวกัน",
  description:
    "ไทป์ไหน? ตรงกันปุ๊บ คุยกันปั๊บ — หาคนไทป์เดียวกัน คุยรู้ใจ ไม่ต้องงง",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <NextAuthProvider>
          <QueryProvider>
            <UIProvider>{children}</UIProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
