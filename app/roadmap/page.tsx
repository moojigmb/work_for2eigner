'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ArrowUpRight,
  Check,
  Building2,
  FileCheck2,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

type StudentStage = 'language' | 'undergrad' | 'graduating';

const STAGE_PLANS: Record<
  StudentStage,
  {
    label: string;
    visaRule: string;
    summary: string;
    tasks: { step: string; title: string; detail: string; href: string; action: string }[];
  }
> = {
  language: {
    label: '어학연수생 (D-4)',
    visaRule: '입국 6개월 경과 · 출석률 90% 이상 시 주 10~20시간 근로 가능',
    summary: '한국어 기초 역량 확보 및 정규 학위과정(D-2) 진학 준비 단계',
    tasks: [
      {
        step: '01',
        title: 'D-4 허용 근로시간 및 출석 기준 확인',
        detail: '어학당 출석률 90% 이상 유지 및 출입국사무소 시간제 취업허가 사전 신청',
        href: '/visa',
        action: '비자 기준 보기',
      },
      {
        step: '02',
        title: 'TOPIK 2~3급 취득으로 근로시간 확대',
        detail: 'TOPIK 2급 이상 보유 시 학기 중 주당 허용 근무시간이 10시간에서 20시간으로 증가',
        href: '/spec',
        action: '어학 스펙 확인',
      },
      {
        step: '03',
        title: '한국어 회화 중심 합법 아르바이트 시작',
        detail: '카페·매장·어학 보조 등 표준근로계약서를 발급하는 검증 공고 지원',
        href: '/',
        action: '공고 목록 보기',
      },
    ],
  },
  undergrad: {
    label: '대학·대학원 재학 (D-2)',
    visaRule: '직전 학기 C학점(2.0) 이상 · TOPIK 3~4급 보유 시 주 25~30시간 (방학 무제한)',
    summary: '전공 연계 실무 경험과 국가공인 자격증을 축적하는 핵심 준비 단계',
    tasks: [
      {
        step: '01',
        title: '목표 기업의 채용 직무와 어학 기준 파악',
        detail: '국내 주요 기업 12곳의 외국인 채용 전형과 요구 TOPIK 급수 사전 확인',
        href: '/companies',
        action: '기업 정보 탐색',
      },
      {
        step: '02',
        title: '정보처리기사·컴활·TOPIK 고득점 확보',
        detail: '서류 전형 가산점과 졸업 후 구직점수제(D-10)에 반영되는 핵심 자격 취득',
        href: '/spec',
        action: '추천 스펙 보기',
      },
      {
        step: '03',
        title: '통번역·사무보조·매장관리 경력 축적',
        detail: '단순 노무 대신 이력서 경력란에 기재할 수 있는 실무형 아르바이트 수행',
        href: '/',
        action: '아르바이트 찾기',
      },
    ],
  },
  graduating: {
    label: '졸업예정·구직자 (D-10 → E-7)',
    visaRule: '국내 학사 이상 졸업자는 E-7-1 전문인력 비자 경력 요건 면제 특례 적용',
    summary: '유급 인턴십(D-10) 및 정규직 취업비자(E-7) 전환을 완료하는 단계',
    tasks: [
      {
        step: '01',
        title: 'E-7 비자 스폰서십 지원 기업 집중 지원',
        detail: '내 현재 비자와 TOPIK 조건으로 즉시 지원 가능한 기업 필터링 후 지원',
        href: '/companies',
        action: '지원 가능 기업 보기',
      },
      {
        step: '02',
        title: 'D-10 구직비자 및 E-7 전환 서류 점검',
        detail: '고용계약서, 고용사유서, 학위증명서 등 출입국 제출 서류 및 수수료 확인',
        href: '/visa',
        action: '비자 서류 확인',
      },
      {
        step: '03',
        title: '재학 중 경력 기반 이력서·자기소개서 완성',
        detail: '프로필에 축적된 어학 성적, 자격증, 아르바이트 이력을 정리해 최종 지원',
        href: '/profile',
        action: '내 프로필 열기',
      },
    ],
  },
};

