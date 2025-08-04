import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CreateTransaction component allows user to add a new transaction
const CreateTransaction = () => {
  // State to hold form data
  const [form, setForm] = useState({
    transactionType: '',
    amount: '',
    description: ''
  });
  // State to hold error message
  const [error, setError] = useState('');
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Handle input changes and clear error
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { transactionType, amount, description } = form;
    // Validate required fields
    if (!transactionType || !amount || !description) {
      setError('All fields are required');
      return;
    }
    // Send POST request to API
    const response = await fetch('http://localhost:8001/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    // If successful, navigate to list page; else show error
    if (response.ok) {
      navigate('/');
    } else {
      const data = await response.json();
      setError(data.error || 'Failed to create transaction');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-10">
      {/* Back button at the top */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        &larr; Back
      </button>
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">Create Transaction</h1>
      {/* Transaction Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Show error message if present */}
        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2 mb-2 text-center">
            {error}
          </div>
        )}
        {/* Transaction Type Field */}
        <div>
          <label className="block mb-2 font-medium">Transaction Type:</label>
          <select
            name="transactionType"
            value={form.transactionType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        {/* Amount Field */}
        <div>
          <label className="block mb-2 font-medium">Amount:</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        {/* Description Field */}
        <div>
          <label className="block mb-2 font-medium">Description:</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;