'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}
