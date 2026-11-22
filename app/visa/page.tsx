'use client';

import { useState } from 'react';
import {
  FileCheck2,
  Clock,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useLanguage, Lang } from '@/src/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const UI_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    calcTitle: string;
    calcDesc: string;
    selectVisa: string;
    selectTopik: string;
    allowedHoursLabel: string;
    permitRequiredLabel: string;
    guideTitle: string;
  }
> = {
  ko: {
    title: '비자 정보 및 체류자격 가이드',
    subtitle:
      '유학생 체류자격(D-2·D-4)별 법정 허용 근로시간을 확인하고, 졸업 후 구직(D-10)·취업비자(E-7) 전환 요건을 한눈에 비교하세요.',
    calcTitle: '내 비자·어학 조건 자가진단 (법정 근로시간 계산기)',
    calcDesc: '현재 보유한 비자와 TOPIK 등급을 선택하면 허용 근무시간과 행정 절차를 안내합니다.',
    selectVisa: '1. 현재 체류자격 선택',
    selectTopik: '2. 보유 TOPIK 등급 선택',
    allowedHoursLabel: '학기 중 주당 허용 근로시간',
    permitRequiredLabel: '필수 행정 절차',
    guideTitle: '체류자격별 취업·아르바이트 핵심 요건',
  },
  en: {
    title: 'Visa & Stay Status Guide',
    subtitle:
      'Check legal working hours for student visas (D-2, D-4) and compare requirements for D-10 job-seeking and E-7 work visas.',
    calcTitle: 'Visa & Language Self-Check (Legal Working Hours Calculator)',
    calcDesc: 'Select your current visa and TOPIK level to see allowed hours and required permits.',
    selectVisa: '1. Select Your Visa Type',
    selectTopik: '2. Select Your TOPIK Level',
    allowedHoursLabel: 'Allowed Weekly Hours (Semester)',
    permitRequiredLabel: 'Required Procedure',
    guideTitle: 'Key Employment Requirements by Visa Type',
  },
  jp: {
    title: 'ビザ情報および在留資格ガイド',
    subtitle:
      '留学生の在留資格（D-2・D-4）別の法定労働時間を確認し、卒業後の求職（D-10）・就労ビザ（E-7）変更要件を比較できます。',
    calcTitle: 'ビザ・語学条件セルフ診断（法定労働時間計算）',
    calcDesc: '現在のビザとTOPIK級を選択すると、許可される勤務時間と手続きを案内します。',
    selectVisa: '1. 現在の在留資格を選択',
    selectTopik: '2. 保有TOPIK級を選択',
    allowedHoursLabel: '学期中の週間許可労働時間',
    permitRequiredLabel: '必須行政手続き',
    guideTitle: '在留資格別の就労・アルバイト要件',
  },
  cn: {
    title: '签证信息与居留资格指南',
    subtitle:
      '查询留学生签证（D-2·D-4）法定允许打工时间，并对比毕业后求职（D-10）及就业签证（E-7）转换条件。',
    calcTitle: '签证与语言条件自测（法定打工时间计算器）',
    calcDesc: '选择当前持有的签证和TOPIK等级，即可查看允许工作时间及所需手续。',
    selectVisa: '1. 选择当前签证类型',
    selectTopik: '2. 选择持有TOPIK等级',
    allowedHoursLabel: '学期内每周允许工作时间',
    permitRequiredLabel: '必需行政手续',
    guideTitle: '各签证类型就业与兼职核心条件',
  },
  vn: {
    title: 'Thông tin Visa & Hướng dẫn tư cách lưu trú',
    subtitle:
      'Kiểm tra giờ làm thêm hợp pháp theo diện visa (D-2, D-4) và điều kiện chuyển đổi sang visa tìm việc (D-10), visa lao động (E-7).',
    calcTitle: 'Tự kiểm tra điều kiện Visa & Tiếng Hàn',
    calcDesc: 'Chọn loại visa hiện tại và cấp độ TOPIK để xem số giờ làm việc được phép.',
    selectVisa: '1. Chọn loại Visa hiện tại',
    selectTopik: '2. Chọn cấp độ TOPIK',
    allowedHoursLabel: 'Số giờ làm việc/tuần (Trong kỳ học)',
    permitRequiredLabel: 'Thủ tục bắt buộc',
    guideTitle: 'Điều kiện làm việc cốt lõi theo từng loại Visa',
  },
};

