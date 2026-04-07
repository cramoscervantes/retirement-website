import { useState } from "react";

function FeatureShowcase({bullets}) {
    const [ openBullet, setOpenBullet ] = useState(0)

    const currentImage = bullets[openBullet].image
    return (
        <div className="flex">
            <div className="w-1/2 h-140 rounded-md shadow-card">
                <img src={currentImage} className="w-full h-full object-cover object-top rounded-md shadow-card" />
            </div>
            <div className="w-1/2">
                {bullets.map((bullet, index) => {
                    return (
                        <div key={index}>
                            <header className="cursor-pointer" onClick={() =>{if (openBullet !== index) setOpenBullet(index)} }>
                                {bullet.title}
                            </header>
                            {openBullet === index && 
                                <p>{bullet.description}</p>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FeatureShowcase