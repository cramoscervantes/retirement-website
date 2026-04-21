import { useState } from "react";

function FeatureShowcase({bullets}) {
    const [ openBullet, setOpenBullet ] = useState(0)

    const currentImage = bullets[openBullet].image

    const bulletClass = (index) => openBullet === index ? 'text-brand' : 'text-text-primary dark:text-slate-300'
    const bulletBorderClass = (index) => openBullet === index ? 'border-brand' : 'border-border-subtle'
    return (
        <div className="flex flex-col items-center">
            <div className="w-full aspect-video overflow-hidden rounded-md shadow-card">
                <img src={currentImage} className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-full grid grid-cols-3 gap-6 mt-8">
                {bullets.map((bullet, index) => {
                    return (
                        <div className={`border-t-2 pt-4 ${bulletBorderClass(index)}`} key={index}>
                            <header className={`cursor-pointer text-lg font-semibold flex justify-between items-center ${bulletClass(index)}`} onClick={() =>{if (openBullet !== index) setOpenBullet(index)} }>
                                {bullet.title}
                            </header>
                            {openBullet === index &&
                                <p className="text-text-muted dark:text-slate-400 text-sm mt-2 leading-relaxed">{bullet.description}</p>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FeatureShowcase