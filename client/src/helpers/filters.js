import { redirect } from "react-router-dom";

export const filters = (options, data) => {
  const { searchBar, precio, raiting } = options;
if(precio?.min>=100 || precio?.max<=200&&searchBar?.length>0){
  const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    return dataNormalizada.filter((item) =>
      item.name.includes(textNormalizado)
    ).filter((item) => item.price >= precio.min && item.price <= precio.max)
}
 if(precio?.min>=100 || precio?.max<=200){
  console.log('-->esty aca1')
  const dataFilter = data && data.filter(
    (item) => item.price >= precio.min && item.price <= precio.max
  );
  return dataFilter;
 }
  if (searchBar?.length>0) {
    console.log('esty aca 2')
    const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    return dataNormalizada.filter((item) =>
      item.name.includes(textNormalizado)
    );
  }
  return data;
};

const normalizeText = (text, data) => {
  const textNormalizado = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const dataNormalizada =
    data &&
    data.map((item) => ({
      ...item,
      name: item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    }));
  return { dataNormalizada, textNormalizado };
};
