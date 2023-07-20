import { redirect } from "react-router-dom";

export const filters = (options, data, payload) => {
  const { searchBar, precio, raiting, categories } = options;

  const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
  console.log(payload);
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
    console.log("aca seracbar y categories y precio rating acaaaa-->", newData);
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
    console.log("aca seracbar y categories y precio-->", newData);
    return newData;
  }
  if(searchBar?.length>0 && raiting?.length>0){
    const newData = dataFilter.filter((item) =>
      item.name.includes(textNormalizado)
    ).filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    });
    console.log(newData);
    return newData;
  }
  if (searchBar?.length > 0 && categories?.length > 0) {
    const newData = dataFilter
      .filter((item) => item.name.includes(textNormalizado))
      .filter((item) => {
        return item.category.some((item) => categories.includes(item));
      });
    console.log("aca seracbar y categories-->", newData);
    return newData;
  }
 if(searchBar?.length > 0 && (precio.min > payload?.minPrice || precio.max < payload?.maxPrice) ){
  
  const newData = dataFilter.filter((item) =>
    item.name.includes(textNormalizado)
  ).filter(
    (item) => item.price >= precio.min && item.price <= precio.max
  );
  console.log(newData);
  return newData;
 }
  if (searchBar?.length > 0) {
    console.log("serachbar!==0");
    const newData = dataFilter.filter((item) =>
      item.name.includes(textNormalizado)
    );
    console.log(newData);
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
    console.log(" actegories 0", newData);
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
    console.log(" actegories 1", newData);
    return newData;
  }

  if (categories?.length > 0) {
    const newData = dataFilter.filter((item) =>
      item.category.some((cat) => categories.includes(cat))
    );
    console.log("2", newData);
    return newData;
  }
  //filtro raiting
  if( raiting?.length!==0 && (precio.min > payload?.minPrice || precio.max < payload?.maxPrice)){
    const newData = dataFilter.filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    }).filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
    console.log(newData);
    return newData;
  }
  if (raiting?.length !== 0) {
    const newData = dataFilter.filter((item) => {
      return raiting?.includes(Math.round(item.ratingAverage));
    });
    console.log(newData);
    return newData;
  }
  //filtro precio
  if (precio.min > payload?.minPrice || precio.max < payload?.maxPrice) {
    console.log("aca precio filtro");
    const newData = dataFilter.filter(
      (item) => item.price >= precio.min && item.price <= precio.max
    );
    return newData;
  }
  /* // filtro x searhbar
  if(searchBar?.length>0 && categories?.length>0){
    const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    const dataFilter= dataNormalizada.filter((item) =>
      item.name.includes(textNormalizado)
    ).filter((item)=>{return item.category.some((item)=>categories.includes(item))})
    console.log('aca seracbar y categories-->',dataFilter)
    return dataFilter
  }
  if (searchBar?.length > 0) {
    const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    console.log('serachbar!==0')
    return dataNormalizada.filter((item) =>
      item.name.includes(textNormalizado)
    );
  } */

  /*  if (categories?.length !== 0) {
    const dataFilter =
      data &&
      data.filter((item) => {
        return item.category.some((item) =>categories.includes(item));
      });

    console.log(dataFilter, "DATAFILTER AQUI");
    return dataFilter;
  }
  if (raiting?.length !== 0) {
    const dataFilter =
      data &&
      data.filter((item) => {
        return raiting?.includes(Math.round(item.ratingAverage));
      });
    console.log(dataFilter);
    return dataFilter;
  }
  if ((precio?.min >= 100 || precio?.max <= 200) && searchBar?.length > 0) {
    console.log(searchBar.length);
    console.log("esty aca 0");
    console.log(
      precio?.min >= 100 || (precio?.max <= 200 && searchBar?.length > 0)
    );
    const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    return dataNormalizada
      .filter((item) => item.name.includes(textNormalizado))
      .filter((item) => item.price >= precio.min && item.price <= precio.max);
  }
  if (precio?.min >= 100 || precio?.max <= 200) {
    const dataFilter =
      data &&
      data.filter(
        (item) => item.price >= precio.min && item.price <= precio.max
      );

    return dataFilter;
  }
  if (searchBar?.length > 0) {
    const { dataNormalizada, textNormalizado } = normalizeText(searchBar, data);
    return dataNormalizada.filter((item) =>
      item.name.includes(textNormalizado)
    );
  } */
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
