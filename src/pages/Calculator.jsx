import useRetirementCalc from '../hooks/useRetirementCalc'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

function Calculator() {
    const { inputs, results, handleChange, calculate } = useRetirementCalc()

    return (
        <>
        <h1>Retirement Calculator</h1>
        <div>
            <form>
                <label>Current Age</label>
                <input name="currentAge" value={inputs.currentAge} onChange={handleChange} />
                <label>Annual Pre-Tax Income</label>
                <input name="currentIncome" value={inputs.currentIncome} onChange={handleChange} />
                <label>Retirement Age</label>
                <input name="retirementAge" value={inputs.retirementAge} onChange={handleChange} />
                <label>Current Savings ($)</label>
                <input name="currentSavings" value={inputs.currentSavings} onChange={handleChange} />
                <label>Monthly Contributions ($)</label>
                <input name="monthlyContribution" value={inputs.monthlyContribution} onChange={handleChange} />
                <label>Pre-Retirement Rate of Return (%)</label>
                <input name="preRetirementRate" value={inputs.preRetirementRate} onChange={handleChange} />
                <label>Post-Retirement Rate of Return (%)</label>
                <input name="postRetirementRate" value={inputs.postRetirementRate} onChange={handleChange} />
                <label>Inflation Rate (%)</label>
                <input name="inflationRate" value={inputs.inflationRate} onChange={handleChange} />
                <label>Life Expectancy (Age)</label>
                <input name="lifeExpectancy" value={inputs.lifeExpectancy} onChange={handleChange} />
                <label>Monthly Retirement Budget (% of current income)</label>
                <input name="monthlyRetirementBudget" value={inputs.monthlyRetirementBudget} onChange={handleChange} />
                <label>Other Monthly Retirement Income ($)</label>
                <input name="otherMonthlyIncome" value={inputs.otherMonthlyIncome} onChange={handleChange} />
                <button type="button" onClick={calculate}>Calculate</button>
            </form>
            
            {results && <LineChart
                width={800}
                height={400}
                data={results.yearByYearData}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke='#388143'
                />

            </LineChart>}

            {results && <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Current Savings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Years Until retirement</td>
                        <td>{results.yearsUntilRetirement}</td>
                    </tr>
                    <tr>
                        <td>Total Contributions</td>
                        <td>${results.totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Interest Earned</td>
                        <td>${results.interestEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Total Savings at Retirement</td>
                        <td>${results.totalSavingsAtRetirement.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Inflation-Adjusted Savings (Today's $)</td>
                        <td>${results.inflationAdjustedSavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Sustainable Monthly Withdrawal</td>
                        <td>${results.sustainableMonthlyWithdrawal.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Monthly Income Need at Retirement</td>
                        <td>${results.monthlyIncomeNeeded.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    </tr>
                    <tr>
                        <td>Monthly Surplus / Deficit</td>
                        <td>${results.monthlySurplusDeficit.toLocaleString('en-US', { maximumFractionDigits:0 })}</td>
                    </tr>
                    <tr>
                        <td>Retirement Readiness</td>
                        <td>{results.retirementReadiness}</td>
                    </tr>
                </tbody>
            
            </table>}
        </div>
        </>
    )
}

export default Calculator