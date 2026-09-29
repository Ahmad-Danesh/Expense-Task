import { useState } from "react";

function App() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filterCategory, setFilterCategory] = useState("All");

  const [expenses, setExpenses] = useState([]);

  function handleExpenseNameChange(event) {
    setExpenseName(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function addExpense() {
    if (expenseName.trim() !== "" && amount.trim() !== "") {
      const newExpense = {
        name: expenseName,
        amount: Number(amount),
        category: category
      };

      setExpenses([...expenses, newExpense]);

      setExpenseName("");
      setAmount("");
      setCategory("Food");
    }
  }

  function deleteExpense(index) {
    const newExpenses = expenses.filter(
      (item, itemIndex) => itemIndex !== index
    );

    setExpenses(newExpenses);
  }

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter(
          (item) => item.category === filterCategory
        );

  const totalSpent = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="expense-app">

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">$</div>

          <div>
            <h2>Spendly</h2>
            <span>PERSONAL FINANCE</span>
          </div>
        </div>

        <div className="date-box">
          <span>MONTHLY TRACKER</span>
          <strong>My Expenses</strong>
        </div>
      </header>

      <main className="expense-main">

        <section className="hero">

          <div className="hero-content">
            <p className="hero-label">
              PERSONAL EXPENSE TRACKER
            </p>

            <h1>
              Know where
              <br />
              your money <span>goes.</span>
            </h1>

            <p className="hero-text">
              Keep your daily expenses organized and
              understand your spending habits.
            </p>
          </div>

          <div className="balance-card">
            <div className="balance-top">
              <span>Total Spent</span>
              <div className="balance-icon">$</div>
            </div>

            <strong>
              {totalSpent.toLocaleString()} AFN
            </strong>

            <p>
              {expenses.length} recorded expenses
            </p>
          </div>

        </section>

        <section className="add-expense">

          <div className="section-heading">
            <span>01</span>
            <h2>Record Expense</h2>
          </div>

          <div className="expense-form">

            <div className="form-field">
              <label>EXPENSE NAME</label>

              <input
                type="text"
                placeholder="e.g. Internet"
                value={expenseName}
                onChange={handleExpenseNameChange}
              />
            </div>

            <div className="form-field">
              <label>AMOUNT</label>

              <input
                type="number"
                placeholder="e.g. 500"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>

            <div className="form-field">
              <label>CATEGORY</label>

              <select
                value={category}
                onChange={handleCategoryChange}
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Education</option>
                <option>Internet</option>
                <option>Other</option>
              </select>
            </div>

            <button
              className="add-expense-button"
              onClick={addExpense}
            >
              <span>+</span>
              Add Expense
            </button>

          </div>
        </section>

        <section className="expenses-section">

          <div className="expenses-header">

            <div className="section-heading">
              <span>02</span>
              <h2>Recent Expenses</h2>
            </div>

            <select
              className="filter"
              value={filterCategory}
              onChange={(event) =>
                setFilterCategory(event.target.value)
              }
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Education">Education</option>
              <option value="Internet">Internet</option>
              <option value="Other">Other</option>
            </select>

          </div>

          {filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">₿</div>

              <h3>No expenses yet</h3>

              <p>
                Start recording your expenses to see
                your spending activity here.
              </p>
            </div>
          ) : (
            <div className="expense-list">

              {filteredExpenses.map((item, index) => (
                <div className="expense-card" key={index}>

                  <div className="expense-category">
                    <span>
                      {item.category === "Food" && "🍴"}
                      {item.category === "Transport" && "🚗"}
                      {item.category === "Education" && "📚"}
                      {item.category === "Internet" && "🌐"}
                      {item.category === "Other" && "✦"}
                    </span>
                  </div>

                  <div className="expense-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                  </div>

                  <strong className="expense-amount">
                    -{item.amount.toLocaleString()} AFN
                  </strong>

                  <button
                    className="delete-button"
                    onClick={() => deleteExpense(index)}
                  >
                    ×
                  </button>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

      <footer className="footer">
        <strong>Spendly</strong>
        <span>Track smart. Spend wisely.</span>
      </footer>

    </div>
  );
}

export default App;