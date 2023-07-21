import { redirect } from "react-router-dom";

export const filters = (options, data, payload) => {
  const { searchBar, precio, raiting, categories } = options;

  const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
  const dataFilter = dataNormalizada || data;
   
  if (
    searchBar?.length > 0 &&
    categories?.length > 0 &&
    (precio.min > payload?.minPrice || precio.max < payload?.maxPrice) &&
    raiting?.length > 0
  ) {
    const newData = dataFilter
      .filter((item) => item.name.includes(textNormalizado))
      .filter((item) => {
        return item.category.some((item) => categories.includes(item));
      })
      .filter((item) => item.price >= precio.min && item.price <= precio.max)
      .filter((item) => {
        return raiting?.includes(Math.round(item.ratingAverage));
      });
    return newData;
  }

  if (
    searchBar?.length > 0 &&
    categories?.length > 0 &&
    (precio.min > payload?.minPrice || precio.max < payload?.maxPrice)
  ) {
    
    const newData = dataFilter
      .filter((item) => item.name.includes(textNormalizado))
      .filter((item) => {
        return item.category.some((item) => categories.includes(item));
      })
      .filter((item) => item.price >= precio.min && item.price <= precio.max);
    return newData;
  }
  if(searchBar?.length>0 && raiting?.length>0){
    const newData = dataFilter.filter((item) =>
      item.name.includes(textNormalizado)
    ).filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    });
    return newData;
  }
  if (searchBar?.length > 0 && categories?.length > 0) {
    const newData = dataFilter
      .filter((item) => item.name.includes(textNormalizado))
      .filter((item) => {
        return item.category.some((item) => categories.includes(item));
      });
    return newData;
  }
 if(searchBar?.length > 0 && (precio.min > payload?.minPrice || precio.max < payload?.maxPrice) ){
  
  const newData = dataFilter.filter((item) =>
    item.name.includes(textNormalizado)
  ).filter(
    (item) => item.price >= precio.min && item.price <= precio.max
  );
  return newData;
 }
  if (searchBar?.length > 0) {
    const newData = dataFilter.filter((item) =>
      item.name.includes(textNormalizado)
    );
    return newData;
  }

  // filtro catgories
  if (categories?.length > 0 && raiting?.length > 0 && (precio.min > payload?.minPrice || precio.max < payload?.maxPrice)) {
    const newData = dataFilter.filter((item) =>
      item.category.some((cat) => categories.includes(cat))
    ).filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    }).filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
    return newData;
  }
  if(categories.length>0&&(precio.min > payload?.minPrice || precio.max < payload?.maxPrice)){
    const newData = dataFilter.filter((item) =>
      item.category.some((cat) => categories.includes(cat))
    ).filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
   
    return newData;
  }
  if (categories?.length > 0 && raiting?.length > 0) {
    const newData = dataFilter.filter((item) =>
      item.category.some((cat) => categories.includes(cat))
    ).filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    });
    return newData;
  }

  if (categories?.length > 0) {
    const newData = dataFilter.filter((item) =>
      item.category.some((cat) => categories.includes(cat))
    );
    return newData;
  }
  //filtro raiting
  if( raiting?.length!==0 && (precio.min > payload?.minPrice || precio.max < payload?.maxPrice)){
    const newData = dataFilter.filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    }).filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
    return newData;
  }
  if (raiting?.length !== 0) {
    const newData = dataFilter.filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    });
    return newData;
  }
  //filtro precio
  if (precio.min > payload?.minPrice || precio.max < payload?.maxPrice) {
    const newData = dataFilter.filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
    return newData;
  }
  return dataNormalizada;
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
        ratingAverage:Math.round(item.ratingAverage)

    }));
  return { dataNormalizada, textNormalizado };
};
