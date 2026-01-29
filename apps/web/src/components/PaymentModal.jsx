import React, { useState } from 'react';

export const PaymentModal = ({ amount, description, onSuccess, onClose, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handlePay = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simulating Processing Delay UI
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            if (onSubmit) {
                await onSubmit(); // Execute real API call
            }
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (err) {
            console.error('Payment Error:', err);
            setLoading(false);
            setError(err.message || "Payment failed. Please try again.");
        }
    };

    if (!amount) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="bg-secondary-900 text-white p-6">
                    <h2 className="text-xl font-bold font-display">Secure Payment</h2>
                    <p className="text-secondary-300 text-sm mt-1">SahWiGate Pay</p>
                </div>

                <div className="p-6">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Payment Successful!</h3>
                            <p className="text-gray-500">Redirecting...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ✕
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Transaction Failed</h3>
                            <p className="text-red-500 font-medium mt-2">{error}</p>
                            <button
                                onClick={() => setError(null)}
                                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handlePay} className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Item</p>
                                    <p className="font-bold text-gray-900">{description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                                    <p className="text-2xl font-bold text-primary-600 text-right">${amount.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                                    <input required placeholder="0000 0000 0000 0000" className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">Expiry</label>
                                    <input required placeholder="MM/YY" className="w-full border rounded p-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1">CVC</label>
                                    <input required placeholder="123" className="w-full border rounded p-2 text-sm" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-blue-50 p-2 rounded text-center justify-center">
                                <span>🔒 Encrypted & Secure</span>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 py-3 bg-secondary-900 text-white font-bold rounded-lg hover:bg-black transition-all flex items-center justify-center ${loading ? 'opacity-80' : ''}`}
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        `Pay $${amount.toFixed(2)}`
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
