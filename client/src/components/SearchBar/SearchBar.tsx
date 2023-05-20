import { useState } from "react";
import {Search} from '@mui/icons-material';
import {TextField,IconButton,Autocomplete} from "@mui/material";
import SpeechButton from './SpeechButton'
import "./SearchBar.css";
import MealServer from "../../serverAPI/meal";

const SearchBar: React.FC = () => { 
  const [searchQuery, setSearchQuery] = useState("");

  const extentiveSearch = () => 
  {
    MealServer.getMealBySearch(searchQuery);
  }
    return (
    <><form className="centerForm">
        <div className="inputRounded">
          <TextField
            id="search-bar"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            } }
            label="Search For A Meal"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchQuery} />
        </div>
        <IconButton onClick={extentiveSearch} type="submit" aria-label="search">
          <Search style={{ fill: "blue" }} />
        </IconButton>
        <SpeechButton setSearchQuery={setSearchQuery}></SpeechButton>
      </form><h2>Search results:</h2></>
  )
    }
    export default SearchBar