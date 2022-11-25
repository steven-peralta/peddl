import { TagOption } from '@peddl/common';

export default function extractTagOptions<T>(tags: readonly TagOption[]) {
  return tags.map((tag) => tag.value) as T[];
}
