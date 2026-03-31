export function formatCurrency(value) {
    if (value < 0) {
        return '-$' + Math.abs(value).toLocaleString('en-US', {maximumFractionDigits: 0})
    } else {
        return '$' + value.toLocaleString('en-US', {maximumFractionDigits: 0})
    }
}

export function formatImpact(currentValue, whatIfValue, isDollar=true) {
    const diff = whatIfValue - currentValue
    const prefix = diff >= 0 ? ('+') : ('-')
    const absValue = Math.abs(diff).toLocaleString('en-US', {maximumFractionDigits: 0})

    return isDollar ? (
        prefix + '$' + absValue
    ) : (
        prefix + absValue
    )
}

export function formatAxisCurrency(value) {
    if (value >= 1000000) {
        return '$' + (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
        return '$' + (value / 1000).toFixed(1) + 'K'
    } else {
        return '$' + value
    }
}

