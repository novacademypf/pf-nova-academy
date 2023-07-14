export const filters = (options, data) => {
    console.log('data-->', data);
    const { searchBar } = options;
    if (searchBar !== '') {
        const textNormalizado = searchBar.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const dataFilter = data && data.map((item) => ({ ...item, name: item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') })).filter((item) => item.name.includes(textNormalizado));
        console.log('datafilter-->',dataFilter)
        return dataFilter
    }
};
