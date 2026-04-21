import { useState } from "react";

function useBudget() {
    const [takeHomePay, setTakeHomePay] = useState(0)
    const [expenses, setExpenses] = useState([])

    const totalBudgeted = expenses.reduce((total, expense) => total + expense.amount, 0)

    const remaining = takeHomePay - totalBudgeted

    const savingsRate = takeHomePay > 0 ? (remaining / takeHomePay) * 100 : 0

    function handleTakeHomePayChange(event) {
        const value = Number(event.target.value)

        setTakeHomePay(value)
    }

    function addExpense(category) {
        const newExpense = {
            id: Date.now(),
	        category,
	        name: "",
	        amount: "",
	        dueDay: "",
	        isFixed: false
        }
        setExpenses([...expenses, newExpense])
    }

    function updateExpense(id, updatedData) {
        const editedExpenses = expenses.map((expense) => {
            if (expense.id === id) {
                return {...expense, ...updatedData}
            } else {
                return expense
            }
        })

        setExpenses(editedExpenses)
    }

    function removeExpense(id) {
        const removedExpenses = expenses.filter((expense) => expense.id !== id)
        setExpenses(removedExpenses)
    }

    return { 
        takeHomePay, 
        expenses,
        totalBudgeted,
        remaining,
        savingsRate,
        handleTakeHomePayChange, 
        addExpense,
        updateExpense,
        removeExpense
    }
}

export default useBudget