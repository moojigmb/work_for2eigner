'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { Button } from '@/components/ui/button';

interface ApplyJobButtonProps {
  jobId: number;
  onApplied?: () => void;
}

export default function ApplyJobButton({ jobId, onApplied }: ApplyJobButtonProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: existing } = await supabase
        .from('applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .maybeSingle();

      if (existing) {
        setAlreadyApplied(true);
      }

      setLoading(false);
    }

    checkStatus();
  }, [jobId]);

  const handleApply = async () => {
    if (!userId) {
      router.push('/login');
      return;
    }

    setSubmitting(true);

    await supabase.from('profiles').upsert(
      { id: userId },
      { onConflict: 'id', ignoreDuplicates: true }
    );

    const { error } = await supabase.from('applications').insert({
      user_id: userId,
      job_id: jobId,
      status: '지원 완료',
    });

    setSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        setAlreadyApplied(true);
        return;
      }
      alert(`지원 처리 중 오류가 발생했습니다: ${error.message}`);
      return;
    }

    setAlreadyApplied(true);
    if (onApplied) {
      onApplied();
    }
  };

  const handleCancel = async () => {
    if (!userId) return;
    if (!confirm('정말 이 공고의 지원을 취소하시겠습니까?')) return;

    setSubmitting(true);

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('user_id', userId)
      .eq('job_id', jobId);

    setSubmitting(false);

    if (error) {
      alert(`지원 취소 중 오류가 발생했습니다: ${error.message}`);
      return;
    }

    setAlreadyApplied(false);
    if (onApplied) {
      onApplied();
    }
  };

  if (loading) {
    return (
      <Button disabled className="gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>확인 중...</span>
      </Button>
    );
  }

  if (alreadyApplied) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button
          disabled
          variant="secondary"
          className="gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 opacity-100"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>지원 완료됨</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          onClick={handleCancel}
          className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          <span>지원 취소</span>
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleApply} disabled={submitting} className="gap-2">
      {submitting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Send className="w-4 h-4" />
      )}
      <span>내 프로필로 간편 지원하기</span>
    </Button>
  );
}