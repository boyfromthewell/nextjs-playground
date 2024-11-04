import ChimhahaVideolist from '@/app/_components/ChimhahaVideoList';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <ChimhahaVideolist id={id} />;
}
