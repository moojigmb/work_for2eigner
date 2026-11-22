'use client';

import { Suspense, use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  Award,
  User,
  Calendar,
  Globe,
  Star,
  AlertTriangle,
  MapPin,
  Clock,
  Building2,
  BarChart3,
  Loader2,
  Users,
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { useLanguage, Lang } from '@/src/LanguageContext';
import { JOB_UI_TEXT, translateText, formatWage } from '@/src/lib/jobTranslator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CoverLetterModal from '@/components/CoverLetterModal';
import ApplyJobButton from '@/components/ApplyJobButton';

interface JobDetail {
  id: number;
  company_name: string;
  title: string;
  hourly_wage: string;
  schedule: string;
  location: string;
  job_type: string;
  education: string;
  language_level: string;
  is_urgent?: boolean;
}

interface NationalityItem {
  name: string;
  count: number;
  percent: number;
  color: string;
}

interface JobStatsPreset {
  baseCount: number;
  avgCareer: number;
  avgTopik: number;
  avgToeic: number;
  avgAge: number;
  nationalities: NationalityItem[];
  strengths: string[];
  cautions: string[];
}

interface ApplicantProfile {
  nationality: string | null;
  topik_level: string | null;
  toeic_score: string | null;
  experiences: string | null;
  birth_date: string | null;
}

const CHART_COLORS = ['#18181B', '#52525B', '#A1A1AA', '#D4D4D8', '#E4E4E7'];

// 공고 직종별 연관 경력 키워드 매핑
const JOB_TYPE_KEYWORDS: Record<string, string[]> = {
  '카페/음료': ['카페', '바리스타', '음료', '커피', '디저트', '베이커리'],
  '매장관리/판매': ['편의점', '매장', '판매', '캐셔', '진열', '응대', '스토어', '마트'],
  '음식점/서빙': ['서빙', '홀', '주방', '조리', '식당', '음식점', '설거지', '청소', '다이닝'],
  '교육/강사': ['튜터', '강사', '교육', '학원', '과외', '가르침'],
  '사무/번역': ['통역', '번역', '사무', '데이터', '검수', '엑셀', '문서'],
};

const JOB_STATS_PRESETS: Record<number, JobStatsPreset> = {
  1: {
    baseCount: 10,
    avgCareer: 3.0,
    avgTopik: 3.6,
    avgToeic: 840,
    avgAge: 21.4,
    nationalities: [
      { name: '베트남', count: 4, percent: 40, color: '#18181B' },
      { name: '우즈베키스탄', count: 3, percent: 30, color: '#52525B' },
      { name: '일본', count: 2, percent: 20, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['밝은 고객 응대', '카페 경력 보유 비율 높음', '주말·오후 근무 유연'],
    cautions: ['피크타임 음료 제조 속도', '포스기 용어 숙지 필요'],
  },
  2: {
    baseCount: 10,
    avgCareer: 2.0,
    avgTopik: 2.8,
    avgToeic: 760,
    avgAge: 20.5,
    nationalities: [
      { name: '우즈베키스탄', count: 4, percent: 40, color: '#18181B' },
      { name: '몽골', count: 3, percent: 30, color: '#52525B' },
      { name: '중국', count: 2, percent: 20, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['근태 성실함', '야간·주말 근무 선호', '물류 정리 꼼꼼함'],
    cautions: ['택배·공과금 등 특수 결제 안내 연습 필요'],
  },
  3: {
    baseCount: 10,
    avgCareer: 6.0,
    avgTopik: 4.5,
    avgToeic: 955,
    avgAge: 23.1,
    nationalities: [
      { name: '미국·영미권', count: 5, percent: 50, color: '#18181B' },
      { name: '중국', count: 2, percent: 20, color: '#52525B' },
      { name: '일본', count: 2, percent: 20, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['원어민 수준 외국어', '높은 한국어 이해도', '강의·튜터링 경험'],
    cautions: ['학기 중 시험기간 스케줄 사전 조율 필요'],
  },
  4: {
    baseCount: 10,
    avgCareer: 4.0,
    avgTopik: 4.4,
    avgToeic: 865,
    avgAge: 22.3,
    nationalities: [
      { name: '중국', count: 5, percent: 50, color: '#18181B' },
      { name: '일본', count: 3, percent: 30, color: '#52525B' },
      { name: '베트남', count: 1, percent: 10, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['다국어 관광객 응대', 'K-뷰티 트렌드 이해도 높음', '친화력'],
    cautions: ['면세·텍스리펀 절차 교육 필요', '장시간 서서 근무'],
  },
  5: {
    baseCount: 10,
    avgCareer: 3.0,
    avgTopik: 3.1,
    avgToeic: 810,
    avgAge: 21.8,
    nationalities: [
      { name: '우즈베키스탄', count: 4, percent: 40, color: '#18181B' },
      { name: '몽골', count: 3, percent: 30, color: '#52525B' },
      { name: '네팔·중앙아시아', count: 2, percent: 20, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['영어 메뉴 응대 가능', '체력 및 빠른 홀 회전', '팀워크'],
    cautions: ['주말 저녁 피크타임 집중력 요구'],
  },
  6: {
    baseCount: 10,
    avgCareer: 7.0,
    avgTopik: 5.3,
    avgToeic: 920,
    avgAge: 24.2,
    nationalities: [
      { name: '일본', count: 4, percent: 40, color: '#18181B' },
      { name: '중국', count: 3, percent: 30, color: '#52525B' },
      { name: '베트남', count: 2, percent: 20, color: '#A1A1AA' },
      { name: '기타', count: 1, percent: 10, color: '#E4E4E7' },
    ],
    strengths: ['비즈니스 한국어 능통', 'IT·문서 작업 숙련', '높은 번역 정확도'],
    cautions: ['포트폴리오 또는 간단한 번역 테스트 진행'],
  },
};

const DETAIL_UI_TEXT: Record<
  Lang,
  {
    breadcrumbJobs: string;
    breadcrumbDetail: string;
    breadcrumbStats: string;
    urgent: string;
    defaultJob: string;
    noStatsTitle: string;
    noStatsDesc: string;
    newJobBadge: string;
    statsTitle: string;
    statsSubtitle: string;
    totalAnalysisPrefix: string;
    totalAnalysisReal: string;
    avgCareerLabel: string;
    avgTopikLabel: string;
    avgToeicLabel: string;
    avgAgeTitle: string;
    avgAgeDesc: string;
    nationalityTitle: string;
    strengthTitle: string;
    cautionTitle: string;
    loadingText: string;
  }
> = {
  ko: {
    breadcrumbJobs: '채용정보',
    breadcrumbDetail: '공고 상세',
    breadcrumbStats: '지원자 통계',
    urgent: '급구',
    defaultJob: '채용공고',
    noStatsTitle: '아직 누적된 지원자 통계 정보가 없습니다',
    noStatsDesc: '최근에 새로 등록된 채용공고입니다. 상단의 내 프로필로 간편 지원하기를 누르면 내 스펙이 반영된 지원자 통계가 즉시 생성됩니다.',
    newJobBadge: '신규 등록 공고 · 첫 지원자 모집 중',
    statsTitle: '지원자 통계 및 지원자 정보',
    statsSubtitle: '해당 채용공고에 지원한 지원자들의 평균 정보와 주요 통계를 한눈에 확인할 수 있습니다.',
    totalAnalysisPrefix: '누적 분석 인원',
    totalAnalysisReal: '명 (실시간 지원',
    avgCareerLabel: '평균 경력',
    avgTopikLabel: '평균 TOPIK',
    avgToeicLabel: '평균 TOEIC',
    avgAgeTitle: '평균 나이',
    avgAgeDesc: '지원자들의 평균 나이입니다.',
    nationalityTitle: '국적 구성',
    strengthTitle: '강점',
    cautionTitle: '주의 사항',
    loadingText: '공고 상세 정보를 불러오는 중입니다...',
  },
  en: {
    breadcrumbJobs: 'Jobs',
    breadcrumbDetail: 'Job Detail',
    breadcrumbStats: 'Applicant Stats',
    urgent: 'Urgent',
    defaultJob: 'Job Posting',
    noStatsTitle: 'No applicant statistics available yet',
    noStatsDesc: 'This is a newly registered job posting. Click "Apply with My Profile" above to instantly generate applicant stats.',
    newJobBadge: 'New Posting · Recruiting First Applicants',
    statsTitle: 'Applicant Statistics & Information',
    statsSubtitle: 'Check the average information and key statistics of applicants for this posting at a glance.',
    totalAnalysisPrefix: 'Total Analyzed',
    totalAnalysisReal: 'applicants (Real-time applied',
    avgCareerLabel: 'Avg. Career',
    avgTopikLabel: 'Avg. TOPIK',
    avgToeicLabel: 'Avg. TOEIC',
    avgAgeTitle: 'Avg. Age',
    avgAgeDesc: 'Average age of applicants.',
    nationalityTitle: 'Nationality Breakdown',
    strengthTitle: 'Strengths',
    cautionTitle: 'Cautions',
    loadingText: 'Loading job details...',
  },
  jp: {
    breadcrumbJobs: '求人情報',
    breadcrumbDetail: '求人詳細',
    breadcrumbStats: '応募者統計',
    urgent: '急募',
    defaultJob: '求人広告',
    noStatsTitle: 'まだ蓄積された応募者統計情報がありません',
    noStatsDesc: '最近登録された新規求人です。「マイプロフィールで簡単応募」をクリックすると、あなたのスペックが反映された応募者統計がすぐに生成されます。',
    newJobBadge: '新規登録求人・最初の応募者募集中',
    statsTitle: '応募者統計および応募者情報',
    statsSubtitle: '該当求人に応募した応募者の平均情報と主要統計を一目で確認できます。',
    totalAnalysisPrefix: '累計分析人数',
    totalAnalysisReal: '名（リアルタイム応募',
    avgCareerLabel: '平均経歴',
    avgTopikLabel: '平均TOPIK',
    avgToeicLabel: '平均TOEIC',
    avgAgeTitle: '平均年齢',
    avgAgeDesc: '応募者たちの平均年齢です。',
    nationalityTitle: '国籍構成',
    strengthTitle: '強み',
    cautionTitle: '注意事項',
    loadingText: '求人詳細情報を読み込んでいます...',
  },
  cn: {
    breadcrumbJobs: '招聘信息',
    breadcrumbDetail: '职位详情',
    breadcrumbStats: '应聘者统计',
    urgent: '急招',
    defaultJob: '招聘职位',
    noStatsTitle: '暂无累积的应聘者统计信息',
    noStatsDesc: '这是一条新发布的招聘信息。点击上方的“用我的个人资料快捷应聘”，即可立即生成反映您能力的应聘者统计数据。',
    newJobBadge: '新发布职位 · 正在招募首批应聘者',
    statsTitle: '应聘者统计与信息',
    statsSubtitle: '一目了然地查看该职位应聘者的平均信息和主要统计数据。',
    totalAnalysisPrefix: '累计分析人数',
    totalAnalysisReal: '人（实时应聘',
    avgCareerLabel: '平均经验',
    avgTopikLabel: '平均TOPIK',
    avgToeicLabel: '平均TOEIC',
    avgAgeTitle: '平均年龄',
    avgAgeDesc: '应聘者的平均年龄。',
    nationalityTitle: '国籍构成',
    strengthTitle: '优势',
    cautionTitle: '注意事项',
    loadingText: '正在加载职位详情...',
  },
  vn: {
    breadcrumbJobs: 'Việc làm',
    breadcrumbDetail: 'Chi tiết việc làm',
    breadcrumbStats: 'Thống kê ứng viên',
    urgent: 'Tuyển gấp',
    defaultJob: 'Tin tuyển dụng',
    noStatsTitle: 'Chưa có thông tin thống kê ứng viên',
    noStatsDesc: 'Đây là tin tuyển dụng mới đăng. Nhấp vào "Ứng tuyển nhanh bằng hồ sơ của tôi" ở trên để tạo ngay thống kê ứng viên.',
    newJobBadge: 'Tin mới · Đang tuyển ứng viên đầu tiên',
    statsTitle: 'Thống kê & Thông tin ứng viên',
    statsSubtitle: 'Xem nhanh thông tin trung bình và thống kê chính của các ứng viên đã ứng tuyển.',
    totalAnalysisPrefix: 'Tổng số phân tích',
    totalAnalysisReal: 'người (Đã ứng tuyển trực tiếp',
    avgCareerLabel: 'Kinh nghiệm TB',
    avgTopikLabel: 'TOPIK TB',
    avgToeicLabel: 'TOEIC TB',
    avgAgeTitle: 'Độ tuổi TB',
    avgAgeDesc: 'Độ tuổi trung bình của các ứng viên.',
    nationalityTitle: 'Cơ cấu quốc tịch',
    strengthTitle: 'Thế mạnh',
    cautionTitle: 'Lưu ý',
    loadingText: 'Đang tải chi tiết việc làm...',
  },
};

function parseTopik(text?: string | null): number | null {
  if (!text) return null;
  const match = text.match(/(\d)급/);
  return match ? Number(match[1]) : null;
}

function parseToeic(text?: string | null): number | null {
  if (!text) return null;
  const match = text.match(/(\d{3,4})/);
  return match ? Number(match[1]) : null;
}

// 생년월일로 만 나이 계산 함수
function calculateAge(birthDateString?: string | null): number {
  if (!birthDateString) return 21; // 기본값
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isRelevantCareer(line: string, jobType?: string): boolean {
  if (!jobType) return true;
  const keywords = JOB_TYPE_KEYWORDS[jobType] ?? [jobType];
  const lowerLine = line.toLowerCase();
  return keywords.some((kw) => lowerLine.includes(kw.toLowerCase()));
}

function parseCareerMonths(
  experiences?: string | null,
  jobType?: string
): number {
  if (!experiences || !experiences.trim()) return 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const lines = experiences
    .split('\n')
    .map((l) => l.replace(/^\/\/+/, '').trim())
    .filter(Boolean);

  return lines.reduce((total, line) => {
    if (!isRelevantCareer(line, jobType)) {
      return total;
    }

    const match = line.match(
      /(\d{4})[.-](\d{1,2})\s*[-~]\s*(현재|\d{4}[.-]\d{1,2})/
    );
    if (!match) return total + 1;

    const startYear = Number(match[1]);
    const startMonth = Number(match[2]);

    let endYear = currentYear;
    let endMonth = currentMonth;

    if (match[3] !== '현재') {
      const endParts = match[3].split(/[.-]/);
      endYear = Number(endParts[0]);
      endMonth = Number(endParts[1]);
    }

    const diff = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    return total + Math.max(1, diff);
  }, 0);
}

function getPieSlices(data: NationalityItem[]) {
  let cumulativePercent = 0;
  const cx = 100;
  const cy = 100;
  const r = 90;

  return data.map((item) => {
    const startPercent = cumulativePercent;
    const endPercent = cumulativePercent + item.percent;
    cumulativePercent = endPercent;

    if (item.percent >= 100) {
      return {
        ...item,
        isFullCircle: true,
        pathData: '',
        labelX: cx,
        labelY: cy,
        isDark: true,
      };
    }

    const startAngle = (startPercent / 100) * 360 - 90;
    const endAngle = (endPercent / 100) * 360 - 90;
    const midAngle = (startAngle + endAngle) / 2;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const midRad = (midAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArcFlag = item.percent > 50 ? 1 : 0;
    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const labelX = cx + 56 * Math.cos(midRad);
    const labelY = cy + 56 * Math.sin(midRad);

    return {
      ...item,
      isFullCircle: false,
      pathData,
      labelX,
      labelY,
      isDark: item.percent >= 25,
    };
  });
}

function JobDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const jobId = Number(id);

  const { lang } = useLanguage();
  const dt = DETAIL_UI_TEXT[lang] || DETAIL_UI_TEXT.ko;

  const [job, setJob] = useState<JobDetail | null>(null);
  const [applicants, setApplicants] = useState<ApplicantProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [translatedCache, setTranslatedCache] = useState<Record<string, string>>({});

  const loadJobAndApplicants = useCallback(async () => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    const [{ data: jobData }, { data: appData }] = await Promise.all([
      supabase.from('jobs').select('*').eq('id', jobId).single(),
      supabase
        .from('applications')
        .select('profiles(nationality, topik_level, toeic_score, experiences, birth_date)')
        .eq('job_id', jobId),
    ]);

    if (jobData) setJob(jobData);

    if (appData) {
      const parsed = appData
        .map((row: { profiles: ApplicantProfile | ApplicantProfile[] | null }) =>
          Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
        )
        .filter((p): p is ApplicantProfile => Boolean(p));
      setApplicants(parsed);
    }

    setLoading(false);
  }, [jobId]);

  useEffect(() => {
    loadJobAndApplicants();
  }, [loadJobAndApplicants]);

  useEffect(() => {
    async function translateDynamicFields() {
      if (lang === 'ko' || !job) return;
      const newCache: Record<string, string> = {};
      newCache[job.company_name] = await translateText(job.company_name, lang);
      newCache[job.title] = await translateText(job.title, lang);
      newCache[job.location] = await translateText(job.location, lang);
      newCache[job.schedule] = await translateText(job.schedule, lang);
      newCache[job.job_type] = await translateText(job.job_type, lang);
      newCache[job.education] = await translateText(job.education, lang);
      newCache[job.language_level] = await translateText(job.language_level, lang);
      setTranslatedCache(newCache);
    }
    translateDynamicFields();
  }, [lang, job]);

  const tr = (text: string) => (lang === 'ko' ? text : translatedCache[text] || text);

  const computeMergedStats = () => {
    const preset = JOB_STATS_PRESETS[jobId] || null;
    const realCount = applicants.length;

    if (!preset && realCount === 0) {
      return null;
    }

    const baseCount = preset ? preset.baseCount : 0;
    const totalCount = baseCount + realCount;

    const realCareerSum = applicants.reduce(
      (sum, a) => sum + parseCareerMonths(a.experiences, job?.job_type),
      0
    );
    const avgCareer = (
      ((preset ? preset.avgCareer * baseCount : 0) + realCareerSum) /
      totalCount
    ).toFixed(1);

    const validTopiks = applicants
      .map((a) => parseTopik(a.topik_level))
      .filter((v): v is number => v !== null);
    const topikWeight = baseCount + validTopiks.length;
    const avgTopik =
      topikWeight > 0
        ? (
            ((preset ? preset.avgTopik * baseCount : 0) +
              validTopiks.reduce((s, v) => s + v, 0)) /
            topikWeight
          ).toFixed(2)
        : lang === 'ko' ? '미응시' : 'N/A';

    const validToeics = applicants
      .map((a) => parseToeic(a.toeic_score))
      .filter((v): v is number => v !== null);
    const toeicWeight = baseCount + validToeics.length;
    const avgToeic =
      toeicWeight > 0
        ? Math.round(
            ((preset ? preset.avgToeic * baseCount : 0) +
              validToeics.reduce((s, v) => s + v, 0)) /
              toeicWeight
          ).toString()
        : lang === 'ko' ? '미응시' : 'N/A';

    // 실제 지원자들의 생년월일을 바탕으로 나이 계산 반영
    const realAgeSum = applicants.reduce(
      (sum, a) => sum + calculateAge(a.birth_date),
      0
    );
    const avgAge = (
      ((preset ? preset.avgAge * baseCount : 0) + realAgeSum) /
      totalCount
    ).toFixed(1);

    const natMap = new Map<string, number>();
    if (preset) {
      preset.nationalities.forEach((n) => natMap.set(n.name, n.count));
    }
    applicants.forEach((a) => {
      const nat = a.nationality?.trim() || (lang === 'ko' ? '기타' : 'Other');
      natMap.set(nat, (natMap.get(nat) || 0) + 1);
    });

    const sortedNats = Array.from(natMap.entries()).sort((a, b) => b[1] - a[1]);
    let percentSum = 0;
    const nationalities: NationalityItem[] = sortedNats.map(([name, count], idx) => {
      const isLast = idx === sortedNats.length - 1;
      const rawPercent = Math.round((count / totalCount) * 100);
      const percent = isLast ? Math.max(0, 100 - percentSum) : rawPercent;
      percentSum += percent;

      return {
        name,
        count,
        percent,
        color: CHART_COLORS[idx % CHART_COLORS.length],
      };
    });

    return {
      totalCount,
      realCount,
      avgCareer,
      avgTopik,
      avgToeic,
      avgAge,
      nationalities,
      strengths: preset
        ? preset.strengths
        : lang === 'ko' ? ['신규 지원자 등록 완료', '성실한 근무 의지', '한국어 소통 가능'] : ['New applicant registered', 'Diligent work ethic', 'Korean communication available'],
      cautions: preset
        ? preset.cautions
        : lang === 'ko' ? ['초기 모집 단계로 추가 지원자 데이터 수집 중'] : ['Collecting additional applicant data in early recruitment phase'],
    };
  };

  const mergedStats = computeMergedStats();
  const pieSlices = mergedStats ? getPieSlices(mergedStats.nationalities) : [];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>{dt.loadingText}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          {dt.breadcrumbJobs}
        </Link>
        <span>&gt;</span>
        <span>{job ? tr(job.company_name) : `${dt.defaultJob} #${jobId}`}</span>
        <span>&gt;</span>
        <span className="text-foreground font-medium">{dt.breadcrumbStats}</span>
      </div>

      <Card>
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {job?.is_urgent && <Badge variant="destructive">{dt.urgent}</Badge>}
              <Badge variant="secondary">{job ? tr(job.job_type) : dt.defaultJob}</Badge>
              <Badge variant="outline">{job ? tr(job.education) : '학력무관'}</Badge>
              <Badge variant="outline">{job ? tr(job.language_level) : 'TOPIK 무관'}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>{job ? tr(job.company_name) : `${dt.defaultJob} #${jobId}`}</span>
              </p>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                {job ? tr(job.title) : '채용공고 상세 정보'}
              </h1>
            </div>

            {job && (
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <span className="font-bold text-sm text-foreground">
                  {formatWage(job.hourly_wage, lang)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {tr(job.schedule)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {tr(job.location)}
                </span>
              </div>
            )}
          </div>

          <div className="shrink-0">
            <ApplyJobButton
              jobId={jobId || 1}
              onApplied={loadJobAndApplicants}
            />
          </div>
        </CardContent>
      </Card>

      {!mergedStats ? (
        <Card className="border-dashed">
          <CardContent className="py-16 px-6 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold">
              {dt.noStatsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              {dt.noStatsDesc}
            </p>
            <div className="pt-2">
              <Badge variant="secondary">{dt.newJobBadge}</Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {dt.statsTitle}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {dt.statsSubtitle}
              </p>
            </div>

            <Badge variant="secondary" className="w-fit gap-1.5 py-1 px-3">
              <Users className="w-3.5 h-3.5" />
              <span>
                {dt.totalAnalysisPrefix} {mergedStats.totalCount}명
                {mergedStats.realCount > 0 && ` ${dt.totalAnalysisReal} ${mergedStats.realCount}명 반영)`}
              </span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {dt.avgCareerLabel}
                  </p>
                  <p className="mt-1">
                    <span className="text-3xl font-extrabold">{mergedStats.avgCareer}</span>
                    <span className="text-base font-bold ml-0.5">{lang === 'ko' ? '개월' : 'mo'}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{dt.avgTopikLabel}</p>
                  <p className="mt-1">
                    <span className="text-3xl font-extrabold">{mergedStats.avgTopik}</span>
                    {mergedStats.avgTopik !== '미응시' && mergedStats.avgTopik !== 'N/A' && (
                      <span className="text-base font-bold ml-0.5">{lang === 'ko' ? '급' : 'Lv'}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{dt.avgToeicLabel}</p>
                  <p className="mt-1">
                    <span className="text-3xl font-extrabold">{mergedStats.avgToeic}</span>
                    {mergedStats.avgToeic !== '미응시' && mergedStats.avgToeic !== 'N/A' && (
                      <span className="text-base font-bold ml-0.5">{lang === 'ko' ? '점' : 'pt'}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <CoverLetterModal jobId={jobId} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Card className="lg:col-span-4 flex flex-col">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{dt.avgAgeTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center py-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <p>
                      <span className="text-4xl font-extrabold">{mergedStats.avgAge}</span>
                      <span className="text-lg font-bold ml-0.5">{lang === 'ko' ? '세' : ''}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dt.avgAgeDesc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-8">
              <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{dt.nationalityTitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center justify-around gap-8 py-6">
                <svg viewBox="0 0 200 200" className="w-48 h-48 shrink-0">
                  {pieSlices.map((slice) =>
                    slice.isFullCircle ? (
                      <g key={slice.name}>
                        <circle cx={100} cy={100} r={90} fill={slice.color} />
                        <text
                          x={100}
                          y={100}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffffff"
                          fontSize="13"
                          fontWeight="600"
                        >
                          100%
                        </text>
                      </g>
                    ) : (
                      <g key={slice.name}>
                        <path
                          d={slice.pathData}
                          fill={slice.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        {slice.percent >= 8 && (
                          <text
                            x={slice.labelX}
                            y={slice.labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={slice.isDark ? '#ffffff' : '#18181B'}
                            fontSize="11"
                            fontWeight="600"
                          >
                            {slice.percent}%
                          </text>
                        )}
                      </g>
                    )
                  )}
                </svg>

                <div className="w-full max-w-xs space-y-3">
                  {mergedStats.nationalities.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {item.count}명 ({item.percent}%)
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Star className="w-4 h-4" />
                  <span>{dt.strengthTitle}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mergedStats.strengths.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:border-l md:border-border md:pl-6">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{dt.cautionTitle}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mergedStats.cautions.map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>공고 페이지를 불러오는 중입니다...</span>
        </div>
      }
    >
      <JobDetailContent params={params} />
    </Suspense>
  );
}