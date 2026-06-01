import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// define validation schema using zod
const expenseSchema = z.object({
  expenseName: z
    .string()
    .min(3, "Expense name must be at least 3 characters long"),
  category: z.string().min(1, "Category is required"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
});
type ExpenseForm = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseForm) => void;
  categories: string[];
}

const Form = ({ onAddExpense, categories }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
  });

  // handle submit
  const onSubmit = (data: ExpenseForm) => {
    onAddExpense(data);
    reset();
  };

  const amountErrorMessage = errors.amount?.message?.includes("NaN")
    ? "Amount is required"
    : errors.amount?.message;

  return (
    <div className="mx-auto mt-10 max-w-md">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter expense name"
          className="rounded border border-gray-300 p-2"
          {...register("expenseName")}
        />

        {errors.expenseName && (
          <p className="text-sm text-red-500">{errors.expenseName.message}</p>
        )}

        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          placeholder="Enter amount"
          className="rounded border border-gray-300 p-2"
        />
        {amountErrorMessage && (
          <p className="text-sm text-red-500">{amountErrorMessage}</p>
        )}

        <select
          {...register("category")}
          className="rounded border border-gray-300 p-2 bg-white"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Form;
