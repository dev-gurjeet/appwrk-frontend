import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// TransactionsList component displays all transactions in a styled table
const TransactionsList = () => {
    // State to hold the list of transactions
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the API when the component mounts
    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_URL}/transactions`)
            .then(res => res.json())
            .then(data => setTransactions(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">Transactions List</h1>
            
            {/* Button to navigate to the create transaction page */}
            <div className="flex justify-end mb-4">
                <Link
                    to="/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Create New Transaction
                </Link>
            </div>
            
            {/* Transactions Table */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Description</th>
                            <th className="py-2 px-4 border-b text-left">Credit</th>
                            <th className="py-2 px-4 border-b text-left">Debit</th>
                            <th className="py-2 px-4 border-b text-left">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render each transaction row */}
                        {transactions.length ? transactions.map((txn, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                {/* Format date using dayjs */}
                                <td className="py-2 px-4 border-b">{dayjs(txn.date).format('DD/MM/YYYY')}</td>
                                <td className="py-2 px-4 border-b">{txn.description}</td>
                                <td className="py-2 px-4 border-b">{txn.credit || '-'}</td>
                                <td className="py-2 px-4 border-b">{txn.debit || '-'}</td>
                                <td className="py-2 px-4 border-b">{txn.balance}</td>
                            </tr>
                        )) :
                            // Show message if no transactions found
                            <tr className="hover:bg-gray-50 text-center">
                                <td colSpan={5} className="py-2 px-4 border-b">No Records</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionsList;