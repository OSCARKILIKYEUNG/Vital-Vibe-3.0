import "./globals.css";

export const metadata = {
  title: "Vital Vibe",
  description: "Health & fitness web app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
