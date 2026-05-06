import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from '../data/Products';
import { fashionThemes } from "../data/DiscoverData";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const Currency = "S";
    const [showSearch, setshowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    // Search filter function
    const filterProducts = (query) => {
        // If Query is Empty
        if(!query.trim()){
            setSearchResults([]);
            return
        }

        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.subCategory.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filtered);
    }

    // handle Search 
    const handleSearchChange = (query) => {
        setSearchQuery(query);
        filterProducts(query);
    }

    const value = {
        Currency,
        products,
        fashionThemes,
        showSearch, setshowSearch,
        searchQuery, setSearchQuery,
        searchResults, setSearchResults,
        handleSearchChange,
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider