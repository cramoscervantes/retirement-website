export function calculateRetirement(inputs) {

    // Phase 1 - Accumulation
    const { currentAge, currentIncome, retirementAge,
            currentSavings, monthlyContribution, preRetirementRate,
            postRetirementRate, inflationRate, lifeExpectancy,
            monthlyRetirementBudget, otherMonthlyIncome } = inputs

    const yearsUntilRetirement = retirementAge - currentAge
    const monthlyPreRetirementRate = (preRetirementRate / 100) / 12
    const monthlyPostRetirementRate = (postRetirementRate / 100) / 12

    const yearByYearData = []
    const monthlyRetirementNeed = currentIncome * (monthlyRetirementBudget / 100 ) / 12
    const netMonthlyWithdrawl = monthlyRetirementNeed - otherMonthlyIncome
    let ageRanOutOfMoney = null
    let balance = currentSavings

    for (let i = 0; i <= yearsUntilRetirement; i++) {
        const newBalance = ( balance * Math.pow(1 + monthlyPreRetirementRate, 12) ) +
                           ( monthlyContribution * (Math.pow(1 + monthlyPreRetirementRate, 12) - 1) 
                           / monthlyPreRetirementRate)  
        balance = newBalance

        // Push to Array
        yearByYearData.push({ age: currentAge + i, balance: Math.round(balance) })
    }

    // after the loop is complete save that balance to total retirement savings
    const totalSavingsAtRetirement = balance
    const totalContributions = monthlyContribution * (yearsUntilRetirement * 12)
    const interestEarned = totalSavingsAtRetirement - totalContributions - currentSavings
    const inflationAdjustedSavings = 
        totalSavingsAtRetirement / 
        Math.pow(1 + inflationRate / 100, yearsUntilRetirement)
    const yearsInRetirement = lifeExpectancy - retirementAge
    const sustainableMonthlyWithdrawal = 
        totalSavingsAtRetirement * monthlyPostRetirementRate
        / (1 - Math.pow(1 + monthlyPostRetirementRate, -(yearsInRetirement * 12)) )
    const monthlyIncomeNeeded = 
        netMonthlyWithdrawl * Math.pow(1 + inflationRate / 100, yearsUntilRetirement)
    let monthlySurplusDeficit = sustainableMonthlyWithdrawal - monthlyIncomeNeeded

    // Phase 2 Decumulation
    for (let i = 1; i <= yearsInRetirement; i++) {
        const newBalance = ( balance * Math.pow(1 + monthlyPostRetirementRate, 12) )
        balance = newBalance

        // inflation withdraw
        const annualWithdrawal = netMonthlyWithdrawl * 12 * Math.pow(1 + inflationRate / 100, yearsUntilRetirement + i)
        balance = balance - annualWithdrawal

        if ( balance < 0 ) {
            balance = 0;
            if ( ageRanOutOfMoney === null) {
                ageRanOutOfMoney = retirementAge + i
            }
        }

        yearByYearData.push({ age: retirementAge + i, balance: Math.round(balance) })
    }

    const retirementReadiness = ageRanOutOfMoney === null ? "On track" : "Shortfall"
    if (ageRanOutOfMoney !== null) {
    monthlySurplusDeficit = -Math.abs(monthlySurplusDeficit)
}

    // end of life balance
    const endOfLifeBalance = yearByYearData.at(-1).balance

    return {
        totalSavingsAtRetirement,
        yearByYearData,
        ageRanOutOfMoney,
        totalContributions,
        interestEarned,
        inflationAdjustedSavings,
        sustainableMonthlyWithdrawal,
        monthlyIncomeNeeded,
        monthlySurplusDeficit,
        retirementReadiness,
        yearsUntilRetirement,
        endOfLifeBalance
    }
}