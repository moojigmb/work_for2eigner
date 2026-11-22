'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

interface VisaDetail {
  code: string;
  name: string;
  series: 'D' | 'E' | 'F' | 'GH';
  seriesLabel: string;
  target: string;
  stayPeriod: string;
  feeSummary: string;
  howToGet: string[];
  costInfo: string[];
  workScope: string;
  caution: string;
}

const ALL_VISAS: VisaDetail[] = [
  {
    code: 'D-2',
    name: '정규 유학 비자 (전문학사·학사·석·박사)',
    series: 'D',
    seriesLabel: 'D계열',
    target: '국내 전문대학 이상 정규 학위과정 입학·재학생',
    stayPeriod: '1회 최대 2년',
    feeSummary: '변경 10만 원 · 등록증 3.5만 원',
    howToGet: [
      '국내 대학 입학 지원 후 표준입학허가서 발급',
      '재외공관 사증 신청 또는 국내 체류자격 변경(D-4 → D-2) 신청',
      '입국 후 90일 이내 관할 출입국사무소 외국인등록 및 지문등록',
    ],
    costInfo: [
      '행정 수수료: 사증발급 약 60~90 USD / 국내 자격변경 100,000원 + 등록증 35,000원',
      '재정 입증: 유학경비 예금잔고 증명 (수도권 2,000만 원 / 지방 1,600만 원 이상)',
    ],
    workScope:
      '직전 학기 평균 C학점(2.0) 이상 + 시간제 취업허가 시 학기 중 주 10~30시간, 주말·방학 무제한 근무 가능',
    caution:
      '사전 시간제 취업허가(수수료 면제) 없이 아르바이트 적발 시 범칙금 부과 및 비자 연장 제한',
  },
  {
    code: 'D-4',
    name: '일반연수 비자 (대학 부설 어학당·기술연수)',
    series: 'D',
    seriesLabel: 'D계열',
    target: '대학 부설 어학원 한국어 연수생(D-4-1) 및 공공·기업 기술연수생',
    stayPeriod: '6개월 단위 (최대 2년)',
    feeSummary: '연장 6만 원 · 등록증 3.5만 원',
    howToGet: [
      '고교 졸업 이상 학력 인증(아포스티유·영사확인) 후 어학당 등록 및 납부',
      '표준입학허가서 수령 → 재외공관 비자 또는 사증발급인정서 신청',
      '6개월마다 출석률 70% 이상 성적·출석증명서 제출 후 체류 연장',
    ],
    costInfo: [
      '행정 수수료: 사증발급 약 60 USD / 체류연장 60,000원 / 등록증 발급 35,000원',
      '재정 입증: 어학연수 경비 약 1,000만 원 이상 본인 명의 예금잔고 증명',
    ],
    workScope:
      '입국(자격변경) 6개월 경과 + 출석률 90% 이상 시 시간제 취업허가 후 주 10시간(TOPIK 2급 이상 주 20시간)',
    caution:
      'D-4는 주말·공휴일 무제한 근무 예외가 없으며, 출석률 70% 미만 시 비자 연장이 불허됨',
  },
  {
    code: 'D-7 / D-8 / D-9',
    name: '주재·기업투자·무역경영 비자',
    series: 'D',
    seriesLabel: 'D계열',
    target: '외국기업 지사 파견자(D-7), 외국인투자법인 설립자(D-8), 무역·창업자(D-9)',
    stayPeriod: '1회 최대 2~5년',
    feeSummary: '변경 10만 원 · 투자금 1억~3억 원',
    howToGet: [
      'D-7: 본사 1년 이상 근무 경력 입증 및 국내 지사 파견명령서 제출',
      'D-8: KOTRA 또는 외국환은행 투자신고 → 법인설립·사업자등록 → 투자기업등록 후 신청',
      'D-9: 무역업 고유번호 부여 및 수출입 실적 또는 기술창업비자(D-8-4) 점수 충족',
    ],
    costInfo: [
      '행정 수수료: 국내 자격변경 100,000원 / 체류연장 60,000원 / 등록증 35,000원',
      '투자 자본금: D-8(법인투자) 1억 원 이상 / D-9(무역경영) 3억 원 이상 해외송금 입증 필수',
    ],
    workScope:
      '허가받은 해당 투자법인·지사·무역업체의 경영 및 필수 전문 인력 활동만 허용',
    caution:
      '실제 사업장 운영 없이 명목상 자본금만 예치한 경우 실태조사 적발 시 강제퇴거 조치',
  },
  {
    code: 'D-10',
    name: '구직 비자 (졸업 후 취업준비·유급 인턴)',
    series: 'D',
    seriesLabel: 'D계열',
    target: '국내 전문학사 이상 졸업(예정)자 및 세계 우수대학 졸업자',
    stayPeriod: '6개월 단위 (최대 2~3년)',
    feeSummary: '변경 10만 원 · 연장 6만 원',
    howToGet: [
      '졸업예정증명서 또는 학위증명서 발급 후 월별 구직활동계획서 작성',
      '구직점수제(190점 만점 중 60점 이상) 충족 (국내 학사 이상 졸업자는 특례 적용)',
      '체류만료 전 관할 출입국사무소 방문 또는 하이코리아 온라인 자격변경 신청',
    ],
    costInfo: [
      '행정 수수료: 자격변경 100,000원 / 6개월 체류연장 60,000원 / 등록증 35,000원',
      '재정 입증: 체류기간(6개월) 동안의 생계비(약 450만 원 이상) 통장 잔고 증명',
    ],
    workScope:
      '일반 단순 아르바이트 금지. 단, 전공 연계 기업과 계약 시 최대 1년(동일 기업 6개월) 유급 인턴십 가능',
    caution:
      '인턴십 시작 후 15일 이내에 반드시 출입국사무소에 연수개시 신고를 해야 불법취업 면제',
  },
  {
    code: 'E-1 ~ E-6',
    name: '전문직 취업 비자 (교수·회화지도·연구·기술·전문직·예술)',
    series: 'E',
    seriesLabel: 'E계열',
    target: '교수(E-1), 원어민 강사(E-2), 연구원(E-3), 기술지도(E-4), 전문직(E-5), 예술(E-6)',
    stayPeriod: '1회 최대 2~5년',
    feeSummary: '사증 약 60~90 USD · 변경 10만 원',
    howToGet: [
      '국내 대학·학원·연구소·기획사와 고용계약 체결 후 사증발급인정서 신청',
      'E-2(회화지도): 모국어 국가 학사학위 + 아포스티유 범죄경력증명서 + 채용신체검사',
      'E-6(예술흥행): 영상물등급위원회 또는 문체부 등 소관 부처 고용추천서 발급 필수',
    ],
    costInfo: [
      '행정 수수료: 사증발급인정서 무료 / 재외공관 사증 약 60~90 USD / 국내 변경 100,000원',
      '추가 실비: 본국 서류 아포스티유·번역공증비 및 채용신체검사비(약 8만~12만 원)',
    ],
    workScope:
      '계약된 대학·어학원·연구소 등 지정 근무처에서의 해당 전문 활동만 허용',
    caution:
      'E-2 비자 소지자가 근무처 추가 등록 없이 개인 과외나 타 학원 강의를 하면 즉시 처벌 대상',
  },
  {
    code: 'E-7',
    name: '특정활동 비자 (전문인력 E-7-1 / 숙련기능인력 E-7-4)',
    series: 'E',
    seriesLabel: 'E계열',
    target: 'IT·해외영업·통번역 등 87개 전문직종(E-7-1) 및 제조·건설 숙련인력(E-7-4)',
    stayPeriod: '1회 최대 3년 (계속 연장)',
    feeSummary: '변경 10만 원 · 연장 6만 원',
    howToGet: [
      'E-7-1: 관련 학사+1년 경력(국내 대학 졸업자는 경력 면제 특례) + 기업 고용사유서 제출',
      'E-7-4: E-9·H-2 비자로 4년 이상 근무 후 K-Point 점수제(300점 중 200점 이상) 신청',
      '고용 기업이 관할 출입국사무소에 고용계약서 및 내국인 고용보험 명부 제출 후 허가',
    ],
    costInfo: [
      '행정 수수료: 국내 자격변경 100,000원 / 체류연장 60,000원 / 등록증 35,000원',
      '임금 요건: E-7-1 전년도 1인당 GNI 80% 이상(중소기업·유학생 특례 완화) / E-7-4 연 2,600만 원 이상',
    ],
    workScope:
      '허가받은 회사와 직무에 한해 정규직 풀타임 근무 (이직 시 사전 근무처 변경 허가 필수)',
    caution:
      '내국인 고용인원 대비 외국인 비율(20% 이내) 요건이 있으며, 무단 이직·퇴사 미신고 시 과태료 부과',
  },
  {
    code: 'E-9',
    name: '비전문취업 비자 (고용허가제 EPS)',
    series: 'E',
    seriesLabel: 'E계열',
    target: '고용허가제 MOU 체결 17개국 출신 제조·건설·농축산·어업·서비스 근로자',
    stayPeriod: '최대 4년 10개월',
    feeSummary: '사증 약 60 USD · 등록증 3.5만 원',
    howToGet: [
      '송출국 현지에서 고용허가제 한국어능력시험(EPS-TOPIK) 및 기능시험 합격',
      '구직자 명부 등록 → 한국 중소기업 사업주 알선 및 표준근로계약 체결',
      '한국산업인력공단(HRD Korea) 입국 지원 및 취업교육 이수 후 사업장 배치',
    ],
    costInfo: [
      '행정 수수료: 사증발급 약 60 USD / 외국인등록증 발급 35,000원 (알선 수수료 무료)',
      '출국전 실비: EPS-TOPIK 응시료(약 28 USD), 건강검진비, 출국만기·귀국비용보험 가입비',
    ],
    workScope:
      '배정받은 제조업·농축산업·건설업·어업·일부 서비스업(음식점 주방보조 등) 사업장 근로',
    caution:
      '사업장 변경은 원칙적으로 3회로 제한되며, E-7-4 숙련기능인력 요건을 채우면 장기 체류 전환 가능',
  },
  {
    code: 'E-10',
    name: '선원취업 비자 (내항선·원양어선·연근해어선)',
    series: 'E',
    seriesLabel: 'E계열',
    target: '선박직원법상 선원으로서 국내 선박에 6개월 이상 승선 취업하는 외국인',
    stayPeriod: '1회 최대 1년 (계속 연장)',
    feeSummary: '사증 약 60 USD · 등록증 3.5만 원',
    howToGet: [
      '수협중앙회 또는 한국해운조합의 외국인선원 도입 추천서 발급',
      '선주(고용주)와 선원근로계약 체결 후 관할 출입국사무소 사증발급인정서 신청',
      '입국 후 선원수첩 발급 및 관할 지방해양수산청 승선 공인 절차 완료',
    ],
    costInfo: [
      '행정 수수료: 사증발급인정서 무료 / 사증발급 약 60 USD / 등록증 발급 35,000원',
      '보험 요건: 선주 측에서 외국인선원 재해보상보험 및 임금체불보증보험 의무 가입',
    ],
    workScope:
      '허가받은 선박 및 어선에서의 선원 승선 근로 (육상 일반 사업장 취업 불가)',
    caution:
      '승선 예정 선박에서 무단 이탈 시 즉시 불법체류자로 전환되며 신원보증인에게 제재가 가해짐',
  },
  {
    code: 'F-1 / F-3',
    name: '방문·동거(F-1) 및 동반 가족(F-3) 비자',
    series: 'F',
    seriesLabel: 'F계열',
    target: '친척 방문·가사보조(F-1) 및 D·E계열 체류자의 배우자·미성년 자녀(F-3)',
    stayPeriod: '주 체류자 기간과 동일',
    feeSummary: '변경 10만 원 · 등록증 3.5만 원',
    howToGet: [
      '가족관계 입증 서류(혼인관계증명서·출생증명서 아포스티유) 준비',
      '주 체류자의 재직증명서·소득금액증명원·납세증명서 등 부양능력 입증 서류 첨부',
      '재외공관 동반사증 신청 또는 국내 단기체류자격에서 자격변경 신청',
    ],
    costInfo: [
      '행정 수수료: 사증발급 약 60~90 USD / 국내 자격변경 100,000원 / 등록증 35,000원',
      '재정 입증: 동반 가족 생계 유지를 위한 주 체류자의 일정 수준 이상 국내 소득 증빙',
    ],
    workScope:
      '원칙적으로 취업 불가. 단, F-3 배우자가 E-7 전문직 자격 요건을 갖추어 별도 체류자격외 활동허가 시 취업 가능',
    caution:
      '사전 취업허가 없이 아르바이트나 식당 일을 할 경우 주 체류자(배우자)의 비자 연장까지 불이익 발생',
  },
  {
    code: 'F-2',
    name: '거주 비자 (점수제 우수인재 F-2-7 등)',
    series: 'F',
    seriesLabel: 'F계열',
    target: 'D-2·D-10·E-1~E-7 합법 체류 우수인재(F-2-7) 및 영주권자 가족 등',
    stayPeriod: '1회 최대 3~5년',
    feeSummary: '변경 10만 원 · 연장 6만 원',
    howToGet: [
      'F-2-7 점수표(170점 만점)에서 나이·학력·TOPIK/KIIP·연간소득 합산 80점 이상 달성',
      '국내 석·박사 졸업 유학생은 체류기간 요건 면제 및 고득점 배점 유리',
      '소득금액증명원·학위증·사회통합프로그램 이수증을 지참해 출입국사무소 자격변경 신청',
    ],
    costInfo: [
      '행정 수수료: 국내 자격변경 100,000원 / 체류연장 60,000원 / 등록증 35,000원',
      '소득 기준: 평가 점수에 따라 연 소득 3,000만~4,000만 원 이상일수록 고득점 확보 유리',
    ],
    workScope:
      '취업 직종 제한이 사라져 자유로운 이직, 창업, 프리랜서, N잡 활동 가능 (단순노무·유흥업 제외)',
    caution:
      '기간 연장 시에도 80점 이상 점수를 유지해야 하며, 소득 감소 시 체류기간이 1년으로 단축될 수 있음',
  },
  {
    code: 'F-4',
    name: '재외동포 비자 (외국국적동포)',
    series: 'F',
    seriesLabel: 'F계열',
    target: '대한민국 국적을 보유했던 자 또는 부모·조부모 중 일방이 대한민국 국적이었던 자',
    stayPeriod: '1회 최대 3년 (계속 연장)',
    feeSummary: '변경 10만 원 · 거소증 3.5만 원',
    howToGet: [
      '과거 한국 국적 보유 또는 직계존속의 한국 국적 입증 서류(제적등본·기본증명서) 발급',
      '한국어 능력 입증(TOPIK 1급 이상, KIIP 1단계 이상, 국내 초·중·고 졸업 등) + 범죄경력증명서',
      '출입국사무소 자격변경 후 국내거소신고증 발급',
    ],
    costInfo: [
      '행정 수수료: 국내 자격변경 100,000원 / 기간연장 60,000원 / 국내거소신고증 35,000원',
      '추가 실비: 해외 범죄경력증명서 아포스티유 및 번역공증 수수료',
    ],
    workScope:
      '사무직·전문직·서비스업·창업 등 폭넓은 자유 취업 가능 (단, 법무부 고시 단순노무 직종은 제한)',
    caution:
      '건설현장 단순노무·택배 상하차 등 일부 단순노무 직종 취업 시 출입국관리법 위반으로 처벌됨',
  },
  {
    code: 'F-5',
    name: '영주권 비자 (대한민국 영주자격)',
    series: 'F',
    seriesLabel: 'F계열',
    target: 'F-2·E-7 등으로 5년 이상 합법 체류자, 국내 박사학위 취득자, 고액투자자 등',
    stayPeriod: '영구 (10년마다 영주증 갱신)',
    feeSummary: '신청 20만 원 · 영주증 3.5만 원',
    howToGet: [
      '기본소양 요건 충족: 사회통합프로그램(KIIP) 5단계 이수 또는 영주용 종합평가 60점 이상',
      '생계유지 능력 입증: 전년도 1인당 GNI의 2배 이상 소득 (국내 박사·과학기술인재는 GNI 1배 이상)',
      '국내외 범죄경력증명서 제출 후 관할 출입국사무소 영주자격 변경 신청 (심사 약 6~10개월)',
    ],
    costInfo: [
      '행정 수수료: 영주자격 신청 수수료 200,000원 + 영주증 발급 수수료 35,000원',
      '소득 요건: 일반 영주(F-5-1) 전년도 GNI 2배 / 점수제(F-5-16)·국내박사는 GNI 1배 이상',
    ],
    workScope:
      '내국인과 거의 동일한 수준의 완전한 취업·창업 자유 보장 (직종 제한 없음, 지방선거 투표권 부여)',
    caution:
      '허가일로부터 2년 이상 재입국허가 없이 해외에 체류하거나 중대 범죄를 저지를 경우 영주권 취소 가능',
  },
  {
    code: 'F-6',
    name: '결혼이민 비자 (국민의 배우자)',
    series: 'F',
    seriesLabel: 'F계열',
    target: '대한민국 국민과 혼인신고를 마친 외국인 배우자',
    stayPeriod: '최초 1년 → 연장 최대 3년',
    feeSummary: '사증 약 60~90 USD · 변경 10만 원',
    howToGet: [
      '양국 혼인신고 완료 후 한국인 배우자의 초청장, 혼인배경진술서, 주거요건 서류 작성',
      '소득요건(2인 가구 기준 중위소득 120% 이상) 및 기초 한국어 능력(TOPIK 1급 이상) 입증',
      '재외공관 사증 신청 또는 임신·출산 등 인도적 사유 시 국내 자격변경 신청',
    ],
    costInfo: [
      '행정 수수료: 사증발급 약 60~90 USD / 국내 자격변경 100,000원 / 등록증 35,000원',
      '추가 실비: 국제결혼 안내프로그램 이수(무료) 및 양국 건강진단서·범죄경력증명서 발급비',
    ],
    workScope:
      '별도 허가 없이 모든 직종에서 자유로운 취업·창업·아르바이트 가능',
    caution:
      '단기비자(C-3)로 입국한 경우 임신·출산 등 불가피한 사유가 없으면 국내에서 F-6로 바로 변경 불가',
  },
  {
    code: 'G-1',
    name: '기타 비자 (난민신청·인도적 체류·산재·소송)',
    series: 'GH',
    seriesLabel: 'G·H계열',
    target: '난민인정 신청자(G-1-5), 인도적 체류허가자(G-1-6), 산재치료·임금체불 소송 중인 외국인',
    stayPeriod: '6개월~1년 단위 연장',
    feeSummary: '변경 10만 원 (난민신청 면제)',
    howToGet: [
      '난민신청서, 산재요양승인서, 노동청 진정서 또는 법원 소장 등 체류 불가피성 입증 서류 준비',
      '관할 출입국·외국인청 방문하여 체류자격 변경 또는 부여 신청',
    ],
    costInfo: [
      '행정 수수료: 일반 G-1 자격변경 100,000원 / 연장 60,000원 (난민신청자는 수수료 면제)',
    ],
    workScope:
      '원칙적으로 취업 불가. 단, 난민신청 후 6개월 경과자 또는 인도적 체류허가자(G-1-6)는 체류자격외 활동허가 후 취업 가능',
    caution:
      '허가 없이 취업 시 체류 연장 불허 및 강제퇴거 대상이 되므로 반드시 사전 취업허가 필요',
  },
  {
    code: 'H-1',
    name: '관광취업 비자 (워킹홀리데이)',
    series: 'GH',
    seriesLabel: 'G·H계열',
    target: '워킹홀리데이 협정 체결 26개국(일본·대만·호주·프랑스 등) 만 18~30세 청년',
    stayPeriod: '입국일로부터 최대 1년 (연장 불가)',
    feeSummary: '사증 무료~60 USD · 등록증 3.5만 원',
    howToGet: [
      '협정 체결국 국적자로서 본국 소재 대한민국 재외공관에 직접 사증 신청',
      '관광이 주된 목적임을 밝히는 활동계획서, 왕복항공권, 초기 체류자금 잔고증명 제출',
    ],
    costInfo: [
      '행정 수수료: 협정 국가별 상호주의에 따라 무료 또는 약 60 USD / 등록증 발급 35,000원',
      '재정 입증: 초기 정착 및 귀국 항공권 자금(약 300만~400만 원 상당) 통장 잔고 증명',
    ],
    workScope:
      '여행 경비 충당 목적의 단기 아르바이트 자유 가능 (단, 어학원 강사·전문직·유흥업소 취업 금지)',
    caution:
      '1년 체류 만료 후 반드시 출국해야 하며, 국내에서 D-2·E-7 등 다른 비자로 바로 변경할 수 없음',
  },
  {
    code: 'H-2',
    name: '방문취업 비자 (특례고용허가 동포)',
    series: 'GH',
    seriesLabel: 'G·H계열',
    target: '중국 및 구소련 지역(우즈베키스탄·카자흐스탄 등) 만 18세 이상 외국국적동포',
    stayPeriod: '1회 최대 3년 (총 4년 10개월)',
    feeSummary: '변경 10만 원 · 연장 6만 원',
    howToGet: [
      '재외공관 사증 신청 또는 기술교육(C-3-8 → H-2) 이수 후 체류자격 변경',
      '입국 후 한국산업인력공단 취업교육(16시간) 이수 및 고용센터 구직신청',
      '특례고용가능확인서를 발급받은 사업주와 근로계약 체결 후 근로개시신고',
    ],
    costInfo: [
      '행정 수수료: 국내 자격변경 100,000원 / 체류연장 60,000원 / 등록증 35,000원',
      '교육·보험비: 취업교육 수강료(약 10만 원대) 및 상해보험·귀국비용보험 가입비',
    ],
    workScope:
      '제조업, 건설업, 농축어업, 음식점업, 숙박업, 가사서비스업 등 허용 업종 내 자유로운 취업 및 이직 가능',
    caution:
      '취업 개시 및 근무처 변경 시 반드시 14일 이내에 출입국사무소 또는 하이코리아에 신고해야 함',
  },
];

