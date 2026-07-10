import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fashionThemes } from "../data/DiscoverData";
import { getAllProducts as fetchProductsAPI } from '../services/api';
import { getMyCart, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from '../services/api';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const Currency = "S";
    const [showSearch, setshowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);
    const [cartError, setCartError] = useState(null);

    // Products state - fetched from backend API
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState(null);

    const navigate = useNavigate();

    // Fetch products from backend API on mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setProductsLoading(true);
                setProductsError(null);
                const response = await fetchProductsAPI();
                if (response.data.success) {
                    setProducts(response.data.products || []);
                }
            } catch (error) {
                console.error('Failed to load products:', error);
                setProductsError('Failed to load products. Please try again.');
            } finally {
                setProductsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Load cart from backend on mount if user is logged in
    useEffect(() => {
        const loadCart = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    setCartLoading(true);
                    const response = await getMyCart();
                    if (response.data.success) {
                        setCart(response.data.cart.items || []);
                    }
                } catch (error) {
                    console.error('Failed to load cart:', error);
                    // Cart might not exist yet, that's okay
                }finally {
                    setCartLoading(false);
                }
            }
        };

        loadCart();
    }, []);

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

    // Add to cart function - syncs with backend
    const addToCart = async (productId, quantity, size) => {
        const product = products.find(item => item._id === productId);
        
        if (!product) {
            showNotification("Product not found", "error");
            return;
        }

        if (!size) {
            showNotification("Please select a size", "error");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            showNotification("Please login to add items to cart", "error");
            navigate('/login');
            return;
        }

        try {
            const response = await addToCartAPI({
                productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
                size
            });

            if (response.data.success) {
                setCart(response.data.cart.items || []);
                showNotification(`${product.name} added to cart`, "success");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to add item to cart';
            showNotification(errorMsg, "error");
            console.error('Error adding to cart:', error);
        }
    };

    // Remove from cart - syncs with backend
    const removeFromCart = async (productId, size) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification("Please login", "error");
            return;
        }

        try {
            const response = await removeFromCartAPI({ productId, size });

            if (response.data.success) {
                setCart(response.data.cart.items || []);
                showNotification("Item removed from cart", "info");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to remove item';
            showNotification(errorMsg, "error");
            console.error('Error removing from cart:', error);
        }
    };

    // Update cart quantity - syncs with backend
    const updateCartQuantity = async (productId, size, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification("Please login", "error");
            return;
        }

        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        try {
            const response = await updateCartItemAPI({ productId, size, quantity });

            if (response.data.success) {
                setCart(response.data.cart.items || []);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to update quantity';
            showNotification(errorMsg, "error");
            console.error('Error updating quantity:', error);
        }
    };

    // Clear cart - syncs with backend
    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification("Please login", "error");
            return;
        }

        try {
            const response = await clearCartAPI();

            if (response.data.success) {
                setCart([]);
                showNotification("Cart cleared", "success");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to clear cart';
            showNotification(errorMsg, "error");
            console.error('Error clearing cart:', error);
        }
    };

    // Show notification
    const showNotification = (message, type = "info") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // handle Search 
    const handleSearchChange = (query) => {
        setSearchQuery(query);
        filterProducts(query);
    }

    // Function to refresh products (useful after admin add/update/delete)
    const refreshProducts = async () => {
        try {
            setProductsLoading(true);
            const response = await fetchProductsAPI();
            if (response.data.success) {
                setProducts(response.data.products || []);
            }
        } catch (error) {
            console.error('Failed to refresh products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    const value = {
        Currency,
        products,
        productsLoading,
        productsError,
        refreshProducts,
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
        notification,
        cartLoading,
        cartError
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider