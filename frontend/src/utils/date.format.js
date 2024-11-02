export const formatDate = (date) => {
  "2024-09-02";

  const d = new Date(date);

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

console.log(formatDate("2024-09-02"));
