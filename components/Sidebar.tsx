'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Home, GraduationCap, User } from 'lucide-react';
import { useLanguage } from '../src/LanguageContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      href: '/',
      label: t.jobs,
      icon: Home,
      badge: 'NEW',
    },
    {
      href: '/spec',
      label: t.specs,
      icon: GraduationCap,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* 상단 로고 영역 */}
        <Link
          href="/"
          className="h-16 px-5 border-b border-gray-100 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-gray-900 text-white flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm text-gray-900 leading-tight">
              WorkBridge
            </div>
            <div className="text-[11px] text-gray-400 truncate mt-0.5">
              {t.brandSub}
            </div>
          </div>
        </Link>

        {/* 메뉴 리스트 */}
        <div className="p-4 space-y-2">
          <div className="px-2 text-[11px] font-semibold text-gray-400">
            {t.menu}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/' || pathname.startsWith('/jobs')
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-gray-100 font-bold text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-gray-900 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 하단 로그인 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/login"
          className="w-full py-2.5 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
        >
          <User className="w-3.5 h-3.5 text-gray-500" />
          <span>{t.login}</span>
        </Link>
      </div>
    </aside>
  );
}