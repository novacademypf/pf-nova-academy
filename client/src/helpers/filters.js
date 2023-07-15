import { redirect } from "react-router-dom";

export const filters = (options, data) => {
  const { searchBar, precio, raiting } = options;

 /*  if(precio?.min!==100){
    const dataFilter= data&&data.filter((item)=>{
        return item.price<=precio?.min
    })
    return dataFilter
  } */
  if (searchBar?.length>0) {
    console.log('-->searcbar',searchBar)
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
