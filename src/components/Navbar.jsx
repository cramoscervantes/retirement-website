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

    return (
        <nav className="w-full bg-slate-100 dark:bg-slate-900 flex p-4 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/calculator">Calculator</NavLink>
            <NavLink to="/budget">Budget</NavLink>

            <button onClick={toggleDarkMode} className="ml-auto">{isDark ? "Light Mode" : "Dark Mode"}</button>
        </nav>
    )
}

export default Navbar