export const inquiryConfig = {
  endpoint: "/api/inquiry/",
  maxFileBytes: 5 * 1024 * 1024,
  maxBodyBytes: 5 * 1024 * 1024 + 64 * 1024,
  extensions: ["pdf", "png", "jpg", "jpeg", "docx", "xlsx"],
  accept: ".pdf,.png,.jpg,.jpeg,.docx,.xlsx",
  unavailableMessage: "Отправка заявок пока не подключена. Данные не сохранены и не отправлены. Для товарного подбора можно перейти в каталог ANNENG.",
};
