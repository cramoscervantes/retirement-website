import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"
import ExpenseRow from "./ExpenseRow"

function ExpenseTable({ expenses, onUpdate, onRemove }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount ($)</TableHead>
                    <TableHead>Due Day</TableHead>
                    <TableHead>Fixed</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-200 dark:divide-slate-700">
                {expenses.map((expense) => (
                    <ExpenseRow
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        amount={expense.amount}
                        dueDay={expense.dueDay}
                        isFixed={expense.isFixed}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

export default ExpenseTable
