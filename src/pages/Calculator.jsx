import { useState } from 'react'
import useRetirementCalc from '../hooks/useRetirementCalc'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FormField from '../components/FormField'
import MetricRow from '../components/MetricRow'
import { formatCurrency, formatImpact, formatAxisCurrency } from '../utils/formatters'
import { Table, TableHeader, TableBody, TableHead, TableRow } from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


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
        <div className="bg-page-bg dark:bg-slate-900 min-h-screen p-6">
            <div className="flex gap-6 flex-wrap">
                <Card className="bg-surface dark:bg-slate-800 rounded-lg shadow-card p-6 max-w-sm min-w-110 self-start ring-1 ring-border-card">
                    <h2 className="text-3xl font-bold font-bold text-brand dark:text-slate-300">Retirement Calculator</h2>
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
                            <Button variant="outline" className="px-4 py-2 border-2 border-brand rounded-md w-full flex justify-between hover:bg-page-bg dark:hover:bg-slate-900 cursor-pointer" type="button" onClick={ () => setWhatIfOpen(!whatIfOpen) }>
                                <span className="text-brand font-bold">What If Scenario</span>
                                <span className="text-brand">{ whatIfOpen ? '▲' : '▼' }</span>
                            </Button>

                                {whatIfOpen &&
                                    <div className="border-2 border-dashed border-brand rounded-md border-t-0">
                                        <p className="text-text-primary dark:text-slate-300 p-2 text-sm italic">Leave any field blank to use your main scenario value.</p>

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
                                            <Button  type="button" variant="outline" className="px-4 py-2 border-2 border-brand rounded-md w-full hover:bg-page-bg dark:hover:bg-slate-900 text-brand font-bold cursor-pointer" onClick={resetWhatIfFields}>
                                                Clear What If Fields
                                            </Button>
                                        </div>
                                    </div>
                                }
                        </div>
                        <div className="col-span-2">
                        <Button className="px-4 py-2 bg-brand hover:bg-brand-hover rounded-md text-white w-full cursor-pointer" type="button" onClick={calculate}>Calculate</Button>
                        </div>
                    </form>
                </Card>
                {/* Right Column Wrapper */}
                <div className="flex flex-col gap-6 flex-1">
                    {/* Chart Card */}
                    <Card className="bg-surface dark:bg-slate-800 rounded-lg shadow-card flex flex-col min-h-176 ring-1 ring-border-card">
                        <CardHeader className="pt-1">
                            <CardTitle className="text-brand text-3xl font-bold text-center">Savings Growth Over Time</CardTitle>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col px-4">
                            <div className="flex-1">
                                {results
                                    ? <ResponsiveContainer width="100%" height="100%" >
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
                                                iconType="line"
                                                iconSize={20}
                                                wrapperStyle={{ fontSize: '14px', fontWeight: '600', paddingBottom: '12px' }}
                                                formatter={(value) => (
                                                    <span style={{ color: '#334155' }}>
                                                        {value === 'balance' ? 'Current Scenario' : 'What If Scenario'}
                                                    </span>
                                                )}
                                                verticalAlign="bottom"
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
                                                    strokeDasharray="6 3"
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

                                :
                                    <div className="flex items-center justify-center h-125">
                                        <p>Enter your details and click Calculate to see your savings projection.</p>
                                    </div>
                                }
                            </div>
                        </CardContent>
                    {/* Closes Chart Card */}
                    </Card>
                    {/* Table Card */}
                    {results &&
                        <Card className="bg-surface dark:bg-slate-800 rounded-lg shadow-card p-6 ring-1 ring-border-card"> 
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="py-3 px-4 text-white bg-brand rounded-l-md">Metric</TableHead>
                                        <TableHead className="py-3 px-4 text-white bg-brand">Current Savings</TableHead>
                                        {whatIfResults &&
                                            <>
                                                <TableHead className="py-3 px-4 text-white bg-brand">What If</TableHead>
                                                <TableHead className="py-3 px-4 text-white bg-brand rounded-r-md">Impact</TableHead>
                                            </>
                                        }
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    <MetricRow 
                                        metric="Years Until retirement" 
                                        value={results.yearsUntilRetirement}
                                        whatIfValue={whatIfResults ? whatIfResults.yearsUntilRetirement : undefined}
                                        impact={whatIfResults ? formatImpact(results.yearsUntilRetirement, whatIfResults.yearsUntilRetirement, false) : undefined} 
                                    />
                                    <MetricRow
                                        metric="Total Contributions" 
                                        value={ formatCurrency(results.totalContributions) }
                                        whatIfValue={whatIfResults ?  formatCurrency(whatIfResults.totalContributions) : undefined}
                                        impact={whatIfResults ? formatImpact(results.totalContributions, whatIfResults.totalContributions) : undefined}
                                    />
                                    <MetricRow
                                        metric="Interest Earned" 
                                        value={ formatCurrency(results.interestEarned) }
                                        whatIfValue={ whatIfResults ? formatCurrency(whatIfResults.interestEarned) : undefined }
                                        impact={whatIfResults ? formatImpact(results.interestEarned, whatIfResults.interestEarned) : undefined} 
                                    />
                                    <MetricRow
                                        metric="Total Savings at Retirement" 
                                        value={ formatCurrency(results.totalSavingsAtRetirement) }
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.totalSavingsAtRetirement) : undefined}
                                        impact={whatIfResults ? formatImpact(results.totalSavingsAtRetirement, whatIfResults.totalSavingsAtRetirement) : undefined} 
                                    />
                                    <MetricRow 
                                        metric="Inflation-Adjusted Savings (Today's $)" 
                                        value={ formatCurrency(results.inflationAdjustedSavings) }
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.inflationAdjustedSavings) : undefined}
                                        impact={whatIfResults ? formatImpact(results.inflationAdjustedSavings, whatIfResults.inflationAdjustedSavings) : undefined}
                                    />
                                    <MetricRow 
                                        metric="Sustainable Monthly Withdrawal" 
                                        value={ formatCurrency(results.sustainableMonthlyWithdrawal) }
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.sustainableMonthlyWithdrawal) : undefined}
                                        impact={whatIfResults ? formatImpact(results.sustainableMonthlyWithdrawal, whatIfResults.sustainableMonthlyWithdrawal) : undefined} 
                                    />
                                    <MetricRow 
                                        metric="Monthly Income Need at Retirement" 
                                        value={ formatCurrency(results.monthlyIncomeNeeded) }
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.monthlyIncomeNeeded) : undefined}
                                        impact={whatIfResults ? formatImpact(results.monthlyIncomeNeeded, whatIfResults.monthlyIncomeNeeded) : undefined} 
                                    />
                                    <MetricRow 
                                        metric="Monthly Surplus / Deficit" 
                                        value={ formatCurrency(results.monthlySurplusDeficit) } 
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.monthlySurplusDeficit) : undefined}
                                        impact={whatIfResults ? formatImpact(results.monthlySurplusDeficit, whatIfResults.monthlySurplusDeficit) : undefined}
                                    />
                                    <MetricRow 
                                        metric="Balance at End of Life Expectancy"
                                        value={ formatCurrency(results.endOfLifeBalance)}
                                        whatIfValue={whatIfResults ? formatCurrency(whatIfResults.endOfLifeBalance) : undefined}
                                        impact={whatIfResults ? formatImpact(results.endOfLifeBalance, whatIfResults.endOfLifeBalance) : undefined}
                                    />
                                    <MetricRow 
                                        metric="Retirement Readiness" 
                                        value={ results.retirementReadiness } 
                                        whatIfValue={whatIfResults ? whatIfResults.retirementReadiness : undefined}
                                    />
                                </TableBody>
                        
                            </Table>
                        </Card>
                    }
                {/* Closes Right Column Wrapper */}
                </div>
            </div>

        </div>
        </>
    )
}

export default Calculator