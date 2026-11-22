'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Building2,
  FileCheck2,
  GraduationCap,
  Clock,
  User,
} from 'lucide-react';
import { useLanguage } from '../src/LanguageContext';

const MENU_LABELS: Record<
  string,
  {
    roadmap: string;
    companies: string;
    visa: string;
    specs: string;
    partTime: string;
  }
> = {
  ko: {
    roadmap: '취업 로드맵',
    companies: '기업 정보',
    visa: '비자 정보',
    specs: '스펙 쌓기',
    partTime: '아르바이트 정보',
  },
  en: {
    roadmap: 'Career Roadmap',
    companies: 'Company Info',
    visa: 'Visa Guide',
    specs: 'Build Specs',
    partTime: 'Part-time Jobs',
  },
  jp: {
    roadmap: '就職ロードマップ',
    companies: '企業情報',
    visa: 'ビザ情報',
    specs: 'スペック管理',
    partTime: 'アルバイト情報',
  },
  cn: {
    roadmap: '就业路线图',
    companies: '企业信息',
    visa: '签证信息',
    specs: '提升资历',
    partTime: '兼职信息',
  },
  vn: {
    roadmap: 'Lộ trình việc làm',
    companies: 'Thông tin doanh nghiệp',
    visa: 'Thông tin Visa',
    specs: 'Tích lũy hồ sơ',
    partTime: 'Thông tin làm thêm',
  },
};

export default function Sidebar() {
  const pathname = usePathname();
  const langContext = useLanguage() as {
    t: Record<string, string>;
    lang?: string;
  };
  const { t } = langContext;
  const currentLang = langContext.lang || 'ko';
  const labels = MENU_LABELS[currentLang] || MENU_LABELS.ko;

  const navItems = [
    {
      href: '/roadmap',
      label: labels.roadmap,
      icon: Compass,
    },
    {
      href: '/companies',
      label: labels.companies,
      icon: Building2,
    },
    {
      href: '/visa',
      label: labels.visa,
      icon: FileCheck2,
    },
    {
      href: '/spec',
      label: t.specs || labels.specs,
      icon: GraduationCap,
    },
    {
      href: '/',
      label: labels.partTime,
      icon: Clock,
    },
  ];

  return (
    <aside className="w-60 bg-white border-r border-zinc-200 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* 상단 브랜드 영역 */}
        <Link
          href="/roadmap"
          className="h-16 px-5 border-b border-zinc-200 flex items-center gap-2.5"
        >
          <div className="w-7 h-7 rounded-md bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold tracking-tight shrink-0">
            WB
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-zinc-900 tracking-tight">
              WorkBridge
            </div>
            <div className="text-[11px] text-zinc-500 truncate">
              {t.brandSub || '외국인 유학생 취업·비자 플랫폼'}
            </div>
          </div>
        </Link>

        {/* 메뉴 리스트 */}
        <div className="px-3 py-5 space-y-1.5">
          <div className="px-2.5 pb-1 text-[11px] font-medium text-zinc-400">
            {t.menu || '메뉴'}
          </div>

          <nav className="space-y-0.5">
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
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    isActive
                      ? 'bg-zinc-100 font-semibold text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-normal'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 하단 계정 영역 */}
      <div className="p-3 border-t border-zinc-200">
        <Link
          href="/login"
          className="w-full py-2 px-3 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-700 hover:bg-zinc-50 flex items-center justify-center gap-2 transition-colors"
        >
          <User className="w-3.5 h-3.5 text-zinc-500" />
          <span>{t.login || '로그인 / 회원가입'}</span>
        </Link>
      </div>
    </aside>
  );
}