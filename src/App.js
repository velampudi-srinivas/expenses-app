// src/App.js
import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

function App() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [view, setView] = useState("table"); // 'table' or 'chart'

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date,
    };
    setExpenses([...expenses, newExpense]);
    setTitle("");
    setAmount("");
    setDate("");
  };

  const chartData = {
    labels: expenses.map((e) => e.title),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((e) => e.amount),
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Daily Expense Tracker</h1>

      <form onSubmit={addExpense} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => setView("table")}>Show Table</button>
        <button onClick={() => setView("chart")}>Show Chart</button>
      </div>

      {view === "table" ? (
        <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>₹{exp.amount}</td>
                <td>{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ width: "600px", marginTop: "20px" }}>
          <Bar data={chartData} />
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
