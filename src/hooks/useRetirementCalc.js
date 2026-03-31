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

    const [whatIfFields, setWhatIfFields] = useState({
        retirementAge: "",
        currentSavings: "",
        monthlyContribution: "",
        preRetirementRate: "",
        monthlyRetirementBudget: "",
    })

    const [whatIfResults, setWhatIfResults] = useState(null)

    function handleChange(event) {
        const name = event.target.name
        const value = Number(event.target.value)

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    function handleWhatIfChange(event) {
        const name = event.target.name
        const value = event.target.value

        setWhatIfFields({
            ...whatIfFields,
            [name]: value
        })
    }

    function calculate() {
        setResults(calculateRetirement(inputs))

        const mergedInputs = { ...inputs }

        for (const [name, value] of Object.entries(whatIfFields)) {
            if (value != "") {
                mergedInputs[name] = Number(value)
            }
        }

        const anyFilled = Object.values(whatIfFields).some(v => v !== "")
        if (anyFilled) {
            setWhatIfResults(calculateRetirement(mergedInputs))
        }
    }

    return { inputs, results, handleChange, calculate, whatIfFields, whatIfResults, handleWhatIfChange }
}

export default useRetirementCalc
