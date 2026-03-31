import { useState } from 'react'
import useRetirementCalc from '../hooks/useRetirementCalc'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FormField from '../components/FormField'
import TableRow from '../components/TableRow'
import { formatCurrency, formatImpact, formatAxisCurrency } from '../utils/formatters'

function Calculator() {
    const { inputs, results, handleChange, calculate, whatIfFields, whatIfResults, handleWhatIfChange, resetWhatIfFields } = useRetirementCalc()
    
    // What if Menu Toggle
    const [ whatIfOpen, setWhatIfOpen ] = useState(false)

    const chartData = results
        ? results.yearByYearData.map((entry, index) => ({
            age: entry.age,
            balance: entry.balance,

            whatIfBalance: whatIfResults ? whatIfResults.yearByYearData[index]?.balance : undefined
        }))
        : null

    return (
        <>
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
        <h1 className="text-4xl text-center font-bold mb-6 text-slate-700 dark:text-slate-300">Retirement Calculator</h1>
            <div className="flex gap-6 flex-wrap">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 max-w-sm min-w-110">
                    <form className="grid grid-cols-2 gap-4">
                        <FormField label="Current Age" name="currentAge" value={inputs.currentAge} onChange={handleChange} colSpan={true} />
                        <FormField label="Annual Pre-Tax Income" name="currentIncome" value={inputs.currentIncome} onChange={handleChange} />
                        <FormField label="Retirement Age" name="retirementAge" value={inputs.retirementAge} onChange={handleChange} />
                        <FormField label="Current Savings" name="currentSavings" value={inputs.currentSavings} onChange={handleChange} />
                        <FormField label="Monthly Contributions ($)" name="monthlyContribution" value={inputs.monthlyContribution} onChange={handleChange} />
                        <FormField label="Pre-Retirement Rate of Return (%)" name="preRetirementRate" value={inputs.preRetirementRate} onChange={handleChange} />
                        <FormField label="Post-Retirement Rate of Return (%)" name="postRetirementRate" value={inputs.postRetirementRate} onChange={handleChange} />
                        <FormField label="Inflation Rate (%)" name="inflationRate" value={inputs.inflationRate} onChange={handleChange} />
                        <FormField label="Life Expectancy (Age)" name="lifeExpectancy" value={inputs.lifeExpectancy} onChange={handleChange} />
                        <FormField label="Monthly Retirement Budget (% of current income)" name="monthlyRetirementBudget" value={inputs.monthlyRetirementBudget} onChange={handleChange} colSpan={true} />
                        <FormField label="Other Monthly Retirement Income ($)" name="otherMonthlyIncome" value={inputs.otherMonthlyIncome} onChange={handleChange} colSpan={true} />
                        <div className="col-span-2">
                            <button className="px-4 py-2 border-2 border-emerald-600 rounded-md w-full flex justify-between hover:bg-slate-100 dark:hover:bg-slate-900" type="button" onClick={ () => setWhatIfOpen(!whatIfOpen) }>
                                <span className="text-emerald-600 font-bold">What If Scenario</span>
                                <span className="text-emerald-600">{ whatIfOpen ? '▲' : '▼' }</span>
                            </button>

                                {whatIfOpen &&
                                    <div className="border-2 border-dashed border-emerald-600 rounded-md border-t-0">
                                        <p className="text-slate-700 dark:text-slate-300 p-2 text-sm italic">Leave any field blank to use your main scenario value.</p>

                                        <div className="grid grid-cols-2 gap-4 p-2">
                                            <FormField 
                                                label="Retirement Age" 
                                                name="retirementAge" 
                                                value={whatIfFields.retirementAge} 
                                                onChange={handleWhatIfChange} 
                                                placeholder={inputs.retirementAge} 
                                            />
                                            <FormField 
                                                label="Current Savings ($)" 
                                                name="currentSavings" 
                                                value={whatIfFields.currentSavings} 
                                                onChange={handleWhatIfChange} 
                                                placeholder={inputs.currentSavings}
                                            />
                                            <FormField 
                                                label="Monthly Contribution ($)" 
                                                name="monthlyContribution" 
                                                value={whatIfFields.monthlyContribution} 
                                                onChange={handleWhatIfChange} 
                                                colSpan={true} 
                                                placeholder={inputs.monthlyContribution}
                                            />
                                            <FormField 
                                                label="Pre-Retirement Rate of Return (%)" 
                                                name="preRetirementRate" 
                                                value={whatIfFields.preRetirementRate} 
                                                onChange={handleWhatIfChange} 
                                                colSpan={true} 
                                                placeholder={inputs.preRetirementRate}
                                            />
                                            <FormField 
                                                label="Monthly Retirement Budget (% of income)" 
                                                name="monthlyRetirementBudget" 
                                                value={whatIfFields.monthlyRetirementBudget} 
                                                onChange={handleWhatIfChange} 
                                                colSpan={true} 
                                                placeholder={inputs.monthlyRetirementBudget}
                                            />
                                        </div>
                                        <div className="p-2">
                                            <button  type="button" className="px-4 py-2 border-2 border-emerald-600 rounded-md w-full hover:bg-slate-100 dark:hover:bg-slate-900 text-emerald-600 font-bold" onClick={resetWhatIfFields}>
                                                Clear What If Fields
                                            </button>
                                        </div>
                                    </div>
                                }
                        </div>
                        <div className="col-span-2">
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white w-full" type="button" onClick={calculate}>Calculate</button>
                        </div>
                    </form>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex-1">
                    <h2 className="text-emerald-600 text-3xl font-bold text-center p-4">Savings Growth Over Time</h2>
                    {results && 
                        <ResponsiveContainer width="100%">
                            <LineChart
                                width={800}
                                height={400}
                                data={chartData}
                            >
                                <CartesianGrid vertical={false} stroke="#D9DDDC" />
                                <XAxis dataKey="age" />
                                <YAxis width={80} tickFormatter={formatAxisCurrency} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#334155', border: 'none' }}
                                    labelStyle={{ color: 'white' }} 
                                    labelFormatter={(label) => 'Age: ' + label}
                                    formatter={(value, name) => {
                                        return [
                                            formatCurrency(value),
                                            name === 'balance' ? 'Current Scenario' : 'What If Scenario'
                                        ]
                                    }}
                                />
                                <Legend 
                                    formatter={(value) => {
                                        return (value === 'balance') ? 'Current Scenario' : 'What If Scenario'
                                    }}
                                    verticalAlign="top"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke='#3b82f6'
                                    strokeWidth={3}
                                    dot={(props) => {
                                        if (props.payload.age === inputs.currentAge + results.yearsUntilRetirement) {
                                            return <circle cx={props.cx} cy={props.cy} r={5} fill="#3b82f6" />  
                                        }
                                        return null
                                    }}
                                />

                                {whatIfResults &&
                                    <Line
                                        type="monotone"
                                        dataKey="whatIfBalance"
                                        stroke="#388143"
                                        strokeWidth={3}
                                        dot={(props) => {
                                            if (props.payload.age === inputs.currentAge + whatIfResults.yearsUntilRetirement) {
                                                return <circle cx={props.cx} cy={props.cy} r={5} fill="#388143" />
                                            }
                                            return null
                                        }}
                                    />
                                
                                }

                            </LineChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mt-6">
                {results && <table className="w-full">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-left text-white bg-emerald-600 rounded-l-md">Metric</th>
                            <th className="py-3 px-4 text-left text-white bg-emerald-600">Current Savings</th>
                            {whatIfResults &&
                                <>
                                    <th className="py-3 px-4 text-left text-white bg-emerald-600">What If</th>
                                    <th className="py-3 px-4 text-left text-white bg-emerald-600 rounded-r-md">Impact</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        <TableRow 
                            metric="Years Until retirement" 
                            value={results.yearsUntilRetirement}
                            whatIfValue={whatIfResults ? whatIfResults.yearsUntilRetirement : undefined}
                            impact={whatIfResults ? formatImpact(results.yearsUntilRetirement, whatIfResults.yearsUntilRetirement, false) : undefined} 
                        />
                        <TableRow 
                            metric="Total Contributions" 
                            value={ formatCurrency(results.totalContributions) }
                            whatIfValue={whatIfResults ?  formatCurrency(whatIfResults.totalContributions) : undefined}
                            impact={whatIfResults ? formatImpact(results.totalContributions, whatIfResults.totalContributions) : undefined}
                        />
                        <TableRow 
                            metric="Interest Earned" 
                            value={ formatCurrency(results.interestEarned) }
                            whatIfValue={ whatIfResults ? formatCurrency(whatIfResults.interestEarned) : undefined }
                            impact={whatIfResults ? formatImpact(results.interestEarned, whatIfResults.interestEarned) : undefined} 
                        />
                        <TableRow 
                            metric="Total Savings at Retirement" 
                            value={ formatCurrency(results.totalSavingsAtRetirement) }
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.totalSavingsAtRetirement) : undefined}
                            impact={whatIfResults ? formatImpact(results.totalSavingsAtRetirement, whatIfResults.totalSavingsAtRetirement) : undefined} 
                        />
                        <TableRow 
                            metric="Inflation-Adjusted Savings (Today's $)" 
                            value={ formatCurrency(results.inflationAdjustedSavings) }
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.inflationAdjustedSavings) : undefined}
                            impact={whatIfResults ? formatImpact(results.inflationAdjustedSavings, whatIfResults.inflationAdjustedSavings) : undefined}
                        />
                        <TableRow 
                            metric="Sustainable Monthly Withdrawal" 
                            value={ formatCurrency(results.sustainableMonthlyWithdrawal) }
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.sustainableMonthlyWithdrawal) : undefined}
                            impact={whatIfResults ? formatImpact(results.sustainableMonthlyWithdrawal, whatIfResults.sustainableMonthlyWithdrawal) : undefined} 
                        />
                        <TableRow 
                            metric="Monthly Income Need at Retirement" 
                            value={ formatCurrency(results.monthlyIncomeNeeded) }
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.monthlyIncomeNeeded) : undefined}
                            impact={whatIfResults ? formatImpact(results.monthlyIncomeNeeded, whatIfResults.monthlyIncomeNeeded) : undefined} 
                        />
                        <TableRow 
                            metric="Monthly Surplus / Deficit" 
                            value={ formatCurrency(results.monthlySurplusDeficit) } 
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.monthlySurplusDeficit) : undefined}
                            impact={whatIfResults ? formatImpact(results.monthlySurplusDeficit, whatIfResults.monthlySurplusDeficit) : undefined}
                        />
                        <TableRow 
                            metric="Balance at End of Life Expectancy"
                            value={ formatCurrency(results.endOfLifeBalance)}
                            whatIfValue={whatIfResults ? formatCurrency(whatIfResults.endOfLifeBalance) : undefined}
                            impact={whatIfResults ? formatImpact(results.endOfLifeBalance, whatIfResults.endOfLifeBalance) : undefined}
                        />
                        <TableRow 
                            metric="Retirement Readiness" 
                            value={ results.retirementReadiness } 
                            whatIfValue={whatIfResults ? whatIfResults.retirementReadiness : undefined}
                        />
                    </tbody>
                
                </table>}
            </div>
        </div>
        </>
    )
}

export default Calculator