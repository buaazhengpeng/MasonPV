import { notFound } from "next/navigation";
import { getMediaItem } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { MediaViewer } from "@/components/media-viewer";

export const dynamic = "force-dynamic";

type MediaDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MediaDetailPage({ params }: MediaDetailPageProps) {
  const { id } = await params;
  const item = getMediaItem(id);

  if (!item) {
    notFound();
  }

  return (
    <AppShell>
      <MediaViewer item={item} />
    </AppShell>
  );
}
