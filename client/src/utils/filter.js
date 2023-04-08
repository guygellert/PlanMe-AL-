
const filterData = (query, data,fields) => {
    let dataFiltered = data;
    let filterFieldData = [];
    if (!query) {
      return dataFiltered;
    } else {
        dataFiltered = [];
        fields.forEach(field => 
            {
                filterFieldData = [];
                filterFieldData = data.filter((d) => d[field].toLowerCase().includes(query.toLowerCase()));
                dataFiltered.push(...filterFieldData);
            });
        return dataFiltered;
            
    }
  };

  export default {
    filterData
  }