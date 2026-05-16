import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type MediaRootConfig = {
  name: string;
  path: string;
};

export type AppConfig = {
  mediaRoots: MediaRootConfig[];
  includeExtensions: string[];
  excludePatterns: string[];
  listenHost: string;
  listenPort: number;
};

export const defaultIncludeExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".mp4",
  ".mov",
  ".mkv",
  ".webm",
];

export const defaultExcludePatterns = [
  "**/.DS_Store",
  "**/node_modules/**",
  "**/.cache/**",
  "**/.git/**",
];

export const defaultConfig: AppConfig = {
  mediaRoots: [],
  includeExtensions: defaultIncludeExtensions,
  excludePatterns: defaultExcludePatterns,
  listenHost: "127.0.0.1",
  listenPort: 3000,
};

const localConfigPath = path.join(process.cwd(), "config.local.json");
const exampleConfigPath = path.join(process.cwd(), "config.example.json");

type RawConfig = Partial<AppConfig>;

function normalizeExtension(extension: string) {
  const trimmed = extension.trim().toLowerCase();
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
}

function normalizeConfig(rawConfig: RawConfig): AppConfig {
  const includeExtensions = Array.isArray(rawConfig.includeExtensions)
    ? rawConfig.includeExtensions
        .filter((extension): extension is string => typeof extension === "string")
        .map(normalizeExtension)
    : defaultConfig.includeExtensions;

  const mediaRoots = Array.isArray(rawConfig.mediaRoots)
    ? rawConfig.mediaRoots
        .filter(
          (root): root is MediaRootConfig =>
            Boolean(root) &&
            typeof root.name === "string" &&
            root.name.trim().length > 0 &&
            typeof root.path === "string" &&
            root.path.trim().length > 0,
        )
        .map((root) => ({
          name: root.name.trim(),
          path: path.resolve(root.path),
        }))
    : [];

  return {
    mediaRoots,
    includeExtensions,
    excludePatterns: Array.isArray(rawConfig.excludePatterns)
      ? rawConfig.excludePatterns.filter((pattern): pattern is string => typeof pattern === "string")
      : defaultConfig.excludePatterns,
    listenHost:
      typeof rawConfig.listenHost === "string" && rawConfig.listenHost.trim().length > 0
        ? rawConfig.listenHost
        : defaultConfig.listenHost,
    listenPort:
      typeof rawConfig.listenPort === "number" && Number.isInteger(rawConfig.listenPort)
        ? rawConfig.listenPort
        : defaultConfig.listenPort,
  };
}

export async function loadAppConfig(): Promise<AppConfig> {
  const configPath = existsSync(localConfigPath) ? localConfigPath : exampleConfigPath;

  if (!existsSync(configPath)) {
    return defaultConfig;
  }

  const raw = await readFile(configPath, "utf-8");
  return normalizeConfig(JSON.parse(raw) as RawConfig);
}

export function getConfigSource() {
  return existsSync(localConfigPath) ? "config.local.json" : "config.example.json";
}
