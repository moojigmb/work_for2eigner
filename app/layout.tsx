import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { LanguageProvider } from '../src/LanguageContext';

export const metadata: Metadata = {
  title: 'WorkBridge - 유학생·외국인 맞춤 채용 포털',
  description: '외국인 유학생 및 구직자를 위한 채용·스펙 관리 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[#FAFAFA] text-gray-900 antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen">
            <Suspense
              fallback={
                <aside className="w-64 bg-white border-r border-gray-200 shrink-0 min-h-screen animate-pulse" />
              }
            >
              <Sidebar />
            </Suspense>
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}