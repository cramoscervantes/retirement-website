import { TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

function MetricRow({ metric, value, whatIfValue, impact }) {
    return (
        <TableRow>
            <TableCell className="py-3 px-4 text-text-primary dark:text-slate-300">{metric}</TableCell>
            <TableCell className="py-3 px-4 text-blue-500">{value}</TableCell>

            {whatIfValue &&
                <>
                    <TableCell className="py-3 px-4 text-brand">{whatIfValue}</TableCell>
                    <TableCell className="py-3 px-4 text-text-primary dark:text-slate-300">
                        {impact &&
                            <Badge className={impact.startsWith('+') ? "rounded-xl p-1 px-2 bg-green-100 text-green-700" : "rounded-xl p-1 px-2 bg-red-100 text-red-700" }>
                                {impact}
                            </Badge>
                        }
                    </TableCell>
                </>
            }
        </TableRow>
    )
}

export default MetricRow