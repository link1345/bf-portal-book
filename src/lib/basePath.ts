export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(pathname: string) {
  if (!basePath || !pathname.startsWith("/")) {
    return pathname;
  }

  if (pathname === basePath || pathname.startsWith(`${basePath}/`)) {
    return pathname;
  }

  return `${basePath}${pathname}`;
}
