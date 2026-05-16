import { resolve, normalize } from "path";

export function isPathUnderRoot(filePath: string, rootPath: string): boolean {
  const normalizedFile = normalize(resolve(filePath));
  const normalizedRoot = normalize(resolve(rootPath));
  return normalizedFile.startsWith(normalizedRoot);
}

export function sanitizePath(input: string): string {
  return input.replace(/\.\./g, "").replace(/\/\//g, "/");
}
