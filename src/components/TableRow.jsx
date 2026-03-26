function TableRow({ metric, value }) {
    return (
        <tr>
            <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{metric}</td>
            <td className="py-3 px-4 text-slate-900 dark:text-slate-300">{value}</td>
        </tr>
    )
}

export default TableRow