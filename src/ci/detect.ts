export function isCIMode(flag?: boolean): boolean {
  if (flag) return true;
  if (process.env.GITHUB_ACTIONS === "true") return true;
  return false;
}

export function isGenerateTemplate(flag?: boolean): boolean {
  if (flag) return true;
  return false;
}
