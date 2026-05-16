import { AppShell } from "@/components/app-shell";
import { MediaFilterBar } from "@/components/media-filter-bar";
import { MediaGrid } from "@/components/media-grid";

export default function HomePage() {
  return (
    <AppShell>
      <MediaFilterBar />
      <MediaGrid />
    </AppShell>
  );
}
