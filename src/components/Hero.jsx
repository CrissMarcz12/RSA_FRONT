import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="text-center mb-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
      >
        RSA LAB
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
      >
        Laboratorio interactivo de criptografía basado en números primos, el
        teorema de Euler y el algoritmo RSA.
      </motion.p>

      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="bg-[#111827]/80 border border-cyan-500/20 px-6 py-3 rounded-xl backdrop-blur-lg">
          <span className="text-cyan-400 font-bold">Creado por:</span> Edson
          Marcelo
        </div>

        <div className="bg-[#111827]/80 border border-cyan-500/20 px-6 py-3 rounded-xl backdrop-blur-lg">
          <span className="text-cyan-400 font-bold">Profesor:</span> David
          Sanchez
        </div>

        <div className="bg-[#111827]/80 border border-cyan-500/20 px-6 py-3 rounded-xl backdrop-blur-lg">
          <span className="text-cyan-400 font-bold">Curso:</span> Matemática
          Discreta
        </div>
      </div>
    </div>
  );
}

export default Hero;
