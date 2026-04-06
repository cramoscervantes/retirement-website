import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function FormField({ label, name, value, onChange, colSpan, placeholder }) {
    return (
        <div className={colSpan ? "col-span-2" : ""}>
            <Label className="block text-sm font-medium text-text-muted dark:text-slate-300 mb-1">
                {label}
            </Label>
            <Input
                name={name}
                value={value}
                onChange={onChange}
                className="border border-border-subtle dark:border-slate-600 rounded-md bg-surface dark:bg-slate-700 text-text-primary dark:text-white p-2 w-full"
                placeholder={placeholder}
            />
        </div>
    )
}

export default FormField