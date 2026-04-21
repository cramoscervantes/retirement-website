import useBudget from "@/hooks/useBudget"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExpenseSection from "@/components/ExpenseSection"

const CATEGORIES = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Healthcare",
    "Personal",
    "Entertainment",
    "Savings & Investments",
    "Debt Payments",
    "Other",
]

function Budget() {
    const { takeHomePay, expenses, totalBudgeted, remaining, savingsRate, handleTakeHomePayChange, addExpense, updateExpense, removeExpense } = useBudget()

    return (
        <div className="bg-page-bg dark:bg-slate-900 min-h-screen p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-text-primary dark:text-slate-300 mb-6">Budget Worksheet</h1>

                {/* Summary Card */}
                <Card className="bg-surface dark:bg-slate-800 shadow-card mb-8">
                    <CardHeader>
                        <CardTitle className="dark:text-slate-300">Monthly Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Label className="w-40 dark:text-slate-300">Monthly Take-Home Pay</Label>
                            <Input
                                className="w-48"
                                value={takeHomePay}
                                onChange={handleTakeHomePayChange}
                                placeholder="e.g. 4500"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                                <p className="text-sm text-text-muted dark:text-slate-400">Total Budgeted</p>
                                <p className="text-xl font-semibold text-text-primary dark:text-slate-300">${totalBudgeted.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted dark:text-slate-400">Remaining</p>
                                <p className={`text-xl font-semibold ${remaining >= 0 ? "text-brand" : "text-red-500"}`}>
                                    ${remaining.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-text-muted dark:text-slate-400">Savings Rate</p>
                                <p className="text-xl font-semibold text-text-primary dark:text-slate-300">{savingsRate.toFixed(1)}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Expense Sections */}
                <Card className="bg-surface dark:bg-slate-800 shadow-card">
                    <CardContent className="pt-6">
                        {CATEGORIES.map((category) => (
                            <ExpenseSection
                                key={category}
                                category={category}
                                expenses={expenses}
                                onUpdate={updateExpense}
                                onRemove={removeExpense}
                                onAdd={addExpense}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Budget
