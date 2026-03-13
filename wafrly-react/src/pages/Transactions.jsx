import React, { useState, useRef } from 'react';
import './Transactions.css';

const Transactions = () => {
    const fileInputRef = useRef(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productQuantity, setProductQuantity] = useState(1);
    const [storeItems, setStoreItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState({ name: 'All', id: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [isOCRProcessing, setIsOCRProcessing] = useState(false);
    const [ocrResultText, setOcrResultText] = useState('');
    const [showOcrModal, setShowOcrModal] = useState(false);

    // Route API Category IDs for filtering
    const CATEGORIES = [
        { name: "All", id: null },
        { name: "Men's Fashion", id: "6439d5b90049ad0b52b90048" },
        { name: "Women's Fashion", id: "6439d58a0049ad0b52b9003f" },
        { name: "Electronics", id: "6439d2d167d9aa4ca970649f" }
    ];

    // Fetch products from the Route E-commerce API
    const handleBrowseStore = async (categoryId = null) => {
        setIsLoading(true);
        setError('');

        try {
            // Append category filtering if a specific category ID is selected
            let url = 'https://ecommerce.routemisr.com/api/v1/products';
            if (categoryId) {
                // The Route API uses 'category[in]' syntax which MUST be properly URL encoded in fetch
                url += `?category[in]=${categoryId}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch from the Route API');
            }

            const result = await response.json();

            // The Route API returns an object where the products are in a 'data' array
            if (result.data && Array.isArray(result.data)) {
                // Map the Route API schema to our internal structure
                // We'll limit it to 10 products just for UI manageability
                const formattedItems = result.data.slice(0, 10).map(item => ({
                    id: item._id, // Route uses MongoDB _id
                    name: item.title, // Route uses 'title' for product names
                    price: item.price, // Route uses 'price'
                    imageCover: item.imageCover // Route uses 'imageCover' for the thumbnail
                }));
                setStoreItems(formattedItems);
            } else {
                throw new Error('Unexpected API response format');
            }

        } catch (err) {
            console.error(err);
            setError('Could not load catalog from Route Ecommerce. Trying again later.');
            setStoreItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        handleBrowseStore(category.id);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!productName || !productPrice) return;

        const newItem = {
            id: Date.now(),
            name: productName,
            price: parseFloat(productPrice),
            quantity: parseInt(productQuantity, 10),
            totalPrice: parseFloat(productPrice) * parseInt(productQuantity, 10),
            imageCover: productImage // Will be set when clicking a store item
        };

        setCartItems([...cartItems, newItem]);
        setProductName('');
        setProductPrice('');
        setProductQuantity(1);
    };

    const handleOCRClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsOCRProcessing(true);
        setOcrResultText(''); // Clear previous results

        const formData = new FormData();
        formData.append('file', file);
        formData.append('isTable', 'true'); // Recommended for receipts and tables

        try {
            const response = await fetch('https://api.ocr.space/parse/image', {
                method: 'POST',
                headers: {
                    'apikey': 'K89305957388957' // Updated to the real API key
                },
                body: formData
            });

            const data = await response.json();

            if (data.IsErroredOnProcessing) {
                setOcrResultText('OCR Processing Error:\n' + (data.ErrorMessage || 'Unknown error occurred.'));
            } else {
                const results = data.ParsedResults;
                if (results && results.length > 0) {
                    setOcrResultText(results[0].ParsedText || 'API returned no text.');
                } else {
                    setOcrResultText('No text detected in the image.');
                }
            }
        } catch (error) {
            console.error('OCR fetch error:', error);
            setOcrResultText('Failed to connect to the OCR service.');
        } finally {
            setIsOCRProcessing(false);
            setShowOcrModal(true); // Open the modal window
            e.target.value = null; // Reset input field to allow re-uploading the same file
        }
    };

    const handleSubmitOrder = () => {
        if (cartItems.length === 0) return;

        // Save the submitted items to the user's specific local storage
        const userName = localStorage.getItem('wafrly_user_name') || 'Guest';
        const existingOrders = JSON.parse(localStorage.getItem(`wafrly_orders_${userName}`)) || [];

        const newOrder = {
            orderId: Date.now(),
            date: new Date().toISOString(),
            items: cartItems,
            total: cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        };

        localStorage.setItem(`wafrly_orders_${userName}`, JSON.stringify([...existingOrders, newOrder]));

        // Clear cart and show alert
        setCartItems([]);
        alert(`Successfully submitted order with ${cartItems.length} items!`);
    };

    return (
        <div className="transactions-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Transactions & Store</h1>
                    <p className="page-subtitle">Manage your purchases or browse our catalog.</p>
                </div>
            </header>

            <div className="transactions-layout">
                {/* Left Column: Store Browser */}
                <div className="dashboard-card store-card liquid-glass">
                    <div className="card-top">
                        <span className="card-label">Store Catalog</span>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="category-slider">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.name}
                                        className={`category-pill ${activeCategory.name === cat.name ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            <button className="browse-btn border-l border-white/10 pl-4 ml-2" onClick={() => handleBrowseStore(activeCategory.id)} disabled={isLoading}>
                                {isLoading ? 'Browsing...' : 'Browse Store Items'}
                            </button>
                        </div>
                    </div>

                    <div className="search-bar-container mt-4 px-4">
                        <input
                            type="text"
                            className="styled-input w-full"
                            placeholder="Search store items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="store-grid mt-4">
                        {error && !isLoading && (
                            <div className="error-message p-4 text-center text-red-400" style={{ color: '#f87171' }}>
                                {error}
                            </div>
                        )}
                        {storeItems.length === 0 && !isLoading && !error ? (
                            <div className="empty-state">Click "Browse Store Items" to fetch live products from the Route E-ecommerce API.</div>
                        ) : (
                            storeItems
                                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map(item => (
                                    <div
                                        key={item.id}
                                        className="store-item"
                                        onClick={() => {
                                            setProductName(item.name);
                                            setProductPrice(item.price);
                                            setProductImage(item.imageCover);
                                            setProductQuantity(1);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="item-details">
                                            {item.imageCover ? (
                                                <img src={item.imageCover} alt={item.name} className="item-image" loading="lazy" />
                                            ) : (
                                                <div className="item-icon">🛍️</div>
                                            )}
                                            <span className="item-name">{item.name}</span>
                                        </div>
                                        <span className="item-price">EGP {item.price.toFixed(2)}</span>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* Right Column: Add Product Form */}
                <div className="dashboard-card add-product-card liquid-glass">
                    <div className="card-top border-b pb-4 flex justify-between items-center">
                        <span className="card-label">Add Custom Product</span>
                        <div className="ocr-upload-wrapper">
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                className="ocr-btn"
                                onClick={handleOCRClick}
                                disabled={isOCRProcessing}
                            >
                                {isOCRProcessing ? '📷 Scanning...' : '📷 Upload Receipt'}
                            </button>
                        </div>
                    </div>
                    <form className="add-product-form mt-4" onSubmit={handleAddProduct}>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                className="styled-input"
                                placeholder="e.g. Consulting Hour"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPrice">Price (EGP)</label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <input
                                    type="number"
                                    id="productPrice"
                                    className="styled-input w-full"
                                    placeholder="0.00"
                                    step="0.01"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    style={{ flex: 2 }}
                                />
                                <input
                                    type="number"
                                    id="productQuantity"
                                    className="styled-input w-full"
                                    placeholder="Qty"
                                    min="1"
                                    value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="add-btn mt-4">ADD TO CART</button>
                    </form>

                    {/* Cart Display Section */}
                    {cartItems.length > 0 && (
                        <div className="cart-section mt-8 border-t border-white/10 pt-6">
                            <span className="card-label mb-4 block">Your Cart</span>
                            <div className="cart-items-container" style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item flex justify-between py-2 text-sm border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            {item.imageCover ? (
                                                <img src={item.imageCover} alt={item.name} className="cart-item-img-small" />
                                            ) : (
                                                <div className="cart-item-icon-small">🛍️</div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-gray-300">{item.name}</span>
                                                <span className="text-gray-500 text-xs text-muted">x{item.quantity} (EGP {item.price.toFixed(2)} ea)</span>
                                            </div>
                                        </div>
                                        <span className="text-white font-bold self-center">EGP {item.totalPrice.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total flex justify-between py-4 mt-2 border-t border-white/10 text-md font-bold text-mint">
                                <span>Total:</span>
                                <span>EGP {cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleSubmitOrder}
                                className="add-btn w-full mt-2"
                                style={{ background: 'var(--accent-blue)', color: '#fff' }}
                            >
                                SUBMIT ORDER
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* OCR Result Modal */}
            {showOcrModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="dashboard-card liquid-glass" style={{
                        width: '90%', maxWidth: '600px', maxHeight: '80vh',
                        display: 'flex', flexDirection: 'column', gap: '16px'
                    }}>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white" style={{ fontSize: '1.25rem', margin: 0 }}>OCR Scan Result</h2>
                            <button onClick={() => setShowOcrModal(false)} className="text-gray-400 hover:text-white" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem', lineHeight: '1', padding: 0 }}>&times;</button>
                        </div>
                        <div style={{
                            flex: 1, overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.3)',
                            padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap', color: '#e5e7eb',
                            fontFamily: 'monospace', fontSize: '14px'
                        }}>
                            {ocrResultText}
                        </div>
                        <button className="add-btn mt-2" onClick={() => setShowOcrModal(false)}>Close Window</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
