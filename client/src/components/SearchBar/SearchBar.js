import { useState } from "react";
import {Search} from '@mui/icons-material';
import {TextField,IconButton,Autocomplete} from "@mui/material";
import SpeechButton from './SpeechButton'
import classes from "./SearchBar.module.css";
const SearchBar = ({searchQuery,setSearchQuery}) => { 
    return (
    <form className={classes.centerForm}>
    <div className={classes.inputRounded}>
      <TextField
        id="search-bar"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Search For A Meal"
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={searchQuery}
      />
      </div>
      <IconButton type="submit" aria-label="search">
        <Search style={{ fill: "blue" }} />
      </IconButton>
      <SpeechButton setSearchQuery={setSearchQuery}></SpeechButton>
    </form>
  )
    }
    export default SearchBar