// Display formatting for the canonical product data. Data stays numeric with separate units;
// this is the only place figures are turned into text.

// OPEN DECISION (number grouping): Indian (1,97,600) vs international (197,600). The site currently prints
// both styles. Until the owner decides, figures of five or more digits are grouped in the Indian style
// (as pin-bush and the old site do) and shorter figures are never grouped (as the site prints 2139, 1100).
const NUMBER_LOCALE = 'en-IN';
const GROUP_FROM = 10000;

export function formatNumber(value, decimals, { group = true } = {}) {
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    useGrouping: group && Math.abs(value) >= GROUP_FROM,
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 3,
  }).format(value);
}

const withUnit = (text, unit) => (!unit ? text : unit === '°' ? text + unit : `${text} ${unit}`);

// { min, max, unit, decimals? } -> "20 to 262 Nm" | "Up to 190 mm"
export function formatSpan({ min, max, unit, decimals }) {
  if (min != null && max != null) {
    return withUnit(`${formatNumber(min, decimals)} to ${formatNumber(max, decimals)}`, unit);
  }
  return withUnit(max != null ? `Up to ${formatNumber(max, decimals)}` : formatNumber(min, decimals), unit);
}

const RANGE_LABELS = { powerPer100rpm: 'Power', torque: 'Torque', bore: 'Bore Diameter', misalignment: 'Misalignment' };
const MISALIGNMENT = [['parallel', 'Parallel'], ['angular', 'Angular'], ['endFloat', 'End float']];

function formatRangeEntry(key, entry, powerPhrase) {
  if (key === 'misalignment') {
    return MISALIGNMENT.filter(([k]) => entry[k])
      .map(([k, label]) => `${label} up to ${withUnit(formatNumber(entry[k].max), entry[k].unit)}`)
      .join(', ');
  }
  if (entry.nominal != null) {
    return `Nominal: ${withUnit(formatNumber(entry.nominal), entry.unit)} / Max.: ${withUnit(formatNumber(entry.max), entry.unit)}`;
  }
  const text = formatSpan(entry);
  return key === 'powerPer100rpm' ? `${text} ${powerPhrase} 100 rpm` : text;
}

// Product-level "Technical Range" rows: [{ key, label, text }] in the order the data lists them.
export function getRangeRows(range = {}) {
  return Object.keys(range)
    .filter((key) => key in RANGE_LABELS)
    .map((key) => ({ key, label: range[key].label ?? RANGE_LABELS[key], text: formatRangeEntry(key, range[key], 'at') }));
}

// Variant summary strings: { torque, power, bore }
export function formatVariantRange(range = {}) {
  return {
    torque: range.torque && formatRangeEntry('torque', range.torque),
    power: range.powerPer100rpm && formatRangeEntry('powerPer100rpm', range.powerPer100rpm, 'per'),
    bore: range.bore && formatRangeEntry('bore', range.bore),
  };
}

// Size tables. A column is { key, label, unit?, suffix?, kind, decimals?, separator? }.
export const columnHeader = (c) => `${c.label}${c.unit ? ` (${c.unit})` : ''}${c.suffix ? ` ${c.suffix}` : ''}`;

export function formatCell(column, row) {
  const value = row[column.key];
  if (column.kind === 'labelRange') {
    const r = row[column.rangeKey];
    return `${value} ${r.min} to ${r.max} ${column.rangeSuffix}`;
  }
  if (value == null) return '—';
  if (column.kind === 'number') return formatNumber(value, column.decimals, { group: false });
  if (column.kind === 'list') return value.map((n) => formatNumber(n, undefined, { group: false })).join(column.separator);
  return value;
}
