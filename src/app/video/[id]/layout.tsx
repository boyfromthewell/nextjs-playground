import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <main style={{ display: 'flex', flex: 1 }}>{children}</main>;
}
