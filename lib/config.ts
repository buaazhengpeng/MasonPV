import { readFileSync, existsSync } from "fs";
import { join } from "path";

export interface MediaRoot {
  name: string;
  path: string;
}

export interface AppConfig {
  mediaRoots: MediaRoot[];
  includeExtensions: string[];
  excludePatterns: string[];
  listenHost: string;
  listenPort: number;
}

const DEFAULT_CONFIG: AppConfig = {
  mediaRoots: [],
  includeExtensions: [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".mp4",
    ".mov",
    ".mkv",
    ".webm",
  ],
  excludePatterns: ["**/.DS_Store", "**/node_modules/**", "**/.cache/**"],
  listenHost: "127.0.0.1",
  listenPort: 3000,
};

export function loadConfig(): AppConfig {
  const localPath = join(process.cwd(), "config.local.json");
  const examplePath = join(process.cwd(), "config.example.json");

  const configPath = existsSync(localPath) ? localPath : examplePath;

  if (!existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const raw = readFileSync(configPath, "utf-8");
    const parsed = JSON.parse(raw) as Partial<AppConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    console.warn(`Failed to parse config from ${configPath}, using defaults`);
    return DEFAULT_CONFIG;
  }
}
