export function resolveURL(base, path) {
  return new URL(path, base).toString();
}
