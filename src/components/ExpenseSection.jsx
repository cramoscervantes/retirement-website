import ExpenseTable from "./ExpenseTable"
import { Button } from "./ui/button"

function ExpenseSection({ category, expenses, onUpdate, onRemove, onAdd }) {
    const categoryExpenses = expenses.filter((expense) => expense.category === category)

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary dark:text-slate-300 mb-3">{category}</h3>
            <ExpenseTable
                expenses={categoryExpenses}
                onUpdate={onUpdate}
                onRemove={onRemove}
            />
            <Button variant="outline" className="mt-3" onClick={() => onAdd(category)}>
                + Add {category} Expense
            </Button>
        </div>
    )
}

export default ExpenseSection
