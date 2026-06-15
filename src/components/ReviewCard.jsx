export default function ReviewCard({ quote, photo, name, stars = 5, halfStar = false }) {
  return (
    <div className="border border-white/20 text-center p-8 flex flex-col items-center gap-4 
      hover:border-caramel/60 transition-all duration-300 hover:-translate-y-1">
      {/* Quote icon */}
      <div className="text-caramel text-[4rem] leading-none font-serif">"</div>
      <p className="text-[1.5rem] text-white/80 leading-relaxed font-light">{quote}</p>
      <img
        src={photo}
        alt={name}
        className="w-[70px] h-[70px] rounded-full object-cover border-2 border-caramel"
      />
      <h3 className="text-[2rem] text-white font-semibold uppercase">{name}</h3>
      <div className="flex gap-1">
        {Array.from({ length: Math.floor(stars) }).map((_, i) => (
          <span key={i} className="text-caramel text-[2rem]">★</span>
        ))}
        {halfStar && <span className="text-caramel text-[2rem]">½</span>}
      </div>
    </div>
  )
}