export default function VisaInfoPage() {
  useLanguage();

  const [visaType, setVisaType] = useState<'D-2-UG' | 'D-2-GRAD' | 'D-4' | 'D-10'>('D-2-UG');
  const [hasTopik, setHasTopik] = useState<boolean>(true);
  const [selectedSeries, setSelectedSeries] = useState<'ALL' | 'D' | 'E' | 'F' | 'GH'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [openCode, setOpenCode] = useState<string | null>('D-2');

  const getVisaResult = () => {
    if (visaType === 'D-4') {
      return {
        hours: hasTopik
          ? '주 20시간 이내 (입국 6개월 경과 후)'
          : '주 10시간 이내 (입국 6개월 경과 후)',
        weekend: '주말·공휴일 무제한 적용 제외 (총 시간 내 근무)',
        procedure: '어학당 출석률 90% 이상 + 출입국사무소 시간제 취업허가 필수 (수수료 면제)',
      };
    }
    if (visaType === 'D-2-UG') {
      return {
        hours: hasTopik
          ? '주 25시간 이내 (TOPIK 3급 이상 충족)'
          : '주 10시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik
          ? '주말·공휴일·방학 중 무제한 근무 가능'
          : '주말·방학 포함 엄격 제한',
        procedure:
          '직전 학기 평균 학점 C학점(2.0) 이상 + 대학 국제처 확인 및 시간제 취업허가 (수수료 면제)',
      };
    }
    if (visaType === 'D-2-GRAD') {
      return {
        hours: hasTopik
          ? '주 30시간 이내 (TOPIK 4급 이상 충족)'
          : '주 15시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik
          ? '주말·공휴일·방학 중 무제한 근무 가능'
          : '주말·방학 포함 시간 제한',
        procedure: '대학 국제처 추천서 + 출입국사무소 시간제 취업허가 사전 신청 (수수료 면제)',
      };
    }
    return {
      hours: '인턴십(수습) 계약 시 풀타임 근무 가능',
      weekend: '단순 노무·일반 아르바이트 제한 (전공 연계 인턴 허용)',
      procedure: '인턴 개시일로부터 15일 이내 출입국사무소 연수개시 신고 필수',
    };
  };

  const result = getVisaResult();

  const filteredVisas = ALL_VISAS.filter((v) => {
    const matchesSeries = selectedSeries === 'ALL' || v.series === selectedSeries;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      v.code.toLowerCase().includes(q) ||
      v.name.toLowerCase().includes(q) ||
      v.target.toLowerCase().includes(q) ||
      v.howToGet.some((h) => h.toLowerCase().includes(q)) ||
      v.costInfo.some((c) => c.toLowerCase().includes(q)) ||
      v.workScope.toLowerCase().includes(q);
    return matchesSeries && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* 통일된 페이지 상단 헤더 */}
      <header className="pb-6 border-b border-zinc-200 space-y-1.5">
        <div className="text-xs font-medium text-zinc-500">
          출입국 체류자격 및 근로기준 안내
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
          비자 정보 및 체류자격 취득·비용 가이드
        </h1>
        <p className="text-sm text-zinc-600">
          유학생 법정 근로시간 계산기와 국내 주요 비자 16종의 취득 절차, 행정 수수료, 주의사항을 확인할 수 있습니다.
        </p>
      </header>

      {/* 1. 좌우 분할 법정 근로시간 계산기 */}
      <section className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              유학생·구직자 법정 허용 근로시간 계산기
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              체류자격과 TOPIK 등급을 선택하면 학기 중 주당 허용 근무시간이 계산됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
          {/* 좌측: 조건 선택 */}
          <div className="lg:col-span-7 p-6 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-medium text-zinc-600">
                1. 현재 체류자격
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'D-2-UG', label: 'D-2 학부' },
                  { id: 'D-2-GRAD', label: 'D-2 석·박사' },
                  { id: 'D-4', label: 'D-4 어학연수' },
                  { id: 'D-10', label: 'D-10 구직' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setVisaType(item.id as 'D-2-UG' | 'D-2-GRAD' | 'D-4' | 'D-10')
                    }
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                      visaType === item.id
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-zinc-600">
                2. 보유 한국어 능력 (TOPIK)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasTopik(true)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    hasTopik
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  TOPIK 3~4급 이상 보유
                </button>
                <button
                  type="button"
                  onClick={() => setHasTopik(false)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    !hasTopik
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  TOPIK 미보유 / 2급 이하
                </button>
              </div>
            </div>
          </div>

          {/* 우측: 진단 결과 */}
          <div className="lg:col-span-5 p-6 bg-zinc-50/70 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-medium text-zinc-500">
                학기 중 주당 허용 근로시간
              </div>
              <div className="text-lg font-semibold text-emerald-700">
                {result.hours}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs">
              <div>
                <span className="font-medium text-zinc-900">주말·방학 기준: </span>
                <span className="text-zinc-600">{result.weekend}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-900">필수 행정 절차: </span>
                <span className="text-zinc-600">{result.procedure}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 체류자격 16종 전체 명세표 (아코디언 테이블) */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'ALL', label: `전체 (${ALL_VISAS.length})` },
              { id: 'D', label: 'D계열 (유학·투자·구직)' },
              { id: 'E', label: 'E계열 (취업)' },
              { id: 'F', label: 'F계열 (거주·동포·영주)' },
              { id: 'GH', label: 'G·H계열 (기타·워홀)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setSelectedSeries(tab.id as 'ALL' | 'D' | 'E' | 'F' | 'GH')
                }
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedSeries === tab.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="비자 코드(E-7, F-5, H-1) 또는 키워드"
              className="w-full h-9 pl-9 pr-3 bg-white text-xs border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900"
            />
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          {/* 테이블 헤더 (데스크톱) */}
          <div className="hidden md:grid md:grid-cols-12 px-5 py-3 bg-zinc-50 border-b border-zinc-200 text-[11px] font-medium text-zinc-500">
            <div className="col-span-2">비자 코드</div>
            <div className="col-span-5">체류자격명 및 발급 대상</div>
            <div className="col-span-2">체류기간</div>
            <div className="col-span-2">주요 수수료·요건</div>
            <div className="col-span-1 text-right">상세</div>
          </div>

          <div className="divide-y divide-zinc-200">
            {filteredVisas.map((visa) => {
              const isOpen = openCode === visa.code;
              return (
                <div key={visa.code}>
                  {/* 요약 행 (클릭 시 상세 열림) */}
                  <button
                    type="button"
                    onClick={() => setOpenCode(isOpen ? null : visa.code)}
                    className="w-full px-5 py-4 text-left hover:bg-zinc-50/80 transition-colors grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center"
                  >
                    <div className="md:col-span-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-900 text-white rounded">
                        {visa.code}
                      </span>
                      <span className="text-[11px] text-zinc-400 md:hidden">
                        {visa.seriesLabel}
                      </span>
                    </div>

                    <div className="md:col-span-5">
                      <div className="text-sm font-semibold text-zinc-900">
                        {visa.name}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                        {visa.target}
                      </div>
                    </div>

                    <div className="md:col-span-2 text-xs text-zinc-600 tabular-nums">
                      {visa.stayPeriod}
                    </div>

                    <div className="md:col-span-2 text-xs text-zinc-600">
                      {visa.feeSummary}
                    </div>

                    <div className="md:col-span-1 flex items-center justify-end text-xs font-medium text-zinc-500">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-zinc-900" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* 펼쳐진 상세 명세 */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 bg-zinc-50/70 border-t border-zinc-100 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                        {/* 취득 방법 및 절차 */}
                        <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-2">
                          <div className="font-semibold text-zinc-900">
                            취득 방법 및 신청 절차
                          </div>
                          <ul className="space-y-1.5 text-zinc-600">
                            {visa.howToGet.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 비용 및 취업 허용 범위 */}
                        <div className="bg-white p-4 rounded-lg border border-zinc-200 space-y-3">
                          <div className="space-y-1.5">
                            <div className="font-semibold text-zinc-900">
                              예상 비용 및 재정·소득 요건
                            </div>
                            <ul className="space-y-1 text-zinc-600">
                              {visa.costInfo.map((cost, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  • {cost}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 border-t border-zinc-100 space-y-1">
                            <div className="font-semibold text-zinc-900">
                              취업·근로 허용 범위
                            </div>
                            <p className="text-zinc-600 leading-relaxed">
                              {visa.workScope}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 주의사항 */}
                      <div className="px-4 py-3 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>주의사항:</strong> {visa.caution}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}