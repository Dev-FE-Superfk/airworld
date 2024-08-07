import './styles/stylesheet.css';
import "./globals.css";


export const metadata = {
  title: "Airworld",
  description: "Airworld is a virtual world platform that allows users to create, share, and explore 3D spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
