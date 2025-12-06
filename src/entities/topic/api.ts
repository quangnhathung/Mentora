import { client } from '@/shared/api/common/client';

import { type Topic } from './type';
import { type Lesson } from './type';

// robust fetch: chấp nhận nhiều shape trả về khác nhau
async function normalizeResponseToTopics(data: unknown): Promise<Topic[]> {
  // nếu đã là array -> trả về
  if (Array.isArray(data)) return data as Topic[];

  // object chứa data/items -> rút ra
  if (typeof data === 'object' && data !== null) {
    const d = data as any;
    if (Array.isArray(d.data)) return d.data as Topic[];
    if (Array.isArray(d.items)) return d.items as Topic[];
    // một số API trả về { result: [...] }
    if (Array.isArray(d.result)) return d.result as Topic[];
  }

  throw new Error('Unexpected topics response shape');
}

/**
 * Lấy topics từ API
 * endpoint: GET /topics  (thay đổi tùy backend)
 */
export async function fetchTopics(): Promise<Topic[]> {
  const res = await client.get('/topics');
  return normalizeResponseToTopics(res.data);
}

export type UpdateLessonStatusReq = {
  status: string;
};

/**
 * Cập nhật status của lesson
 * @param lessonId ID của lesson
 * @param data { status: string }
 * @returns Lesson đã cập nhật
 */
export async function updateLessonStatus(
  lessonId: string,
  data: UpdateLessonStatusReq
): Promise<Lesson> {
  const res = await client.put(`/lessons/${lessonId}/status`, data);
  return res.data;
}
