import React from 'react';
import { Providers } from './providers';
import './globals.css'; // Проверьте правильность пути к вашим стилям Tailwind

export const metadata = {
  title: 'Dominus HUB',
  description: 'Decentralized Engineering Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}