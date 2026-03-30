export function routeTitleForPath(pathname: string): string {
  if (pathname.startsWith('/patients/') && pathname.length > '/patients/'.length) return 'Patient Record';
  if (pathname.startsWith('/patients')) return 'Records';
  if (pathname.startsWith('/analytics')) return 'Insights';
  if (pathname.startsWith('/dashboard')) return 'Overview';
  return 'MediCore';
}
