export const appURL = (path?: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  const pathName = basePath && path && !path.startsWith(basePath) ? `${basePath}${path}` : (path ?? basePath);
  return `${window.location.origin}${pathName}`;
};
