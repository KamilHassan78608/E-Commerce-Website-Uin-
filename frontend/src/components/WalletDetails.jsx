import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Loader } from 'lucide-react';
import { getWalletInfo, getMyCards, addCard, deleteCard, setDefaultCard } from '../services/api';

const WalletDetails = () => {
  const [wallet, setWallet] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });

  // Fetch wallet and cards on mount
  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, cardsRes] = await Promise.all([
        getWalletInfo(),
        getMyCards()
      ]);
      setWallet(walletRes.data.wallet);
      setCards(cardsRes.data.cards);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load wallet data');
    } finally {
      setLoading(false);
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await addCard(cardForm);
      if (response.data.success) {
        alert('Card added successfully!');
        setCardForm({
          cardName: '',
          cardNumber: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
          isDefault: false
        });
        setShowAddCard(false);
        fetchWalletData();
      }
    } catch (err) {
      alert('Error adding card: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        const response = await deleteCard(cardId);
        if (response.data.success) {
          alert('Card deleted successfully!');
          fetchWalletData();
        }
      } catch (err) {
        alert('Error deleting card: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleSetDefault = async (cardId) => {
    try {
      const response = await setDefaultCard(cardId);
      if (response.data.success) {
        fetchWalletData();
      }
    } catch (err) {
      alert('Error setting default card: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-96">
        <Loader className="animate-spin w-8 h-8 text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchWalletData}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Wallet</h2>

      {/* Wallet Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 rounded-xl p-6">
          <p className="text-sm text-gray-500">Available Balance</p>
          <h3 className="text-4xl font-bold mt-2">${wallet?.balance || 0}</h3>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <p className="text-sm text-gray-500">Bonus Credits</p>
          <h3 className="text-4xl font-bold mt-2">${wallet?.credits || 0}</h3>
        </div>
      </div>

      {/* Wallet Summary */}
      <div className="mt-6 bg-gray-50 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Spent</p>
            <p className="text-lg font-semibold mt-1">${wallet?.totalSpent || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Earned</p>
            <p className="text-lg font-semibold mt-1">${wallet?.totalEarned || 0}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Transactions</p>
            <p className="text-lg font-semibold mt-1">{wallet?.transactions?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={18} /> Add Card
          </button>
        </div>

        {/* Add Card Form */}
        {showAddCard && (
          <div className="bg-white border rounded-xl p-6 mb-6 shadow-md">
            <h4 className="text-lg font-semibold mb-4">Add New Card</h4>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardForm.cardName}
                    onChange={handleCardInputChange}
                    placeholder="My Visa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardForm.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234567890123456"
                    maxLength="16"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                  <input
                    type="number"
                    name="expiryMonth"
                    value={cardForm.expiryMonth}
                    onChange={handleCardInputChange}
                    placeholder="MM"
                    min="1"
                    max="12"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    name="expiryYear"
                    value={cardForm.expiryYear}
                    onChange={handleCardInputChange}
                    placeholder="YYYY"
                    min={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardForm.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={cardForm.isDefault}
                      onChange={handleCardInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">Set as Default</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                >
                  Add Card
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cards List */}
        {cards.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card._id}
                className={`border rounded-xl p-5 hover:shadow-md transition ${
                  card.isDefault ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{card.cardName}</h4>
                  {card.isDefault && (
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mt-4 text-lg tracking-wider">{card.cardNumber}</p>

                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>
                    {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                  </span>
                </div>

                <div className="flex gap-3 mt-4">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card._id)}
                      className="flex-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCard(card._id)}
                    className="flex items-center justify-center gap-1 text-red-500 hover:text-red-600 font-medium"
                  >
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No cards added yet. Add your first card to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default WalletDetails
