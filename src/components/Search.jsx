import { useContext, useState } from "react";
import { AppContext } from "../context";

const Search = () => {
    const [searchText, setSearchText] = useState("")
    const { setSearchTerm, getRandomMeal } = useContext(AppContext)

    const handleClick = (e) => {
        setSearchTerm(searchText)
    }
    return (
        <nav>
            <input type="text" placeholder="type favorite meal" value={searchText} onChange={(e) => { setSearchText(e.target.value) }} />
            <input type="button" value="Search" className="search--btn" onClick={handleClick} />
            <input type="button" value="Suprise Me !" className="suprise--btn" onClick={getRandomMeal} />
        </nav>
    );
}

export default Search;