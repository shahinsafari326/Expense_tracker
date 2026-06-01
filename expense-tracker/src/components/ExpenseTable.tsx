import type { Expense } from "../App";

interface ExpenseProps {
  expenses: Expense[];
  filters: string[];
  onDeleteExpense: (id: string) => void;
  onCategoryChange: (category: string) => void;
}

const ExpenseTable = ({
  expenses,
  filters,
  onDeleteExpense,
  onCategoryChange,
}: ExpenseProps) => {
  return (
    <div className="mt-10">
      <div className="mx-auto mt-10 max-w-md flex flex-col gap-4 mb-5">
        <select
          className="rounded border border-gray-300 p-2 bg-white"
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Amount</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t">
              <td className="border p-2">{expense.expenseName}</td>
              <td className="border p-2">€ {expense.amount}</td>
              <td className="border p-2">{expense.category}</td>

              <td className="border p-2">
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-green-100 font-bold">
            <td className="border p-2">Total</td>
            <td className="border p-2">
              €{" "}
              {expenses
                .reduce((total, expense) => total + expense.amount, 0)
                .toFixed(2)}
            </td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        </tfoot>
      </table>

      {expenses.length === 0 && (
        <p className="mt-4 text-gray-500">No expenses yet</p>
      )}
    </div>
  );
};
export default ExpenseTable;
