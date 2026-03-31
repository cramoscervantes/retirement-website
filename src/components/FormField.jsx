function FormField({ label, name, value, onChange, colSpan, placeholder }) {
    return (
        <div className={colSpan ? "col-span-2" : ""}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {label}
            </label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white p-2 w-full"
                placeholder={placeholder}
            />
        </div>
    )
}

export default FormField