"use client";
import Footer from "./component/footer/Footer";
import Header from "./component/header/header";
import { ReduxProvider } from "./providers";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <body style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ReduxProvider>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}

