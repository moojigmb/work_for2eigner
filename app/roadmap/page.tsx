'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Building2,
  FileCheck2,
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

type StudentStage = 'language' | 'undergrad' | 'graduating';

const STAGE_GUIDE: Record<
  StudentStage,
  {
    title: string;
    visaStatus: string;
    goal: string;
    actionSteps: { step: string; desc: string; href: string; btnText: string }[];
  }
> = {
  language: {
    title: '어학연수생 (D-4 비자)',
    visaStatus: '입국 6개월 경과 후 시간제 취업허가 가능 (출석률 90% 이상)',
    goal: 'TOPIK 3급 이상 취득 및 대학 정규 학위과정(D-2) 진학 준비',
    actionSteps: [
      {
        step: '1. 비자 기준 확인',
        desc: 'D-4 체류자격의 법정 허용 근로시간(주 10~20시간)과 필수 서류를 먼저 점검합니다.',
        href: '/visa',
        btnText: '비자 정보 확인',
      },
      {
        step: '2. TOPIK 어학 스펙 쌓기',
        desc: 'TOPIK 2급 이상 취득 시 아르바이트 허용 시간이 2배로 확대됩니다.',
        href: '/spec',
        btnText: '스펙 쌓기 이동',
      },
      {
        step: '3. 합법 아르바이트 시작',
        desc: '한국어 회화 실력을 키울 수 있는 카페·매장·어학 튜터 공고에 지원합니다.',
        href: '/',
        btnText: '아르바이트 찾기',
      },
    ],
  },
  undergrad: {
    title: '대학·대학원 재학생 (D-2 비자)',
    visaStatus: 'TOPIK 3~4급 보유 시 학기 중 주 25~30시간, 주말·방학 무제한 근무',
    goal: '전공 연계 아르바이트 실무 경력 + 자격증 축적으로 이력서 완성',
    actionSteps: [
      {
        step: '1. 목표 기업 역량 파악',
        desc: '졸업 후 입사하고 싶은 국내 기업의 요구 비자와 TOPIK 기준을 미리 확인합니다.',
        href: '/companies',
        btnText: '기업 정보 탐색',
      },
      {
        step: '2. 직무 자격증·어학 강화',
        desc: '정보처리기사, 컴퓨터활용능력, TOPIK 4~6급 등 취업 가산점 스펙을 준비합니다.',
        href: '/spec',
        btnText: '추천 스펙 보기',
      },
      {
        step: '3. 경력형 아르바이트 경험',
        desc: '단순 노무 대신 통번역, 사무보조, 관광·매장 매니저 경험을 쌓아 프로필에 기록합니다.',
        href: '/',
        btnText: '아르바이트 지원',
      },
    ],
  },
  graduating: {
    title: '졸업예정·구직자 (D-10 → E-7 비자 전환)',
    visaStatus: '국내 학사 이상 졸업자는 E-7-1 취업비자 경력 요건 면제 특례 적용',
    goal: '유급 인턴십(D-10) 및 정규직(E-7-1) 채용 합격',
    actionSteps: [
      {
        step: '1. 비자 스폰서 기업 집중 지원',
        desc: '내 비자와 TOPIK 조건으로 바로 지원 가능한 국내 대기업·글로벌 기업 공고를 확인합니다.',
        href: '/companies',
        btnText: '채용 기업 바로가기',
      },
      {
        step: '2. D-10·E-7 전환 서류 준비',
        desc: '구직점수제 요건과 고용계약서·고용사유서 등 출입국 제출 서류를 점검합니다.',
        href: '/visa',
        btnText: '비자 전환 가이드',
      },
      {
        step: '3. 이력서·자기소개서 최종 점검',
        desc: '재학 중 쌓은 아르바이트 경력과 자격증 데이터를 기반으로 자소서를 완성합니다.',
        href: '/profile',
        btnText: '내 프로필·자소서 관리',
      },
    ],
  },
};

