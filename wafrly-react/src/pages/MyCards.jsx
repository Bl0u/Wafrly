import React, { useState } from 'react';
import './MyCards.css';

const MyCards = () => {
    // Initial mock cards
    const [savedCards, setSavedCards] = useState([
        { id: 1, name: 'John Doe', number: '•••• •••• •••• 4242', expiry: '12/25', type: 'visa' },
        { id: 2, name: 'John Doe', number: '•••• •••• •••• 8812', expiry: '08/26', type: 'mastercard' },
    ]);

    // Form state
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');

    const handleAddCard = (e) => {
        e.preventDefault();

        // Basic validation
        if (!cardName || cardNumber.length < 15 || !cardExpiry || !cardCVC) {
            alert("Please fill in all card details correctly.");
            return;
        }

        // Determine card type simply by first digit for mockup (4 = Visa, 5 = Mastercard)
        let type = 'generic';
        if (cardNumber.startsWith('4')) type = 'visa';
        else if (cardNumber.startsWith('5')) type = 'mastercard';

        // Mask the number for display
        const lastFour = cardNumber.slice(-4);
        const maskedNumber = `•••• •••• •••• ${lastFour}`;

        const newCard = {
            id: Date.now(),
            name: cardName,
            number: maskedNumber,
            expiry: cardExpiry,
            type: type
        };

        setSavedCards([newCard, ...savedCards]);

        // Reset form
        setCardName('');
        setCardNumber('');
        setCardExpiry('');
        setCardCVC('');
    };

    const formatCardNumber = (value) => {
        // Remove all non digits
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleNumberChange = (e) => {
        setCardNumber(formatCardNumber(e.target.value));
    };

    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 2) {
            val = val.substring(0, 2) + "/" + val.substring(2, 4);
        }
        setCardExpiry(val);
    };

    return (
        <div className="my-cards-page">
            <header className="page-header">
                <div>
                    <h1 className="page-title">My Cards</h1>
                    <p className="page-subtitle">Manage your credit and debit cards securely.</p>
                </div>
            </header>

            <div className="cards-layout">
                {/* Left Column: Saved Cards Wallet */}
                <div className="dashboard-card wallet-card liquid-glass">
                    <div className="card-top mb-6 border-b pb-4">
                        <span className="card-label">Your Digital Wallet</span>
                    </div>

                    <div className="wallet-grid mt-4">
                        {savedCards.length === 0 ? (
                            <div className="empty-state">No cards added yet.</div>
                        ) : (
                            savedCards.map(card => (
                                <div key={card.id} className={`credit-card-display ${card.type}`}>
                                    <div className="card-logo">
                                        {card.type === 'visa' && <span className="visa-logo">VISA</span>}
                                        {card.type === 'mastercard' && (
                                            <div className="mc-logo">
                                                <div className="mc-circle red"></div>
                                                <div className="mc-circle orange"></div>
                                            </div>
                                        )}
                                        {card.type === 'generic' && <span className="generic-logo">CARD</span>}
                                    </div>
                                    <div className="card-chip"></div>
                                    <div className="card-number-display">{card.number}</div>
                                    <div className="card-bottom">
                                        <div className="card-name-display">
                                            <span>Cardholder Name</span>
                                            <div>{card.name}</div>
                                        </div>
                                        <div className="card-expiry-display">
                                            <span>Valid Thru</span>
                                            <div>{card.expiry}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Add Card Form */}
                <div className="dashboard-card add-card-form-container liquid-glass">
                    <div className="card-top border-b pb-4 mb-4">
                        <span className="card-label">Add New Card</span>
                    </div>

                    <form className="add-card-form" onSubmit={handleAddCard}>
                        <div className="form-group full-width">
                            <label htmlFor="cardName">Cardholder Name</label>
                            <input
                                type="text"
                                id="cardName"
                                className="styled-input"
                                placeholder="Name as it appears on card"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                className="styled-input font-mono"
                                placeholder="0000 0000 0000 0000"
                                maxLength="19"
                                value={cardNumber}
                                onChange={handleNumberChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label htmlFor="cardExpiry">Expiry Date</label>
                                <input
                                    type="text"
                                    id="cardExpiry"
                                    className="styled-input font-mono"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    value={cardExpiry}
                                    onChange={handleExpiryChange}
                                    required
                                />
                            </div>
                            <div className="form-group half-width">
                                <label htmlFor="cardCVC">CVC / CVV</label>
                                <input
                                    type="text"
                                    id="cardCVC"
                                    className="styled-input font-mono"
                                    placeholder="123"
                                    maxLength="4"
                                    value={cardCVC}
                                    onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ""))}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="add-btn mt-6">Securely Add Card</button>
                        <p className="security-notice mt-4 text-center">
                            🔒 Your data is encrypted and secure.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyCards;
