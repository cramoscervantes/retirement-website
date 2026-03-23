import { useState } from "react";
import { calculateRetirement } from "../utils/retirementMath";

function useRetirementCalc() {
    const [inputs, setInputs] = useState({
        currentAge: 25,
        currentIncome: 60000,
        retirementAge: 65,
        currentSavings: 15000,
        monthlyContribution: 500,
        preRetirementRate: 7,
        postRetirementRate: 5,
        inflationRate: 3,
        lifeExpectancy: 95,
        monthlyRetirementBudget: 80,
        otherMonthlyIncome: 1500
    })

    const [results, setResults] = useState(null)

    function handleChange(event) {
        const name = event.target.name
        const value = Number(event.target.value)

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    function calculate() {
        setResults(calculateRetirement(inputs))
    }

    return { inputs, results, handleChange, calculate }
}

export default useRetirementCalc