export default function VisaInfoPage() {
  const { lang } = useLanguage();
  const t = UI_TEXT[lang] || UI_TEXT.ko;

  const [visaType, setVisaType] = useState<'D-2-UG' | 'D-2-GRAD' | 'D-4' | 'D-10'>('D-2-UG');
  const [hasTopik, setHasTopik] = useState<boolean>(true);

  const getVisaResult = () => {
    if (visaType === 'D-4') {
      return {
        hours: hasTopik ? '주 20시간 이내 (입국 6개월 경과 후)' : '주 10시간 이내 (입국 6개월 경과 후)',
        weekend: '주말·공휴일 무제한 적용 제외 (총 시간 내 근무)',
        procedure: '어학당 출석률 90% 이상 + 출입국사무소 시간제 취업허가 필수',
      };
    }
    if (visaType === 'D-2-UG') {
      return {
        hours: hasTopik ? '주 25시간 이내 (TOPIK 3급 이상 충족)' : '주 10시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik ? '주말·공휴일·방학 중 무제한 근무 가능' : '주말·방학 포함 엄격 제한',
        procedure: '직전 학기 평균 학점 C학점(2.0) 이상 + 대학 국제처 확인 및 시간제 취업허가',
      };
    }
    if (visaType === 'D-2-GRAD') {
      return {
        hours: hasTopik ? '주 30시간 이내 (TOPIK 4급 이상 충족)' : '주 15시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik ? '주말·공휴일·방학 중 무제한 근무 가능' : '주말·방학 포함 시간 제한',
        procedure: '대학 국제처 추천서 + 출입국사무소 시간제 취업허가 사전 신청',
      };
    }
    return {
      hours: '인턴십(수습) 계약 시 풀타임 근무 가능',
      weekend: '단순 노무·일반 아르바이트 제한 (전공 연계 인턴 허용)',
      procedure: '인턴 개시일로부터 15일 이내 출입국사무소 연수개시 신고 필수',
    };
  };

  const result = getVisaResult();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.subtitle}</p>
      </div>

      {/* 비자 근로시간 자가진단 카드 */}
      <Card className="border-primary/20">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-primary" />
            <span>{t.calcTitle}</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground">{t.calcDesc}</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 비자 선택 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground">{t.selectVisa}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={visaType === 'D-2-UG' ? 'default' : 'outline'}
                  onClick={() => setVisaType('D-2-UG')}
                >
                  D-2 (학부 유학)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={visaType === 'D-2-GRAD' ? 'default' : 'outline'}
                  onClick={() => setVisaType('D-2-GRAD')}
                >
                  D-2 (석·박사)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={visaType === 'D-4' ? 'default' : 'outline'}
                  onClick={() => setVisaType('D-4')}
                >
                  D-4 (어학연수)
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={visaType === 'D-10' ? 'default' : 'outline'}
                  onClick={() => setVisaType('D-10')}
                >
                  D-10 (졸업·구직)
                </Button>
              </div>
            </div>

            {/* 어학 기준 충족 여부 */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground">{t.selectTopik}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={hasTopik ? 'default' : 'outline'}
                  onClick={() => setHasTopik(true)}
                >
                  TOPIK 3~4급 이상 보유
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={!hasTopik ? 'default' : 'outline'}
                  onClick={() => setHasTopik(false)}
                >
                  TOPIK 미보유 / 2급 이하
                </Button>
              </div>
            </div>
          </div>

          {/* 진단 결과 박스 */}
          <div className="p-5 rounded-xl bg-muted/60 border border-border space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                {t.allowedHoursLabel}
              </span>
              <span className="text-base font-extrabold text-primary">{result.hours}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">주말·방학 근무 조건</span>
              <span className="font-semibold">{result.weekend}</span>
            </div>

            <div className="pt-2 border-t border-border flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{t.permitRequiredLabel}: </span>
                <span className="text-muted-foreground">{result.procedure}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 체류자격별 상세 안내 카드 3종 */}
      <h2 className="text-lg font-bold tracking-tight pt-2">{t.guideTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <Badge className="w-fit mb-1">D-2 / D-4</Badge>
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>유학생 시간제 취업허가</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>근무 시작 전 반드시 하이코리아(HiKorea) 또는 관할 출입국사무소 허가 필요</span>
            </p>
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>필요 서류: 여권, 외국인등록증, 표준근로계약서, 사업자등록증, 성적·출석증명서</span>
            </p>
            <p className="flex items-start gap-1.5 text-destructive">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>무허가 취업 시 고용주와 유학생 모두 범칙금 및 비자 연장 제한 불이익</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Badge variant="secondary" className="w-fit mb-1">
              D-10
            </Badge>
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>졸업 후 구직 및 인턴십 비자</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>국내 전문학사 이상 졸업 예정자 및 졸업자가 구직 활동을 위해 전환하는 비자</span>
            </p>
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>국내 기업과 인턴 계약을 맺고 최대 1년(동일 기업 6개월) 유급 인턴십 수행 가능</span>
            </p>
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>TOPIK 4급 이상 보유 시 구직점수제 가산점 부여로 전환 유리</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Badge variant="outline" className="w-fit mb-1">
              E-7-1
            </Badge>
            <CardTitle className="text-base flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              <span>특정활동(전문인력) 취업비자</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>해외영업원, 통번역가, 소프트웨어 개발자, 디자이너 등 87개 전문 직종 취업 비자</span>
            </p>
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>국내 대학 학사 이상 졸업(또는 전문학사 전공 일치) 시 경력 요건 면제 특례 적용</span>
            </p>
            <p className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>고용 기업의 내국인 고용 비율(20% 이내) 및 임금 요건(GNI 80% 이상) 충족 필요</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}