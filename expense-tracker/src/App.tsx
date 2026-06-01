import { useState } from "react";
import ExpenseTable from "./components/ExpenseTable";
import ExpenseForm from "./components/ExpenseForm";

// should be same type as zod creates for the form data + id
export type Expense = {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filters = ["All", "family", "food", "transportation", "entertainment"];
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const addExpense = (data: Omit<Expense, "id">) => {
    // “Take Expense type, but remove the id field so Expense matches type created by ZOD!”
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...data,
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Expense Tracker</h1>

      <ExpenseForm onAddExpense={addExpense} categories={filters} />

      <ExpenseTable
        expenses={filteredExpenses}
        onDeleteExpense={deleteExpense}
        onCategoryChange={handleCategoryChange}
        filters={filters}
      />
    </div>
  );
}

export default App;
