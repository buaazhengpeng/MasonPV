export type ScanSummary = {
  totalFiles: number;
  indexedFiles: number;
  skippedFiles: number;
};

export async function scanMediaRoots(): Promise<ScanSummary> {
  throw new Error("Media scanning will be implemented in the next milestone.");
}
