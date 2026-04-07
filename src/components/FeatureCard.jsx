function FeatureCard({title, description, image}) {
    return (
        <div className="border rounded-md border-black">
            <h2>{title}</h2>
            <img src={image} className="w-full h-100 object-cover object-top" />
            <p>{description}</p>
        </div>
    )
}

export default FeatureCard