import { Link } from "react-router-dom"
import FeatureShowcase from "@/components/FeatureShowcase"

function Home() {
    return (
        <main className="bg-page-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <section className="text-center max-w-xl mx-auto">
                    <h1>Simplify Retirement Plannig</h1>
                    <h2>Are you On Track for Retirement?</h2>
                    <p>When it comes to retirement planning, there is so many factors
                        involved in knowing if you are on track. Retirement Simplified
                        aims to make sure you can visually see if you are on track for
                        retirement.
                    </p>
                    <Link to="/calculator">Calculate Your Retirement</Link>
                </section>
                <section>
                    <h3>Features</h3>
                    <div>
                        <FeatureShowcase 
                            bullets={[
                                {title: "Enter your retirement values.", description: "", image: "/fullscreen-calc-no-what-if-no-table.png"},
                                {title: "See your results on the graph.", description: "", image: "/fullscreen-calc-no-what-if-no-table.png"},
                                {title: "See key indicators on your retirement.", description: "", image: "/calc-results-table.png"}
                            ]}
                        />
                    </div>
                </section>
                <section>
                    <h3>How it Works</h3>
                    <div className="grid grid-cols-3 gap-6">
                        <p>Once your current scenario is calculated. Run a what if scenario.</p>
                        <p>Compare the two on the graph.</p>
                        <p>See the impact of the changes on your results table.</p>
                    </div>
                </section>
                <section>
                    <p>Don't delay see your retirement projections now!</p>
                    <Link to="/calculator">Calculate Your Retirement</Link>
                </section>
            </div>
        </main>
    )
}

export default Home