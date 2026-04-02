"use clint";
import Header from "./component/header/header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <Header />
      <body>{children}</body>
    </html>
  );
}
