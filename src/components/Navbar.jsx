import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'



function Navbar() {
    const [isDark, setIsDark] = useState(false)
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if ( savedTheme === "dark" ) {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        }
    }, []);

    function toggleDarkMode() {
        if ( isDark === true ) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setIsDark(false)
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setIsDark(true)
        }
    }

    function navLinkClass(isActive) {
        if ( isActive === true ) {
            return "text-emerald-600"
        } else {
            return "text-slate-900 dark:text-white hover:text-emerald-600"
        }
    }

    return (
        <nav className="w-full bg-slate-100 dark:bg-slate-900 flex p-4 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white items-center">
            <div className="flex-1">
            <p>RetirementSimplified</p>
            </div>
            <div className="flex flex-1 justify-center gap-6">
            <NavLink className={({ isActive }) => navLinkClass(isActive) } to="/">Home</NavLink>
            <NavLink className={({ isActive }) => navLinkClass(isActive) } to="/calculator">Calculator</NavLink>
            <NavLink className={({ isActive }) => navLinkClass(isActive) } to="/budget">Budget</NavLink>
            </div>
            <div className="flex flex-1 justify-end">
            <button onClick={toggleDarkMode} className="px-4 py-2 bg-black rounded-sm hover:bg-emerald-700 text-white">{isDark ? "Light Mode" : "Dark Mode"}</button>
            </div>
        </nav>
    )
}

export default Navbar