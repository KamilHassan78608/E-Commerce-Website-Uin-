import { createContext } from "react";
import products from '../data/Products';
import { fashionThemes } from "../data/DiscoverData";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const Currency = "S";

    const value = {
        Currency,
        products,
        fashionThemes,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider