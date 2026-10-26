import type { MainNavEntry, NavMenu } from "@/types";

const withTrailingSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** True when `href` is the current page or a parent section of it. */
export function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  const current = withTrailingSlash(pathname);
  const target = withTrailingSlash(href);
  return target === "/" ? current === "/" : current.startsWith(target);
}

/** True when `href` is exactly the current page. */
export function isCurrentPage(pathname: string | null, href: string) {
  return pathname ? withTrailingSlash(pathname) === withTrailingSlash(href) : false;
}

export const isNavMenu = (entry: MainNavEntry): entry is NavMenu => "groups" in entry;

/** True when the current page belongs to any group in the dropdown. */
export function isMenuActive(pathname: string | null, menu: NavMenu) {
  return menu.groups.some((group) => isActivePath(pathname, group.href));
}
