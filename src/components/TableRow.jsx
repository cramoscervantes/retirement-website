function TableRow({ metric, value, whatIfValue, impact }) {
    return (
        <tr>
            <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{metric}</td>
            <td className="py-3 px-4 text-blue-500">{value}</td>

            {whatIfValue &&
                <>
                    <td className="py-3 px-4 text-emerald-600">{whatIfValue}</td>
                    <td className="py-3 px-4 text-slate-900 dark:text-slate-300">
                        {impact &&
                            <span className={impact.startsWith('+') ? "rounded-xl p-1 px-2 bg-green-100 text-green-700" : "rounded-xl p-1 px-2 bg-red-100 text-red-700" }>
                                {impact}
                            </span>
                        }
                    </td>
                </>
            }
        </tr>
    )
}

export default TableRow