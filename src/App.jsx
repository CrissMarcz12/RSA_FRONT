import Hero from "./components/Hero"
import RSAForm from "./components/RSAForm"

function App() {

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Glow effects */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      {/* Grid */}

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Matrix background */}

      <div className="absolute inset-0 opacity-5 overflow-hidden text-green-400 font-mono text-sm leading-5 pointer-events-none">

        <div className="animate-pulse">
          010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
        </div>

      </div>

      {/* Content */}

      <div className="relative z-10 px-6 py-12">

        <Hero />

        <RSAForm />

      </div>

    </div>

  )
}

export default App