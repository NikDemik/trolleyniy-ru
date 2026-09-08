import { company, commercialTerms } from "@/config/company";
import { Section } from "./primitives";

export function CompanyDetails() {
  const fields = [
    ["Юридическое лицо", company.legalName],
    ["Телефон", company.phone],
    ["Email", company.email],
    ["Адрес", company.address],
    ["Часы работы", company.workHours],
    ["ИНН", company.inn],
    ["КПП", company.kpp],
    ["ОГРН", company.ogrn],
  ];
  return (
    <Section title="Контактная информация и реквизиты">
      <dl className="max-w-3xl">
        {fields
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div
              key={label}
              className="grid gap-2 border-b border-border py-4 sm:grid-cols-[180px_1fr]"
            >
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="break-words font-medium">
                {label === "Телефон" ? (
                  <a href={`tel:${value!.replace(/[^+\d]/g, "")}`}>{value}</a>
                ) : label === "Email" ? (
                  <a href={`mailto:${value}`}>{value}</a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
      </dl>
      {!company.phone && !company.email && (
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
          Прямые контакты и реквизиты для связи готовятся к публикации. Каталог оборудования
          доступен на отдельном сайте ANNENG.
        </p>
      )}
      {company.documents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Документы компании</h3>
          <ul className="mt-4 space-y-3">
            {company.documents.map((doc) => (
              <li key={doc.href}>
                <a className="text-primary underline" href={doc.href}>
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
export function CommercialDetails({ warranty = false }: { warranty?: boolean }) {
  const rows = warranty
    ? [["Гарантийный срок", commercialTerms.warrantyPeriod]]
    : [
        ["Оплата", commercialTerms.payment],
        ["Доставка", commercialTerms.deliveryMethods],
        ["Транспортные компании", commercialTerms.transportCompanies],
        ["Сроки", commercialTerms.leadTime],
      ];
  const published = rows.filter(([, value]) => value);
  if (!published.length) return null;
  return (
    <Section title="Согласованные условия">
      <dl>
        {published.map(([label, value]) => (
          <div key={label} className="border-b border-border py-5">
            <dt className="font-semibold">{label}</dt>
            <dd className="mt-2 text-muted-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
