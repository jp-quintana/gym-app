export const obtainCookieTtl = (ttl = '') => {
  const timeUnitMap = {
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
    y: 60 * 60 * 24 * 365,
  };

  const defaultTtl = timeUnitMap.d * 30 * 6 * 1000;

  if (ttl.length === 0) return defaultTtl;

  const timeUnitValue = timeUnitMap[ttl[ttl.length - 1]];
  const ttlValue = ttl.slice(0, ttl.length - 1);

  if (!timeUnitValue) return defaultTtl;

  return +ttlValue * timeUnitValue * 1000;
};
