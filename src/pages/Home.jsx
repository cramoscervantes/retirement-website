import { Link } from "react-router-dom"
import FeatureShowcase from "@/components/FeatureShowcase"

function Home() {
    const base = import.meta.env.BASE_URL

    return (
        <main className="bg-page-bg dark:bg-slate-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <section className="text-center max-w-xl mx-auto py-1">
                    <h1 className="text-5xl font-extrabold text-brand">Simplify Retirement Planning</h1>
                    <h2 className="text-xl text-text-primary dark:text-slate-300 mt-3">Are you On Track for Retirement?</h2>
                    <p className="text-text-primary dark:text-slate-300 leading-relaxed m-4">When it comes to retirement 
                        planning, there are many factors involved in knowing whether you are on track. 
                        Retirement Simplified helps you visually understand your retirement outlook.
                    </p>
                    <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-hover">
                        <Link to="/calculator">Calculate Your Retirement</Link>
                    </button>
                </section>
                <section className="py-12">
                    <h3 className="text-brand font-bold text-2xl uppercase tracking-widest mb-8">Features</h3>
                    <div>
                        <FeatureShowcase 
                            bullets={[
                                {title: "Enter your retirement values.", description: "Fill in your current retirement values to see your projected scenario outcomes.", image: base + "fullscreen-calc-no-what-if-no-table.png"},
                                {title: "See your results on the graph.", description: "Once you hit Calculate, the graph will populate with your projected savings growth based on your retirement values.", image: base + "fullscreen-calc-no-what-if-no-table.png"},
                                {title: "See key indicators on your retirement.", description: "See key retirement indicators at a glance, based on your current values.", image: base + "calc-results-table.png"},
                                {title: "Run What If Scenarios.", description: "Use the optional What If scenario to compare your current retirement values against alternative assumptions.", image: base + "calc-form-whatif.png"},
                                {title: "Compare Current Scenario versus What If Scenario.", description: "Once What If values are added, the graph updates to show both scenarios side by side.", image: base + "calc-graph-whatif.png"},
                                {title: "See Impact of What If Scenario in Retirement Table.", description: "The Retirement Summary Table updates to show the differences between scenarios and the projected impact.", image: base + "calc-results-table-whatif.png"}
                            ]}
                        />
                    </div>
                </section>
                <section className="py-16 text-center">
                    <p className="text-3xl font-bold text-text-primary dark:text-slate-300 mb-4">
                        Don't wait — see your retirement projections today.
                    </p>
                    <button className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-hover">
                        <Link to="/calculator">Calculate Your Retirement</Link>
                    </button>
                </section>
            </div>
        </main>
    )
}

export default Home