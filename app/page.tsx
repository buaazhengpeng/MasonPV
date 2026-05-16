import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to MasonPV
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mb-6">
          Your personal local media browser for photos and videos.
          Configure your media directories to get started.
        </p>
        <div className="flex gap-2 mb-8">
          <Badge variant="secondary">Photos</Badge>
          <Badge variant="secondary">Videos</Badge>
          <Badge variant="secondary">Local-first</Badge>
        </div>
        <a
          href="/settings"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Configure Media Directories
        </a>
      </div>
    </div>
  );
}
