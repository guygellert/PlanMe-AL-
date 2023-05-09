
const filterData = (query, data,firstFields,secondaryFields) => {
    let dataFiltered = data;
    let filterFieldData = [];
    if (!query) {
      return dataFiltered;
    } else {
        dataFiltered = [];
        firstFields.forEach(field => 
            {
                secondaryFields.forEach(fieldSecond => 
                {
                  filterFieldData = [];
                  filterFieldData = data.filter((d) => d[field][fieldSecond].toLowerCase().includes(query.toLowerCase()));
                  dataFiltered.push(...filterFieldData);
                })

            });
        return dataFiltered;
            
    }
  };

  export default {
    filterData
  }