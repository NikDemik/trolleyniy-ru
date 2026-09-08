export type InquiryValues = Record<string, string>;
export type InquiryErrors = Record<string, string>;
export type InquiryResult =
  { ok: true; message: string } | { ok: false; message: string; errors?: InquiryErrors };
export type FileInfo = { name: string; size: number; type: string };
