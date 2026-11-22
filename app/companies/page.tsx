'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Search,
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage, Lang } from '@/src/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CompanyItem {
  id: number;
  name: string;
  industry: string;
  location: string;
  employeeCount: string;
  foreignRatio: string;
  supportedVisas: string[];
  minTopik: string;
  avgSalary: string;
  description: string;
  benefits: string[];
  isCertified?: boolean;
}

const COMPANIES_DATA: CompanyItem[] = [
  {
    id: 1,
    name: '판교 글로벌 IT 스타트업 (주)브릿지테크',
    industry: 'IT·소프트웨어',
    location: '경기 성남시 분당구 판교역',
    employeeCount: '85명',
    foreignRatio: '외국인 재직자 22%',
    supportedVisas: ['D-2 (인턴)', 'D-10', 'E-7-1'],
    minTopik: 'TOPIK 4급 이상',
    avgSalary: '신입 연봉 3,800만~4,500만 원',
    description:
      '다국어 AI 서비스 및 해외 현지화 플랫폼을 개발하는 기업으로, 외국인 개발자·데이터 검수·해외 PM 채용과 E-7 비자 전환을 적극 지원합니다.',
    benefits: ['E-7 비자 전환 행정 지원', '유연근무·재택 병행', '한국어 교육비 지원'],
    isCertified: true,
  },
  {
    id: 2,
    name: '강남 글로벌 어학원 & 에듀테크',
    industry: '교육·통번역',
    location: '서울 강남구 강남역',
    employeeCount: '120명',
    foreignRatio: '외국인 재직자 45%',
    supportedVisas: ['D-2 (시간제)', 'D-4', 'E-2', 'E-7'],
    minTopik: 'TOPIK 3급 이상',
    avgSalary: '시급 15,000원 / 정규 3,400만 원',
    description:
      '원어민 회화 튜터, 글로벌 콘텐츠 번역 및 유학생 진로 상담 매니저를 상시 채용하는 교육 전문 기업입니다.',
    benefits: ['시간제 취업허가서 즉시 발급', '방학 중 풀타임 전환 가능', '성과급 지급'],
    isCertified: true,
  },
  {
    id: 3,
    name: '명동 K-뷰티 글로벌 플래그십',
    industry: '유통·해외영업',
    location: '서울 중구 명동역',
    employeeCount: '210명',
    foreignRatio: '외국인 재직자 38%',
    supportedVisas: ['D-2 (시간제)', 'D-10', 'E-7-1'],
    minTopik: 'TOPIK 4급 이상',
    avgSalary: '시급 12,500원 / 해외영업 3,600만 원',
    description:
      '일본·중국·동남아 관광객 응대 스태프부터 본사 글로벌 바이어 수출 영업 담당자까지 단계별 커리어 전환을 지원합니다.',
    benefits: ['우수 아르바이트생 정규직 전환', '다국어 수당 별도 지급', '4대보험 완비'],
    isCertified: true,
  },
  {
    id: 4,
    name: '성수 크로스보더 무역상사',
    industry: '무역·물류',
    location: '서울 성동구 성수역',
    employeeCount: '54명',
    foreignRatio: '외국인 재직자 30%',
    supportedVisas: ['D-10', 'E-7-1'],
    minTopik: 'TOPIK 5급 이상',
    avgSalary: '신입 연봉 3,700만~4,200만 원',
    description:
      '중앙아시아·베트남·일본 B2B 수출입 통관 및 현지 바이어 커뮤니케이션을 담당할 유학생 출신 인재를 우대 채용합니다.',
    benefits: ['해외영업 전문인력(E-7) 스폰서', '출장비 및 식대 전액 지원', '명절 상여금'],
    isCertified: false,
  },
];

const UI_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allFilter: string;
    certifiedBadge: string;
    visaLabel: string;
    topikLabel: string;
    salaryLabel: string;
    viewJobsBtn: string;
  }