export default function CareerRoadmapPage() {
  useLanguage();
  const [stage, setStage] = useState<StudentStage>('undergrad');
  const currentGuide = STAGE_GUIDE[stage];

  const menuFlow = [
    {
      num: '01',
      title: '기업 정보',
      subtitle: '목표 기업 및 채용 기준 탐색',
      desc: '외국인 유학생 채용과 E-7 비자 스폰서십을 지원하는 국내 주요 기업의 채용 전형과 공식 채용관 링크를 확인합니다.',
      href: '/companies',
      icon: Building2,
    },
    {
      num: '02',
      title: '비자 정보',
      subtitle: '법정 근로시간 및 비자 전환 가이드',
      desc: 'D-2·D-4 시간제 취업허가 허용 시간 계산부터 졸업 후 D-10·E-7·F-2-7 비자 취득 조건과 비용을 안내합니다.',
      href: '/visa',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: '스펙 쌓기',
      subtitle: '취업 필수 어학·자격증 로드맵',
      desc: 'TOPIK, TOEIC, 직무별 국가기술자격증 등 국내 기업 서류 통과율을 높이는 핵심 스펙을 체계적으로 준비합니다.',
      href: '/spec',
      icon: GraduationCap,
    },
    {
      num: '04',
      title: '아르바이트 정보',
      subtitle: '합법적 실무 경험 및 경력 축적',
      desc: '비자 규정을 준수하는 검증된 아르바이트로 한국 직장 문화를 익히고, 지원자 통계 분석을 통해 합격률을 높입니다.',
      href: '/',
      icon: Clock,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 상단 히어로 배너 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>WorkBridge 커리어·정착 통합 로드맵</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
          유학생의 아르바이트 경험이
          <br className="hidden sm:inline" /> 대한민국 정규직 취업까지 이어지도록
        </h1>

        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
          단순 일자리 연결을 넘어, <strong>목표 기업 탐색 → 비자 요건 검증 → 어학·자격증 스펙 축적 → 합법 아르바이트 실무 경험</strong>으로 이어지는 4단계 커리어 성장 시스템을 제공합니다.
        </p>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <Link
            href="/companies"
            className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>외국인 채용 기업 보러가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/visa"
            className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>내 비자 근로시간 계산하기</span>
          </Link>
        </div>
      </div>

      {/* 4단계 메뉴 연결 흐름도 (사이드바 순서와 동일) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-900" />
          <h2 className="text-base font-bold text-gray-900">
            WorkBridge 4단계 커리어 설계 메뉴 안내
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuFlow.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.num}
                href={item.href}
                className="group bg-white border border-gray-200 hover:border-gray-900 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-400 group-hover:text-gray-900 transition-colors">
                      STEP {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-gray-900 group-hover:text-white text-gray-700 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-900">
                  <span>바로 이동</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 현재 학적·체류 단계별 맞춤 실행 가이드 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-900" />
              <span>내 현재 단계별 맞춤 액션 플랜</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              본인의 현재 상태를 선택하면 지금 당장 준비해야 할 핵심 단계를 안내합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'language', label: '어학연수생 (D-4)' },
              { id: 'undergrad', label: '대학·대학원 재학 (D-2)' },
              { id: 'graduating', label: '졸업예정·구직 (D-10)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStage(tab.id as StudentStage)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  stage === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 선택된 단계 요약 박스 */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-gray-900 text-sm">
              {currentGuide.title}
            </div>
            <p className="text-gray-600">
              <strong>체류·근로 기준:</strong> {currentGuide.visaStatus}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-white border border-gray-200 font-semibold text-gray-800 shrink-0">
            핵심 목표: {currentGuide.goal}
          </div>
        </div>

        {/* 3단계 실행 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentGuide.actionSteps.map((act) => (
            <div
              key={act.step}
              className="p-4 rounded-xl border border-gray-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{act.step}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <Link
                href={act.href}
                className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{act.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}