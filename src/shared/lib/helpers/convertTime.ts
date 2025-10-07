// ---- helpers.ts ----
const TZ = 'Asia/Ho_Chi_Minh';

/** Trả về chuỗi "YYYY-MM-DD HH:mm:ss GMT+7" theo giờ VN */
export function nowVNString(d = new Date()): string {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = fmt.formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? '';

  const date = `${get('year')}-${get('month')}-${get('day')}`;
  const time = `${get('hour')}:${get('minute')}:${get('second')}`;
  return `${date} ${time} GMT+7`;
}

/** Prefix log dạng: "[RQK 2025-07-28 09:15:03 GMT+7]" */
export function rqkPrefix() {
  return `[RQK ${nowVNString()}]`;
}

export function timeLabel(ts: number, nowMs: number = Date.now()): string {
  // Chuẩn hóa: hỗ trợ cả giây (10 chữ số) và mili-giây (13 chữ số)
  const tsMs = ts < 1e12 ? ts * 1000 : ts;
  const diffMs = nowMs - tsMs;

  const toWeekdayVi = (d: Date) => {
    const w = d.getDay(); // 0=Sun...6=Sat
    if (w === 0) return 'Chủ nhật';
    return `Thứ ${w + 1}`; // 1->Thứ 2 ... 6->Thứ 7
  };

  const formatDateVi = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${toWeekdayVi(d)} ${dd}/${mm}/${yyyy}`;
  };

  // Nếu là tương lai, hiển thị ngày tuyệt đối
  if (diffMs < 0) {
    return formatDateVi(new Date(tsMs));
  }

  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  if (diffMs < 5 * MINUTE) return 'Vừa xong';

  if (diffMs < HOUR) {
    const mins = Math.floor(diffMs / MINUTE);
    return `${mins} phút trước`;
  }

  if (diffMs < DAY) {
    const hours = Math.floor(diffMs / HOUR);
    return `${hours} giờ trước`;
  }

  if (diffMs < 4 * DAY) {
    const days = Math.floor(diffMs / DAY);
    return `${days} ngày trước`;
  }

  return formatDateVi(new Date(tsMs));
}
