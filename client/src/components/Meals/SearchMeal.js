import {useState} from "react";
import SearchBar from "./SearchBar";
import Filter from "../../utils/filter"
// import classes from "./SearchMeal.module.css";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
const SearchMeal = () => {
  const meals = [{"name":"Pasta","price":6},
                 {"name":"Hamburger","price":9},
                {"name":"Pizza","price":13},
                {"name":"Steak","price":35}]

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = Filter.filterData(searchQuery, meals,["name"]);
  return(
    <div 
    style={{
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 20
    }}
  >
    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <div style={{ padding: 3 }}>
        {dataFiltered.map((d) => (
          <div
            className="text"
            style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}
            key={d.id}
          >
            {d.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchMeal