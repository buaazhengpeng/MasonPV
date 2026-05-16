import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Configure your media directories and scanning preferences.
      </p>
      <Separator className="mb-6" />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Media Directories</CardTitle>
            <CardDescription>
              Add local directories that contain your photos and videos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No media directories configured yet. This feature will be available
              once the media scanning module is implemented.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scan Status</CardTitle>
            <CardDescription>
              View the status of media scanning jobs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No scans have been performed yet.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
