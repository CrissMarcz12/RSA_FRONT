function ResultCard({ title, value }) {

  return (

    <div className="group relative overflow-hidden bg-[#111827]/80 backdrop-blur-lg border border-cyan-500/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300">

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>

      <div className="relative z-10">

        <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">
          {title}
        </h3>

        <p className="text-5xl font-black text-cyan-400 break-all">
          {value}
        </p>

      </div>

    </div>

  )
}

export default ResultCard