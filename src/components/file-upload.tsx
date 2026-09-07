"use client";
import { useState } from "react";
import { inquiryConfig } from "@/config/inquiry";

export function FileUpload({ id, error }: { id: string; error?: string }) {
  const [name, setName] = useState("");
  return <div><label htmlFor={id} className="form-label">Техническое задание, чертёж или спецификация</label><div className="border border-dashed border-border bg-surface p-5"><input id={id} name="file" type="file" accept={inquiryConfig.accept} aria-invalid={Boolean(error)} aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`} className="w-full min-w-0 text-sm file:mr-3 file:border-0 file:bg-white file:px-3 file:py-3 file:font-semibold" onChange={(event) => setName(event.currentTarget.files?.[0]?.name ?? "")} /><p id={`${id}-help`} className="mt-3 text-sm text-muted-foreground">PDF, PNG, JPG, DOCX, XLSX · до 5 МБ · один файл.</p>{name && <p className="mt-2 break-all text-sm" aria-live="polite">Выбран: {name}</p>}</div>{error && <p id={`${id}-error`} className="form-error">{error}</p>}</div>;
}
