'use client';

import { FileText, ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CoverLetterSample {
  applicant: string;
  title: string;
  content: string;
}

const SAMPLES_BY_JOB: Record<number, CoverLetterSample[]> = {
  1: [
    {
      applicant: '지원자 A · 우즈베키스탄 · TOPIK 4급',
      title: '밝은 인사와 빠른 음료 제조로 매장 회전율을 높이겠습니다',
      content:
        '한국 유학 2년 차로 홍대 인근 카페에서 3개월간 홀 정리를 맡았습니다. 에스프레소 머신 기본 세척과 포스기 응대가 가능하며, 피크타임에도 침착하게 주문을 처리합니다.',
    },
    {
      applicant: '지원자 B · 베트남 · TOPIK 3급 · TOEIC 820점',
      title: '외국인 관광객 응대가 가능한 성실한 바리스타 스태프입니다',
      content:
        '홍대 상권 특성상 외국인 손님이 많은 만큼 영어로 원두와 시그니처 메뉴를 친절히 안내할 수 있습니다. 월·수·금 오후 시간대 결근 없이 근무 가능합니다.',
    },
  ],
  2: [
    {
      applicant: '지원자 A · 몽골 · TOPIK 3급',
      title: '정확한 물류 검수와 야간·주말 책임 근무를 약속합니다',
      content:
        '편의점 물류 입고 시간 엄수와 유통기한 선입선출 정리에 자신 있습니다. 한국어 안내 문구를 정확히 이해하며 계산 실수 없이 꼼꼼히 근무하겠습니다.',
    },
  ],
  3: [
    {
      applicant: '지원자 A · 미국 · TOPIK 4급 · TOEIC 985점',
      title: '수강생 눈높이에 맞춘 실전 회화 튜터링이 가능합니다',
      content:
        '교내 언어교환 프로그램 리더로 활동하며 한국인 학생들의 영어 회화 교정을 도왔습니다. 한국어 설명도 가능해 초급 수강생도 부담 없이 수업에 참여하도록 이끌 수 있습니다.',
    },
  ],
  4: [
    {
      applicant: '지원자 A · 중국 · TOPIK 5급 · HSK 6급',
      title: 'K-뷰티 제품 특징을 외국어로 정확히 전달해 매출에 기여하겠습니다',
      content:
        '평소 한국 화장품 성분에 관심이 많아 관광객이 피부 타입에 맞는 제품을 고르도록 한국어·중국어로 상담할 수 있습니다. 텍스리펀 및 매장 진열 업무도 빠르게 익히겠습니다.',
    },
  ],
  5: [
    {
      applicant: '지원자 A · 우즈베키스탄 · TOPIK 3급',
      title: '체력과 팀워크가 강점인 주말 피크타임 전문 스태프입니다',
      content:
        '이태원 다국적 레스토랑에서 주말 서빙을 경험했습니다. 주방과 홀 사이의 빠른 소통이 가능하며, 손님이 몰리는 금·토·일 저녁 시간에도 지치지 않고 밝게 일합니다.',
    },
  ],
  6: [
    {
      applicant: '지원자 A · 일본 · TOPIK 6급 · TOEIC 910점',
      title: '자연스러운 현지화 번역과 꼼꼼한 데이터 검수 역량을 갖추었습니다',
      content:
        '한국 IT 서비스의 일본어 UI 번역 및 QA 검수 인턴 경험이 있습니다. 단순 직역이 아닌 현지 사용자가 자연스럽게 느끼는 표현으로 다듬어 완성도를 높이겠습니다.',
    },
  ],
};

export default function CoverLetterModal({ jobId = 1 }: { jobId?: number }) {
  const samples = SAMPLES_BY_JOB[jobId] || SAMPLES_BY_JOB[1];

  return (
    <Card>
      <CardContent className="py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 font-semibold text-sm">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span>해당 공고 합격자 자기소개서 예시</span>
        </div>

        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'gap-1'
            )}
          >
            <span>예시 보기</span>
            <ChevronRight className="w-4 h-4" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>합격자 자기소개서 예시</DialogTitle>
              <DialogDescription>
                이 직무에 실제 합격한 유학생 지원자들의 자기소개서 구성 예시입니다.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1 pt-2">
              {samples.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-muted/40 p-4 space-y-2"
                >
                  <Badge variant="secondary">{item.applicant}</Badge>
                  <h4 className="font-bold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}