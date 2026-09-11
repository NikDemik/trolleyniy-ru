import type { NewsItem } from "@/types/content";

const annengSource = "https://anneng.ru/";

export const news: NewsItem[] = [
  {
    title: "Видео о монтаже монотроллейного шинопровода JDC-H",
    summary:
      "Процесс сборки линии монотроллейного шинопровода ANNENG и последовательность монтажа компонентов.",
    kind: "Видео",
    sourceUrl: `${annengSource}predstavliayem-video-o-montaje-monotrolleynogo-shinoprovoda-anneng-serii-jdc-h.html`,
  },
  {
    title: "Видео о монтаже троллейного шинопровода HFP 50",
    summary:
      "Пошаговая демонстрация сборки линии закрытого троллейного шинопровода и установки её компонентов.",
    kind: "Видео",
    sourceUrl: `${annengSource}predstavliayem-video-o-montaje-trolleynogo-shinoprovoda-anneng-serii-hfp-50.html`,
  },
  {
    title: "Интервью с директором WUXI ANNENG TROLLEY-TYPE BUSWAY ELECTRIC",
    summary:
      "Энтони Лу рассказывает о развитии ANNENG, выпуске системы HFP 56 и работе компании на международных рынках.",
    kind: "Интервью",
    sourceUrl: `${annengSource}intervyu-s-direktorom-wuxi-anneng-trolley-type-busway-electric.html`,
  },
  {
    title: "Поздравляем с наступающим Новым 2026 годом!",
    summary:
      "Новогоднее обращение к клиентам, партнёрам и коллегам с благодарностью за совместную работу.",
    kind: "Компания",
    sourceUrl: `${annengSource}pozdravlyaem-s-nastupayushchim-novym-2026-godom.html`,
  },
  {
    title: "Складская программа ANNENG в России",
    summary:
      "Обзор складского ассортимента троллейных и монотроллейных шинопроводов ANNENG для российских проектов.",
    kind: "Поставки",
    sourceUrl: `${annengSource}skladskaya-programma-anneng-v-rossii.html`,
  },
  {
    title: "Троллейный шинопровод ANNENG уже в России",
    summary:
      "Сообщение об открытии российского склада троллейных шинопроводов ANNENG и формировании товарного запаса.",
    kind: "Поставки",
    sourceUrl: `${annengSource}trollejnyj-shinoprovod-anneng-uzhe-v-rossii.html`,
  },
];
