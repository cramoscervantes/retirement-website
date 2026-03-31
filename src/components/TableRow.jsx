function TableRow({ metric, value, whatIfValue, impact }) {
    return (
        <tr>
            <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{metric}</td>
            <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{value}</td>

            {whatIfValue &&
                <>
                    <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{whatIfValue}</td>
                    <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{impact}</td>
                </>
            }
        </tr>
    )
}

export default TableRow