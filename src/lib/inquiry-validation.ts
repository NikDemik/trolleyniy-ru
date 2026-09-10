import { inquiryConfig } from "../config/inquiry";
import { legalConfig } from "../config/legal";
import { equipmentOptions, systemOptions, inquiryFields } from "../data/inquiry";
import type { InquiryValues, InquiryErrors, FileInfo } from "../types/inquiry";

export function validateInquiry(values: InquiryValues, file?: FileInfo | null): InquiryErrors {
  const errors: InquiryErrors = {};
  if (values.consent !== "accepted") {
    errors.consent =
      "Для отправки заявки необходимо ваше согласие на обработку персональных данных.";
  } else if (values.consentVersion !== legalConfig.version) {
    errors.consent =
      "Текст согласия обновился. Обновите страницу и ознакомьтесь с актуальной редакцией.";
  }
  const name = values.name?.trim() ?? "";
  if (name.length < 2 || name.length > 100) errors.name = "Укажите имя от 2 до 100 символов.";
  const email = values.email?.trim() ?? "";
  const phone = values.phone?.trim() ?? "";
  if (!email && !phone) {
    errors.email = "Укажите email или телефон для ответа.";
    errors.phone = errors.email;
  }
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254))
    errors.email = "Проверьте адрес электронной почты.";
  if (
    phone &&
    (!/^[+\d\s()\-]+$/.test(phone) ||
      phone.replace(/\D/g, "").length < 7 ||
      phone.replace(/\D/g, "").length > 15)
  )
    errors.phone = "Укажите телефон: от 7 до 15 цифр.";
  if (!equipmentOptions.includes(values.equipment)) errors.equipment = "Выберите тип оборудования.";
  if (values.system && !systemOptions.includes(values.system))
    errors.system = "Выберите тип системы из списка.";
  for (const field of inquiryFields) {
    const raw = values[field.name]?.trim();
    if (!raw) continue;
    const num = Number(raw);
    if (
      !Number.isFinite(num) ||
      num < Number(field.min) ||
      num > Number(field.max) ||
      (field.name === "consumers" && !Number.isInteger(num))
    )
      errors[field.name] =
        `Введите число от ${field.min} до ${field.max}${field.name === "consumers" ? " без дробной части" : ""}.`;
  }
  for (const [key, limit] of [
    ["company", 200],
    ["conditions", 2000],
    ["comment", 4000],
  ] as const)
    if ((values[key]?.length ?? 0) > limit) errors[key] = `Не более ${limit} символов.`;
  if (file && file.size > 0) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!inquiryConfig.extensions.includes(extension))
      errors.file = "Допустимы PDF, PNG, JPG, DOCX и XLSX.";
    if (file.size > inquiryConfig.maxFileBytes)
      errors.file = "Размер файла не должен превышать 5 МБ.";
    if (file.name.length > 200) errors.file = "Сократите имя файла до 200 символов.";
  }
  return errors;
}
