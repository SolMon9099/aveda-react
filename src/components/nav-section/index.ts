import { matchPath } from 'react-router-dom';

export * from './type';

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path: string) {
  return path.includes('http');
}

export function getActive(path: string, activeOn: string | undefined, pathname: string) {
  return path && activeOn ? (!!matchPath({ path: path, end: false }, pathname) || !!matchPath({ path: activeOn, end: false }, pathname)) : path ? !!matchPath({ path: path, end: false }, pathname) : false;
}
