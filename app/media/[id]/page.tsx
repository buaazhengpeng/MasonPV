import { AppShell } from "@/components/app-shell";
import { MediaViewer } from "@/components/media-viewer";

type MediaDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <MediaViewer title={`媒体详情 #${id}`} />
    </AppShell>
  );
}
