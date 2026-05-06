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
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

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

    // New From Here

    // Add to cart function
    const addToCart = (productId, quantity, size) => {
        const product = products.find(item => item._id === productId);
        
        if (!product) {
            showNotification("Product not found", "error");
            return;
        }

        if (!size) {
            showNotification("Please select a size", "error");
            return;
        }

        const cartItem = {
            _id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            size,
            totalPrice: product.price * quantity
        };

        const existingItem = cart.find(item => item._id === productId && item.size === size);

        if (existingItem) {
            setCart(cart.map(item => 
                item._id === productId && item.size === size
                    ? { ...item, quantity: item.quantity + quantity, totalPrice: item.price * (item.quantity + quantity) }
                    : item
            ));
            showNotification(`Updated ${product.name} quantity`, "success");
        } else {
            setCart([...cart, cartItem]);
            showNotification(`${product.name} added to cart`, "success");
        }
    };

    // Remove from cart
    const removeFromCart = (productId, size) => {
        setCart(cart.filter(item => !(item._id === productId && item.size === size)));
        showNotification("Item removed from cart", "info");
    };

    // Update cart quantity
    const updateCartQuantity = (productId, size, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }
        setCart(cart.map(item =>
            item._id === productId && item.size === size
                ? { ...item, quantity, totalPrice: item.price * quantity }
                : item
        ));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Show notification
    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };


    // New Upto here

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
        navigate,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        notification
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider