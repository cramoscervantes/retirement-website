import { TableRow, TableCell } from "./ui/table"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { X } from 'lucide-react'

function ExpenseRow({id, name, amount, dueDay, isFixed, onUpdate, onRemove}) {
    return (
        <>
            <TableRow>
                <TableCell><Input value={name} onChange={(e) => onUpdate(id, { name: e.target.value })} /></TableCell>
                <TableCell><Input value={amount} onChange={(e) => onUpdate(id, { amount: Number(e.target.value) })} /></TableCell>
                <TableCell><Input value={dueDay} onChange={(e) => onUpdate(id, { dueDay: Number(e.target.value) })} /></TableCell>
                <TableCell><input type="checkbox" checked={isFixed} onChange={(e) => onUpdate(id, { isFixed: e.target.checked })} className="h-4 w-4 cursor-pointer accent-brand" /></TableCell>
                <TableCell><Button onClick={() => onRemove(id)}><X /></Button></TableCell>
            </TableRow>
        </>
    )
}

export default ExpenseRow