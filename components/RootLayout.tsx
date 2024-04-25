import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../app/globals.css';

const plus = Plus_Jakarta_Sans({ subsets: ['latin'] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default RootLayout;
