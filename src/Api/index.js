const BASE_URL =
  "https://mate-academy.github.io/phone-catalogue-static/api/phones";
//https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom-with-wi-fi.json
export const getAll = async () => {
  const response = await fetch(`${BASE_URL}.json`);
  const phones = await response.json();

  return phones;
};

export const getCurrentPhone = async phone => {
  const response = await fetch(`${BASE_URL}/${phone}.json`);
  const data = await response.json();

  return data;
};
