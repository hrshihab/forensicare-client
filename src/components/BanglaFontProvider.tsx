'use client';

import { useEffect } from 'react';
import { initBanglaFont } from '@/utils/bangla-font';

export const BanglaFontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    initBanglaFont();
  }, []);

  return <>{children}</>;
};
