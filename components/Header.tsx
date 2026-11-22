'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown, Check, Search, User } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS } from '../src/LanguageContext';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* 좌측: 5개국어 선택 드롭다운 */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="min-w-[24px] text-left">{lang}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg py-1.5 z-50">
            {LANGUAGE_OPTIONS.map((option) => {
              const isSelected = lang === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    setLang(option.code);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${
                    isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-gray-900" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 중앙: 사이트 타이틀 (클릭 시 홈으로 이동) */}
      <Link
        href="/"
        className="hidden md:block font-bold text-sm text-gray-900 hover:opacity-80 transition-opacity cursor-pointer"
      >
        {t.portalTitle}
      </Link>

      {/* 우측: 검색 & 프로필 버튼 */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="검색"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Search className="w-4 h-4" />
        </Link>

        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <User className="w-3.5 h-3.5 text-gray-600" />
          <span>{t.profile}</span>
        </Link>
      </div>
    </header>
  );
}