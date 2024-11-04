export const dateStrToKorStr = (date: string) => {
  const newStr = date.substring(0, 10).split('-');
  const [year, month, day] = newStr;
  return `등록 : ${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};
