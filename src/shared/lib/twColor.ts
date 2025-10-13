// utils/twColor.ts
import Colors from '@/shared/ui/colors';

/**
 * Chuyển token Tailwind (vd. "primary/40") → "#rrggbb" | "rgba(...)"
 *  - Hỗ trợ `color/opacity` (opacity 0-100)
 *  - Tìm trong object Colors.{name}.DEFAULT hoặc Colors.{name}
 *  - Fallback: trả nguyên token
 */
export const twColor = (token: string, palette: Record<string, any> = Colors): string => {
  const [rawPath, opacityStr] = token.split('/');
  const segments = rawPath.split('-'); // ['secondary','dark']

  // ── tìm nút trong palette ──────────────────────────────────────
  let node: any = palette;
  for (const seg of segments) {
    node = node?.[seg];
    if (!node) break;
  }

  const base =
    typeof node === 'string' ? node : typeof node?.DEFAULT === 'string' ? node.DEFAULT : rawPath; // fallback giúp debug

  if (!opacityStr) return base; // không có /opacity

  // ── chuyển sang rgba() ─────────────────────────────────────────
  const alpha = Number(opacityStr) / 100;
  const hex = base.replace('#', '');
  const num = parseInt(hex.length === 3 ? hex.repeat(2) : hex, 16);

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r},${g},${b},${alpha})`;
};
