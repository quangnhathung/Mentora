export function isoToDDMMYYYY(iso: Date): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** Nhận chuỗi người dùng gõ, trả về dạng 22/__/____ ; 22/07/____ ; 22/07/2025 */
export function formatDateMask(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 8); // chỉ giữ tối đa 8 số
  if (d.length <= 2) return d.padEnd(2, '_') + '/__/____';
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2).padEnd(2, '_')}/____`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4).padEnd(4, '_')}`;
}

export function ddmmyyyyToDate(ddmmyyyy: string): Date {
  const [day, month, year] = ddmmyyyy.split('/').map(Number);
  return new Date(year, month - 1, day); // month 0-based
}

export function epochToMonthYear(epochTime: number): string {
  const date = new Date(epochTime * 1000); // epoch giây → ms
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Chuyển chuỗi ngày dạng ISO (yyyy-mm-dd) sang dd/mm/yyyy
 * @param {string} iso - Ví dụ: "2025-07-09"
 * @returns {string}  - "09/07/2025" (trả về chuỗi rỗng nếu không hợp lệ)
 */
export function strToDdMmYyyy(str: string) {
  // Đã đúng dd/mm/yyyy → trả nguyên
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) return str;

  // Đúng yyyy-mm-dd  → đảo thành dd/mm/yyyy
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
  }

  return '';
}