> = {
  ko: {
    title: '기업 정보 (외국인 채용 인증 기업)',
    subtitle:
      '외국인 유학생 채용 경험이 풍부하고 취업비자(D-10·E-7) 전환 및 시간제 취업허가를 지원하는 기업 정보입니다.',
    searchPlaceholder: '기업명, 업종, 비자(예: E-7, D-2) 검색...',
    allFilter: '전체',
    certifiedBadge: '비자 지원 인증기업',
    visaLabel: '지원 가능 비자',
    topikLabel: '권장 어학',
    salaryLabel: '급여 수준',
    viewJobsBtn: '채용공고 보러가기',
  },
  en: {
    title: 'Company Directory (Foreign-Friendly Employers)',
    subtitle:
      'Verified companies experienced in hiring international students and supporting D-2, D-10, and E-7 visa sponsorship.',
    searchPlaceholder: 'Search company, industry, or visa (e.g., E-7, D-2)...',
    allFilter: 'All',
    certifiedBadge: 'Visa Support Verified',
    visaLabel: 'Supported Visas',
    topikLabel: 'Required Language',
    salaryLabel: 'Compensation',
    viewJobsBtn: 'View Open Jobs',
  },
  jp: {
    title: '企業情報（外国人採用認証企業）',
    subtitle:
      '外国人留学生の採用実績が豊富で、就労ビザ（D-10・E-7）変更や資格外活動許可を支援する企業一覧です。',
    searchPlaceholder: '企業名、業種、ビザ（例：E-7、D-2）で検索...',
    allFilter: 'すべて',
    certifiedBadge: 'ビザ支援認証企業',
    visaLabel: '対応ビザ',
    topikLabel: '推奨語学力',
    salaryLabel: '給与水準',
    viewJobsBtn: '求人を見る',
  },
  cn: {
    title: '企业信息（外国人招聘认证企业）',
    subtitle:
      '拥有丰富留学生招聘经验，并支持打工许可及就业签证（D-10·E-7）转换的优质企业信息。',
    searchPlaceholder: '搜索企业名称、行业、签证（如 E-7, D-2）...',
    allFilter: '全部',
    certifiedBadge: '签证支持认证企业',
    visaLabel: '支持签证类型',
    topikLabel: '语言要求',
    salaryLabel: '薪资水平',
    viewJobsBtn: '查看招聘职位',
  },
  vn: {
    title: 'Thông tin doanh nghiệp (Tuyển dụng người nước ngoài)',
    subtitle:
      'Danh sách các doanh nghiệp có kinh nghiệm tuyển du học sinh và hỗ trợ giấy phép làm thêm, chuyển đổi visa D-10, E-7.',
    searchPlaceholder: 'Tìm tên công ty, ngành nghề, visa (VD: E-7, D-2)...',
    allFilter: 'Tất cả',
    certifiedBadge: 'Chứng nhận hỗ trợ Visa',
    visaLabel: 'Visa hỗ trợ',
    topikLabel: 'Yêu cầu tiếng Hàn',
    salaryLabel: 'Mức lương',
    viewJobsBtn: 'Xem tin tuyển dụng',
  },
};

export default function CompaniesPage() {
  const { lang } = useLanguage();
  const t = UI_TEXT[lang] || UI_TEXT.ko;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisa, setSelectedVisa] = useState<string>('ALL');

  const filteredCompanies = COMPANIES_DATA.filter((comp) => {
    const matchesQuery =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.supportedVisas.some((v) =>
        v.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesVisa =
      selectedVisa === 'ALL' ||
      comp.supportedVisas.some((v) => v.includes(selectedVisa));

    return matchesQuery && matchesVisa;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
      </div>

      {/* 검색 및 비자별 필터 */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['ALL', 'D-2', 'D-10', 'E-7'].map((visa) => (
              <Button
                key={visa}
                size="sm"
                variant={selectedVisa === visa ? 'default' : 'outline'}
                onClick={() => setSelectedVisa(visa)}
              >
                {visa === 'ALL' ? t.allFilter : `${visa} 비자`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 기업 리스트 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{company.industry}</Badge>
                    {company.isCertified && (
                      <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.certifiedBadge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg pt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{company.name}</span>
                  </CardTitle>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {company.employeeCount} ({company.foreignRatio})
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {company.description}
              </p>

              <div className="p-3 rounded-lg bg-muted/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    {t.visaLabel}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {company.supportedVisas.map((v) => (
                      <Badge key={v} variant="outline" className="bg-background">
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {t.topikLabel}
                  </span>
                  <span className="font-semibold">{company.minTopik}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-medium flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {t.salaryLabel}
                  </span>
                  <span className="font-semibold">{company.avgSalary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {company.benefits.map((b) => (
                  <Badge key={b} variant="secondary" className="text-[11px]">
                    # {b}
                  </Badge>
                ))}
              </div>

              <Link href="/" className="block pt-1">
                <Button variant="outline" className="w-full gap-1.5" size="sm">
                  <span>{t.viewJobsBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}