import useRetirementCalc from '../hooks/useRetirementCalc'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import FormField from '../components/FormField'
import TableRow from '../components/TableRow'

function Calculator() {
    const { inputs, results, handleChange, calculate } = useRetirementCalc()

    return (
        <>
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
        <h1 className="text-4xl text-center font-bold mb-6 text-slate-900 dark:text-white">Retirement Calculator</h1>
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
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white w-full" type="button" onClick={calculate}>Calculate</button>
                        </div>
                    </form>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex-1">
                    {results && 
                        <ResponsiveContainer width="100%">
                            <LineChart
                                width={800}
                                height={400}
                                data={results.yearByYearData}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                                <XAxis dataKey="age" />
                                <YAxis width={80} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke='#388143'
                                />

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
                            <th className="py-3 px-4 text-left text-white bg-emerald-600 rounded-r-md">Current Savings</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        <TableRow metric="Years Until retirement" value={results.yearsUntilRetirement} />
                        <TableRow metric="Total Contributions" value={ '$' + results.totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Interest Earned" value={ '$' + results.interestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Total Savings at Retirement" value={ '$' + results.totalSavingsAtRetirement.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Inflation-Adjusted Savings (Today's $)" value={ '$' + results.inflationAdjustedSavings.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Sustainable Monthly Withdrawal" value={ '$' + results.sustainableMonthlyWithdrawal.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Monthly Income Need at Retirement" value={ '$' + results.monthlyIncomeNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 }) } />
                        <TableRow metric="Monthly Surplus / Deficit" value={ '$' + results.monthlySurplusDeficit.toLocaleString('en-US', { maximumFractionDigits:0 }) } />
                        <TableRow metric="Retirement Readiness" value={ results.retirementReadiness } />
                    </tbody>
                
                </table>}
            </div>
        </div>
        </>
    )
}

export default Calculator