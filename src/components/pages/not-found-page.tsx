import { Container, ActionLink } from "../primitives";
export function NotFoundPage() {
  return <main id="main" className="py-24"><Container><p className="eyebrow mb-5">404</p><h1 className="section-title">Страница не найдена</h1><p className="mb-8 mt-5 text-muted-foreground">Возможно, адрес изменился. Перейдите к системам токоподвода или начните с главной.</p><div className="flex flex-wrap gap-3"><ActionLink href="/">На главную</ActionLink><ActionLink href="/produkciya/" outline>Продукция</ActionLink></div></Container></main>;
}
