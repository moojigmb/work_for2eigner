'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Clock,
  Building2,
  Sparkles,
  Plus,
  CheckCircle2,
  Award,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { useLanguage } from '@/src/LanguageContext';
import { JOB_UI_TEXT, formatWage, translateText } from '@/src/lib/jobTranslator';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface JobPost {
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

function extractTopikGrade(text?: string | null): number | null {
  if (!text) return null;
  const match = text.match(/(\d)급/);
  return match ? Number(match[1]) : null;
}

export default function HomePage() {
  const { lang } = useLanguage();
  const t = JOB_UI_TEXT[lang] || JOB_UI_TEXT.ko;

  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 동적 번역 캐시 상태 (회사명, 제목, 스케줄, 위치 등)
  const [translatedCache, setTranslatedCache] = useState<Record<string, string>>({});

  const [userTopikText, setUserTopikText] = useState<string | null>(null);
  const [userTopikGrade, setUserTopikGrade] = useState<number | null>(null);
  const [onlyMatchedJobs, setOnlyMatchedJobs] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchMode, setSearchMode] = useState('filter');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedEducation, setSelectedEducation] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [companyKeyword, setCompanyKeyword] = useState('');

  useEffect(() => {
    async function fetchInitialData() {
      const { data: jobList } = await supabase
        .from('jobs')
        .select('*')
        .order('id', { ascending: false });

      if (jobList) {
        setJobs(jobList);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('topik_level')
          .eq('id', user.id)
          .single();

        if (profile?.topik_level) {
          setUserTopikText(profile.topik_level);
          setUserTopikGrade(extractTopikGrade(profile.topik_level));
        }
      }

      setLoading(false);
    }

    fetchInitialData();
  }, []);

  // 언어가 바뀔 때마다 동적 텍스트(공고 제목, 회사명 등) 번역 사전 업데이트
  useEffect(() => {
    async function translateDynamicFields() {
      if (lang === 'ko' || jobs.length === 0) return;
      const newCache: Record<string, string> = {};
      for (const job of jobs) {
        if (!newCache[job.title]) {
          newCache[job.title] = await translateText(job.title, lang);
        }
        if (!newCache[job.company_name]) {
          newCache[job.company_name] = await translateText(job.company_name, lang);
        }
        if (!newCache[job.schedule]) {
          newCache[job.schedule] = await translateText(job.schedule, lang);
        }
        if (!newCache[job.location]) {
          newCache[job.location] = await translateText(job.location, lang);
        }
        if (!newCache[job.job_type]) {
          newCache[job.job_type] = await translateText(job.job_type, lang);
        }
        if (!newCache[job.education]) {
          newCache[job.education] = await translateText(job.education, lang);
        }
        if (!newCache[job.language_level]) {
          newCache[job.language_level] = await translateText(job.language_level, lang);
        }
      }
      setTranslatedCache(newCache);
    }
    translateDynamicFields();
  }, [lang, jobs]);

  const tr = (text: string) => (lang === 'ko' ? text : translatedCache[text] || text);

  const getMatchStatus = (reqLanguage: string) => {
    if (userTopikGrade === null) return null;
    const reqGrade = extractTopikGrade(reqLanguage);
    if (reqGrade === null) return 'fit';
    if (userTopikGrade > reqGrade) return 'strong';
    if (userTopikGrade === reqGrade) return 'fit';
    return 'low';
  };

  const filteredJobs = jobs.filter((job) => {
    if (onlyMatchedJobs && userTopikGrade !== null) {
      const status = getMatchStatus(job.language_level);
      if (status !== 'strong' && status !== 'fit') return false;
    }

    if (searchMode === 'company') {
      const keyword = companyKeyword.toLowerCase();
      return (
        job.company_name.toLowerCase().includes(keyword) ||
        job.title.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword)
      );
    }

    const matchJob = selectedJobType === 'all' || job.job_type === selectedJobType;
    const matchEdu = selectedEducation === 'all' || job.education === selectedEducation;
    const matchLang = selectedLanguage === 'all' || job.language_level.includes(selectedLanguage);
    return matchJob && matchEdu && matchLang;
  });

  const banner = t.banners[currentBanner] || t.banners[0];

  return (
    <div className="space-y-6">
      {/* 배너 영역 */}
      <Card className="relative bg-primary text-primary-foreground border-0 overflow-hidden">
        <CardContent className="py-10 px-14 text-center flex flex-col items-center justify-center space-y-3">
          <Badge variant="secondary" className="gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {banner.badge}
          </Badge>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            {banner.title}
          </h1>
          <p className="text-xs sm:text-sm text-primary-foreground/80 max-w-xl">
            {banner.description}
          </p>

          <div className="pt-2 flex items-center gap-2">
            {t.banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentBanner(idx)}
                aria-label={`${idx + 1}번 배너`}
                className={`h-2 rounded-full transition-all ${
                  currentBanner === idx
                    ? 'w-6 bg-primary-foreground'
                    : 'w-2 bg-primary-foreground/35'
                }`}
              />
            ))}
          </div>
        </CardContent>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentBanner((prev) => (prev === 0 ? t.banners.length - 1 : prev - 1))
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentBanner((prev) => (prev === t.banners.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </Card>

      {/* 검색 및 필터 영역 */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Tabs value={searchMode} onValueChange={setSearchMode} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <TabsList>
                  <TabsTrigger value="filter">{t.filterTab}</TabsTrigger>
                  <TabsTrigger value="company">{t.companyTab}</TabsTrigger>
                </TabsList>

                {userTopikGrade !== null ? (
                  <Button
                    type="button"
                    size="sm"
                    variant={onlyMatchedJobs ? 'default' : 'outline'}
                    onClick={() => setOnlyMatchedJobs(!onlyMatchedJobs)}
                    className="gap-1.5 text-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>내 스펙({userTopikText}) 맞춤 공고만 보기</span>
                  </Button>
                ) : (
                  <Link
                    href="/profile"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'text-xs text-muted-foreground gap-1.5'
                    )}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>프로필에 TOPIK 등록하고 합격 예측 받기</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3">
                <span className="text-xs text-muted-foreground">
                  {t.totalPrefix} <strong className="text-foreground">{filteredJobs.length}</strong>{t.totalSuffix}
                </span>
                <Link
                  href="/jobs/new"
                  className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addJobBtn}</span>
                </Link>
              </div>
            </div>

            {/* 조건 필터 영역 */}
            <TabsContent value="filter" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 직종 필터 */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-bold text-muted-foreground shrink-0 w-12">
                    {lang === 'ko' ? '직종' : lang === 'en' ? 'Role' : lang === 'jp' ? '職種' : lang === 'cn' ? '职位' : 'Ngành'}
                  </Label>
                  <Select
                    value={selectedJobType}
                    onValueChange={(val) => val && setSelectedJobType(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">{t.all}</SelectItem>
                      <SelectItem value="카페/음료">{tr('카페/음료')}</SelectItem>
                      <SelectItem value="편의점/마트">편의점/마트</SelectItem>
                      <SelectItem value="매장관리/판매">{tr('매장관리/판매')}</SelectItem>
                      <SelectItem value="음식점/서빙">{tr('음식점/서빙')}</SelectItem>
                      <SelectItem value="호텔/리조트">호텔/리조트</SelectItem>
                      <SelectItem value="교육/강사">{tr('교육/강사')}</SelectItem>
                      <SelectItem value="사무/번역">{tr('사무/번역')}</SelectItem>
                      <SelectItem value="물류/창고">물류/창고</SelectItem>
                      <SelectItem value="IT/개발">IT/개발</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 학력 필터 */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-bold text-muted-foreground shrink-0 w-12">
                    {lang === 'ko' ? '학력' : lang === 'en' ? 'Edu' : lang === 'jp' ? '学歴' : lang === 'cn' ? '学历' : 'Học vấn'}
                  </Label>
                  <Select
                    value={selectedEducation}
                    onValueChange={(val) => val && setSelectedEducation(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">{t.all}</SelectItem>
                      <SelectItem value="학력무관">{tr('학력무관')}</SelectItem>
                      <SelectItem value="고등학교 졸업">고등학교 졸업</SelectItem>
                      <SelectItem value="전문대 재학/졸업">전문대 재학/졸업</SelectItem>
                      <SelectItem value="대학교 재학">{tr('대학교 재학')}</SelectItem>
                      <SelectItem value="대학교 졸업">대학교 졸업</SelectItem>
                      <SelectItem value="대학원생">대학원생</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 어학(TOPIK) 필터 */}
                <div className="flex items-center gap-2">
                  <Label className="text-xs font-bold text-muted-foreground shrink-0 w-12">
                    {lang === 'ko' ? '어학' : lang === 'en' ? 'Lang' : lang === 'jp' ? '語学' : lang === 'cn' ? '语言' : 'Ngôn ngữ'}
                  </Label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={(val) => val && setSelectedLanguage(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">{t.all}</SelectItem>
                      <SelectItem value="TOPIK 무관">TOPIK 무관</SelectItem>
                      <SelectItem value="TOPIK 1급 이상">TOPIK 1급 이상</SelectItem>
                      <SelectItem value="TOPIK 2급 이상">{tr('TOPIK 2급 이상')}</SelectItem>
                      <SelectItem value="TOPIK 3급 이상">{tr('TOPIK 3급 이상')}</SelectItem>
                      <SelectItem value="TOPIK 4급 이상">{tr('TOPIK 4급 이상')}</SelectItem>
                      <SelectItem value="TOPIK 5급 이상">{tr('TOPIK 5급 이상')}</SelectItem>
                      <SelectItem value="TOPIK 6급">TOPIK 6급</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="company" className="mt-0">
              <div className="flex items-center gap-2">
                <Label className="text-xs font-bold text-muted-foreground shrink-0 w-20">
                  {lang === 'ko' ? '기업/지역' : lang === 'en' ? 'Keyword' : lang === 'jp' ? '企業・地域' : lang === 'cn' ? '企业/地区' : 'Từ khóa'}
                </Label>
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    value={companyKeyword}
                    onChange={(e) => setCompanyKeyword(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 채용 공고 목록 */}
      {loading ? (
        <div className="py-16 flex items-center justify-center text-sm text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>채용공고를 불러오는 중입니다...</span>
        </div>
      ) : filteredJobs.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <p className="text-sm text-muted-foreground">{t.noJobs}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedJobType('all');
              setSelectedEducation('all');
              setSelectedLanguage('all');
              setCompanyKeyword('');
              setOnlyMatchedJobs(false);
            }}
          >
            {t.resetFilter}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const matchStatus = getMatchStatus(job.language_level);

            return (
              <Card
                key={job.id}
                className={cn(
                  'flex flex-col justify-between hover:shadow-md transition-shadow',
                  matchStatus === 'strong' && 'border-emerald-500/50'
                )}
              >
                <CardHeader className="pb-3 space-y-2.5">
                  {(matchStatus === 'strong' || matchStatus === 'fit' || job.is_urgent) && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {matchStatus === 'strong' && (
                        <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px] gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {t.strongMatch}
                        </Badge>
                      )}
                      {matchStatus === 'fit' && (
                        <Badge
                          variant="secondary"
                          className="text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {t.goodMatch}
                        </Badge>
                      )}
                      {job.is_urgent && (
                        <Badge variant="destructive" className="text-[10px]">
                          {t.urgent}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <CardDescription className="text-xs font-medium truncate">
                        {tr(job.company_name)}
                      </CardDescription>
                      <CardTitle className="text-base leading-snug line-clamp-1 mt-0.5">
                        {tr(job.title)}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pb-4">
                  <div className="rounded-lg bg-muted/60 p-3 space-y-1.5">
                    <p className="text-sm font-bold text-foreground">
                      {formatWage(job.hourly_wage, lang)}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{tr(job.schedule)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{tr(job.location)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{tr(job.job_type)}</Badge>
                    <Badge variant="outline">{tr(job.education)}</Badge>
                    <Badge variant="outline">{tr(job.language_level)}</Badge>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Link
                    href={`/jobs/${job.id}`}
                    className={cn(
                      buttonVariants({ variant: 'secondary' }),
                      'w-full font-semibold'
                    )}
                  >
                    {t.viewDetails}
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}