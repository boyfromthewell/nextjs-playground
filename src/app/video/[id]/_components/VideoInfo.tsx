'use client';

import { getVideoDetail } from '@/api/getVideoDetail';
import { useQuery } from '@tanstack/react-query';

export default function VideoInfo({ id }) {
  const { data } = useQuery({
    queryKey: ['video', id],
    queryFn: getVideoDetail,
    staleTime: 0,
    refetchOnMount: true,
  });
  console.log(data);
  return <div>123</div>;
}
