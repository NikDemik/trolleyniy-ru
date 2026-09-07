import { inquiryConfig } from "@/config/inquiry";
import { validateInquiry } from "@/lib/inquiry-validation";
import type { InquiryResult, InquiryValues } from "@/types/inquiry";

function reply(body: InquiryResult, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

async function readBounded(request: Request): Promise<Uint8Array> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > inquiryConfig.maxBodyBytes) { await reader.cancel(); throw new Error("too-large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}

async function validFileSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
  if (ext === "png") return [137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b);
  if (ext === "jpg" || ext === "jpeg") return bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  // Office-файлы являются ZIP-контейнерами. Перед реальной интеграцией нужен
  // антивирус и проверка содержимого; заглушка ничего не сохраняет и не пересылает.
  return (ext === "docx" || ext === "xlsx") && bytes[0] === 80 && bytes[1] === 75 && bytes[2] === 3 && bytes[3] === 4;
}

export async function handleInquiry(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ ok: false, message: "Отправьте форму со страницы сайта." }, 403);
  if (request.headers.get("sec-fetch-site") === "cross-site") return reply({ ok: false, message: "Межсайтовая отправка запрещена." }, 403);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data;")) return reply({ ok: false, message: "Неверный формат запроса." }, 415);
  if (Number(request.headers.get("content-length")) > inquiryConfig.maxBodyBytes) return reply({ ok: false, message: "Запрос слишком большой. Максимальный размер файла — 5 МБ." }, 413);
  let form: FormData;
  try {
    const body = await readBounded(request);
    form = await new Response(body as BodyInit, { headers: { "content-type": contentType } }).formData();
  } catch (error) {
    const oversized = error instanceof Error && error.message === "too-large";
    return reply({ ok: false, message: oversized ? "Максимальный размер файла — 5 МБ." : "Не удалось прочитать форму." }, oversized ? 413 : 400);
  }
  const values: InquiryValues = {};
  let file: File | null = null;
  for (const [key, value] of form.entries()) {
    if (form.getAll(key).length !== 1) return reply({ ok: false, message: "Повторяющиеся поля формы." }, 400);
    if (typeof value === "string") values[key] = value;
    else if (key === "file") file = value;
    else return reply({ ok: false, message: "Неизвестное файловое поле." }, 400);
  }
  const elapsed = Date.now() - Number(values.startedAt);
  if (values.website || !Number.isFinite(elapsed) || elapsed < 1200 || elapsed > 24 * 60 * 60 * 1000) return reply({ ok: false, message: "Не удалось проверить форму. Обновите страницу и повторите ввод." }, 400);
  const errors = validateInquiry(values, file);
  if (Object.keys(errors).length) return reply({ ok: false, message: "Проверьте поля формы.", errors }, 422);
  if (file && file.size > 0 && !(await validFileSignature(file))) return reply({ ok: false, message: "Проверьте вложение.", errors: { file: "Содержимое файла не соответствует расширению." } }, 422);
  // Граница интеграции: заменить на серверный адаптер доставки после настройки.
  // Не логировать персональные данные. Не возвращать ok:true без подтверждения приёма.
  return reply({ ok: false, message: inquiryConfig.unavailableMessage }, 503);
}
