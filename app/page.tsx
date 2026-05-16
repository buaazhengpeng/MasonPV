import type { MediaType } from "@/lib/db";
import { countMediaItems, listMediaItems } from "@/lib/db";
import { AppShell } from "@/components/app-shell";
import { MediaFilterBar } from "@/components/media-filter-bar";
import { MediaGrid } from "@/components/media-grid";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: Promise<{
    search?: string;
    type?: string;
  }>;
};

function parseMediaType(value?: string): MediaType | "all" {
  return value === "image" || value === "video" ? value : "all";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const type = parseMediaType(params.type);
  const search = params.search ?? "";
  const query = { search, type };
  const items = listMediaItems(query);
  const total = countMediaItems(query);

  return (
    <AppShell>
      <MediaFilterBar search={search} total={total} type={type} />
      <MediaGrid items={items} />
    </AppShell>
  );
}