export default function CareerRoadmapPage() {
  useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [stage, setStage] = useState<StudentStage>('undergrad');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      router.push('/companies');
      return;
    }
    if (
      q.includes('비자') ||
      q.toUpperCase().includes('D-') ||
      q.toUpperCase().includes('E-') ||
      q.toUpperCase().includes('F-')
    ) {
      router.push('/visa');
    } else if (q.includes('스펙') || q.toUpperCase().includes('TOPIK')) {
      router.push('/spec');
    } else if (q.includes('알바') || q.includes('아르바이트')) {
      router.push('/');
    } else {
      router.push('/companies');
    }
  };

  const currentPlan = STAGE_PLANS[stage];

  const directoryIndex = [
    {
      num: '01',
      title: '기업 정보',
      meta: '인증 기업 12곳 · 공식 채용관 연결',
      desc: '삼성전자, 현대자동차, 쿠팡, 네이버 등 외국인 채용 전형과 E-7 비자 전환을 지원하는 기업 정보',
      href: '/companies',
      icon: Building2,
    },
    {
      num: '02',
      title: '비자 정보',
      meta: '체류자격 16종 · 근로시간 계산기',
      desc: 'D-2·D-4 법정 허용 근로시간 자동 계산 및 D·E·F·G·H계열 비자 취득 절차·수수료·주의사항 안내',
      href: '/visa',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: '스펙 쌓기',
      meta: '어학·자격증 로드맵',
      desc: 'TOPIK, TOEIC, 직무별 국가기술자격증 등 국내 기업 서류 통과율을 높이는 필수 역량 안내',
      href: '/spec',
      icon: GraduationCap,
    },
    {
      num: '04',
      title: '아르바이트 정보',
      meta: '비자 규정 준수 공고 · 지원자 통계',
      desc: '표준근로계약서 작성 및 시간제 취업허가가 가능한 검증 일자리와 공고별 지원자 평균 스펙 확인',
      href: '/',
      icon: Clock,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* 1. 상단 에디토리얼 2단 헤더 (추상 이미지 대신 실제 검색·요약 지표 배치) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-zinc-200 items-end">
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-medium text-zinc-500">
            국내 대학 유학생 취업·체류 통합 안내
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight leading-snug">
            유학생의 합법적인 아르바이트 경험부터
            <br />
            국내 기업 정규직 채용까지 단계별로 연결합니다.
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed">
            체류자격별 허용 근로시간을 먼저 확인하고, 목표 기업이 요구하는 어학·자격증 스펙과 실무 경력을 차근차근 준비할 수 있습니다.
          </p>

          {/* 실제 동작하는 통합 검색폼 */}
          <form onSubmit={handleSearch} className="pt-2 flex gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="기업명(삼성, 쿠팡) 또는 비자(D-2, E-7) 검색"
                className="w-full h-10 pl-10 pr-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
            >
              바로 찾기
            </button>
          </form>
        </div>

        {/* 우측 핵심 데이터 요약표 */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-lg divide-y divide-zinc-200">
          <Link
            href="/companies"
            className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
          >
            <div>
              <div className="text-xs text-zinc-500">외국인 채용 주요 기업</div>
              <div className="text-sm font-semibold text-zinc-900 mt-0.5">
                공식 채용포털 및 비자 지원 현황
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 tabular-nums">
              <span>12개사</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Link>

          <Link
            href="/visa"
            className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
          >
            <div>
              <div className="text-xs text-zinc-500">체류자격·취득비용 백과</div>
              <div className="text-sm font-semibold text-zinc-900 mt-0.5">
                D·E·F·G·H계열 비자 요건 및 근로시간 계산
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900 tabular-nums">
              <span>16종</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Link>

          <Link
            href="/"
            className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
          >
            <div>
              <div className="text-xs text-zinc-500">시간제 취업허가 준수 공고</div>
              <div className="text-sm font-semibold text-zinc-900 mt-0.5">
                지원자 평균 스펙·국적 통계 제공 일자리
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 tabular-nums">
              <span>실시간 모집</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
            </div>
          </Link>
        </div>
      </section>

      {/* 2. 체류 단계별 실행 가이드 (탭 전환 + 3단 체크리스트) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              현재 체류 단계별 준비 순서
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              본인의 비자 상태를 선택하면 지금 우선으로 확인해야 할 항목을 안내합니다.
            </p>
          </div>

          <div className="inline-flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 self-start">
            {(
              [
                { id: 'language', label: 'D-4 어학연수' },
                { id: 'undergrad', label: 'D-2 재학생' },
                { id: 'graduating', label: 'D-10·E-7 취업' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStage(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  stage === tab.id
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-zinc-50 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-zinc-900">{currentPlan.summary}</span>
            <span className="text-zinc-600">{currentPlan.visaRule}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {currentPlan.tasks.map((task) => (
              <div
                key={task.step}
                className="p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Check className="w-3.5 h-3.5" />
                    <span>STEP {task.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {task.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {task.detail}
                  </p>
                </div>

                <div>
                  <Link
                    href={task.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{task.action}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 서비스 전체 메뉴 인덱스 (카드 반복 대신 단정한 행 리스트) */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">
          메뉴별 상세 기능 안내
        </h2>

        <div className="bg-white border border-zinc-200 rounded-lg divide-y divide-zinc-200">
          {directoryIndex.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.num}
                href={item.href}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-zinc-400 pt-1">
                    {item.num}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-zinc-700" />
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {item.title}
                      </h3>
                      <span className="text-xs text-zinc-400">{item.meta}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-zinc-700 group-hover:text-zinc-900 shrink-0 pl-8 sm:pl-0">
                  <span>이동하기</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}