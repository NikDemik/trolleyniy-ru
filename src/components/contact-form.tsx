"use client";
import { useId, useRef, useState, type FormEvent } from "react";
import { inquiryConfig } from "@/config/inquiry";
import { equipmentOptions, inquiryFields, systemOptions } from "@/data/inquiry";
import { validateInquiry } from "@/lib/inquiry-validation";
import type { InquiryErrors, InquiryResult, InquiryValues } from "@/types/inquiry";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileUpload } from "./file-upload";

export function ContactForm({ extended = false }: { extended?: boolean }) {
  const id = useId();
  const [startedAt, setStartedAt] = useState(0);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  function attributes(name: string) { return { id: `${id}-${name}`, name, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined }; }
  function error(name: string) { return errors[name] ? <p className="form-error" id={`${id}-${name}-error`}>{errors[name]}</p> : null; }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: InquiryValues = {};
    for (const [key, value] of data) if (typeof value === "string") values[key] = value;
    const attachment = data.get("file");
    const validation = validateInquiry(values, attachment instanceof File ? attachment : null);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStatus("error"); setMessage("Проверьте отмеченные поля.");
      const field = form.elements.namedItem(Object.keys(validation)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    busy.current = true;
    setStatus("pending"); setMessage("Отправляем запрос…");
    try {
      const response = await fetch(inquiryConfig.endpoint, { method: "POST", body: data, signal: AbortSignal.timeout(20000) });
      const result: InquiryResult = await response.json();
      if (!response.ok || !result.ok) { setErrors("errors" in result ? result.errors ?? {} : {}); setStatus("error"); setMessage(result.message || "Не удалось отправить запрос."); }
      else { setStatus("success"); setMessage(result.message); }
    } catch { setStatus("error"); setMessage("Не удалось подтвердить отправку. Проверьте соединение и попробуйте ещё раз."); }
    finally { busy.current = false; requestAnimationFrame(() => messageRef.current?.focus()); }
  }
  return <form onSubmit={submit} noValidate onFocusCapture={() => { if (!startedAt) setStartedAt(Date.now()); }} className="space-y-6" aria-label="Форма инженерного подбора">
    <p className="border-l-2 border-primary bg-surface p-4 text-sm leading-6">Онлайн-отправка временно недоступна. Можно подготовить данные; заявка не будет сохранена до подключения сервиса приёма.</p>
    <noscript><p>Для проверки и отправки формы требуется JavaScript. Онлайн-приём заявок пока не подключён.</p></noscript>
    <input type="hidden" name="startedAt" value={startedAt} />
    <div className="hidden" aria-hidden="true"><label htmlFor={`${id}-website`}>Ваш сайт<input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset disabled={status === "pending" || status === "success"} className="min-w-0 space-y-6"><legend className="mb-5 text-lg font-semibold">Параметры оборудования</legend>
      <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor={`${id}-equipment`} className="form-label">Тип оборудования *</label><select {...attributes("equipment")} required defaultValue="" className="field"><option value="">Выберите оборудование</option>{equipmentOptions.map((item) => <option key={item}>{item}</option>)}</select>{error("equipment")}</div>
        {extended && <div><label htmlFor={`${id}-system`} className="form-label">Тип системы</label><select {...attributes("system")} defaultValue="Не знаю" className="field">{systemOptions.map((item) => <option key={item}>{item}</option>)}</select>{error("system")}</div>}
        {inquiryFields.filter((field) => extended || !field.extended).map((field) => <div key={field.name}><label htmlFor={`${id}-${field.name}`} className="form-label">{field.label}</label><Input {...attributes(field.name)} type={field.type} min={field.min} max={field.max} step={field.step} inputMode="decimal" />{error(field.name)}</div>)}
      </div>
      {extended && <div><label htmlFor={`${id}-conditions`} className="form-label">Условия эксплуатации</label><textarea {...attributes("conditions")} maxLength={2000} rows={3} className="field" placeholder="Помещение или улица, пыль, влажность, особенности монтажа" />{error("conditions")}</div>}
      <div><label htmlFor={`${id}-comment`} className="form-label">Комментарий</label><textarea {...attributes("comment")} maxLength={4000} rows={4} className="field" placeholder="Опишите задачу и укажите неизвестные параметры" />{error("comment")}</div>
      <FileUpload id={`${id}-file`} error={errors.file} />
    </fieldset>
    <fieldset disabled={status === "pending" || status === "success"} className="min-w-0"><legend className="mb-5 text-lg font-semibold">Контактная информация</legend><p className="mb-5 text-sm text-muted-foreground">Имя и хотя бы один способ связи обязательны.</p><div className="grid gap-5 sm:grid-cols-2">
      <div><label htmlFor={`${id}-name`} className="form-label">Имя *</label><Input {...attributes("name")} required autoComplete="name" maxLength={100} />{error("name")}</div>
      <div><label htmlFor={`${id}-company`} className="form-label">Компания</label><Input {...attributes("company")} autoComplete="organization" maxLength={200} />{error("company")}</div>
      <div><label htmlFor={`${id}-phone`} className="form-label">Телефон</label><Input {...attributes("phone")} type="tel" autoComplete="tel" maxLength={30} />{error("phone")}</div>
      <div><label htmlFor={`${id}-email`} className="form-label">Email</label><Input {...attributes("email")} type="email" autoComplete="email" maxLength={254} />{error("email")}</div>
    </div></fieldset>
    <Button type="submit" disabled={status === "pending" || status === "success"}>{status === "pending" ? "Отправка…" : status === "success" ? "Заявка принята" : "Получить расчет"}<span aria-hidden="true">→</span></Button>
    <div ref={messageRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={message ? `border p-4 text-sm ${status === "error" ? "border-destructive text-destructive" : "border-primary"}` : ""}>{message}</div>
  </form>;
}
