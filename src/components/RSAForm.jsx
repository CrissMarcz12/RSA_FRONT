import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ResultCard from "./ResultCard";

function RSAForm() {
  const [mode, setMode] = useState("small");

  const [result, setResult] = useState(null);

  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState([]);
  const [decrypted, setDecrypted] = useState("");

  const [factors, setFactors] = useState([]);
  const [hacking, setHacking] = useState(false);

  // -----------------------------------
  // PREDEFINED PRIME MODES
  // -----------------------------------

  const smallPrimes = {
    p: 61,
    q: 53,
  };

  const largePrimes = {
    p: 10007,
    q: 10009,
  };

  // Prime lists for visual selection and random generation
  const smallPrimesList = [61, 67, 71, 73, 79, 83, 89, 97];
  const largePrimesList = [10007, 10009, 10037, 10039, 10061, 10067, 10069];

  const [selectedPair, setSelectedPair] = useState(null);

  const pickRandomPair = (arr) => {
    if (!arr || arr.length < 2) return { p: arr[0], q: arr[0] };
    const a = arr[Math.floor(Math.random() * arr.length)];
    let b = arr[Math.floor(Math.random() * arr.length)];
    let safety = 0;
    while (b === a && safety < 20) {
      b = arr[Math.floor(Math.random() * arr.length)];
      safety += 1;
    }
    return { p: a, q: b };
  };

  // -----------------------------------
  // GENERATE RSA KEYS
  // -----------------------------------

  const generateKeys = async () => {
    try {
      const pair =
        mode === "small"
          ? pickRandomPair(smallPrimesList)
          : pickRandomPair(largePrimesList);
      // store which mode produced this pair so we know where to display it
      setSelectedPair({ ...pair, mode });

      const response = await axios.post(
        "https://rsa-lab-backend.onrender.com/generate",
        pair,
      );

      setResult(response.data);

      setEncrypted([]);
      setDecrypted("");
      setFactors([]);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------
  // ENCRYPT
  // -----------------------------------

  const encryptMessage = async () => {
    try {
      const response = await axios.post(
        "https://rsa-lab-backend.onrender.com/encrypt",
        {
          message,
          e: result.e,
          n: result.n,
        },
      );

      setEncrypted(response.data.encrypted);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------
  // DECRYPT
  // -----------------------------------

  const decryptMessage = async () => {
    try {
      const response = await axios.post(
        "https://rsa-lab-backend.onrender.com/decrypt",
        {
          encrypted,
          d: result.d,
          n: result.n,
        },
      );

      setDecrypted(response.data.decrypted);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------
  // HACK RSA
  // -----------------------------------

  const hackRSA = async () => {
    setHacking(true);

    setFactors([]);

    setTimeout(
      async () => {
        if (mode === "small") {
          try {
            const response = await axios.post(
              "https://rsa-lab-backend.onrender.com/factorize",
              {
                n: result.n,
              },
            );

            setFactors(response.data.factors);
          } catch (error) {
            console.log(error);
          }
        }

        setHacking(false);
      },
      mode === "small" ? 2500 : 5000,
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* MODE SELECTION */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <button
          onClick={() => setMode("small")}
          className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
            mode === "small"
              ? "bg-red-500/20 border-red-400"
              : "bg-[#111827]/80 border-cyan-500/20"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Primos Pequeños
          </h2>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Utiliza números primos pequeños. El cifrado RSA se genera
            rápidamente, pero es más fácil de vulnerar.
          </p>
          <div className="mt-4">
            <p className="text-sm text-cyan-400 mt-2">
              {selectedPair && selectedPair.mode === "small"
                ? `p: ${selectedPair.p} • q: ${selectedPair.q}`
                : "p: — • q: —"}
            </p>
          </div>
        </button>

        <button
          onClick={() => setMode("large")}
          className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
            mode === "large"
              ? "bg-green-500/20 border-green-400"
              : "bg-[#111827]/80 border-cyan-500/20"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Primos Grandes
          </h2>

          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Utiliza números primos mucho más grandes. Aumenta significativamente
            la seguridad del sistema RSA.
          </p>
          <div className="mt-4">
            <p className="text-sm text-green-300 mt-2">
              {selectedPair && selectedPair.mode === "large"
                ? `p: ${selectedPair.p} • q: ${selectedPair.q}`
                : "p: — • q: —"}
            </p>
          </div>
        </button>
      </div>

      {/* GENERATE */}

      <div className="bg-[#111827]/80 border border-cyan-500/20 rounded-3xl p-10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-black mb-8 md:mb-10 text-center">
          Generador de Claves RSA
        </h2>

        <button
          onClick={generateKeys}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-all duration-300 text-black font-black py-4 md:py-5 rounded-2xl text-base md:text-xl"
        >
          Generador de Claves RSA
        </button>
      </div>

      {/* RESULT */}

      {result && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <ResultCard title="n" value={result.n} formula={`n = p × q`} />
            <ResultCard
              title="Euler φ(n)"
              value={result.phi}
              formula={`φ(n) = (p - 1) × (q - 1)`}
            />
            <ResultCard
              title="Exponente público (e)"
              value={result.e}
              formula={`Elegido: 1 < e < φ(n) y mcd(e, φ(n)) = 1`}
            />
            <ResultCard
              title="Exponente privado (d)"
              value={result.d}
              formula={`d · e ≡ 1 (mod φ(n)) — d = e⁻¹ mod φ(n)`}
            />
          </div>

          {/* Selected primes visual */}
          {selectedPair && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 md:col-span-2 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center"
            >
              <div className="bg-[#0f1724]/80 border border-cyan-500/20 rounded-3xl p-4 md:p-6 text-center w-full md:w-auto">
                <h4 className="text-sm md:text-base text-gray-400 mb-2">
                  Primo seleccionado
                </h4>
                <p className="text-3xl md:text-5xl font-black text-cyan-400">
                  {selectedPair.p}
                </p>
              </div>

              <div className="bg-[#0f1724]/80 border border-cyan-500/20 rounded-3xl p-4 md:p-6 text-center w-full md:w-auto">
                <h4 className="text-sm md:text-base text-gray-400 mb-2">
                  Primo seleccionado
                </h4>
                <p className="text-3xl md:text-5xl font-black text-green-400">
                  {selectedPair.q}
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ENCRYPTION */}

      {result && (
        <div className="mt-14 bg-[#111827]/80 border border-cyan-500/20 rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 text-center">
            Simulador de Cifrado RSA
          </h2>

          <input
            type="text"
            placeholder="Escribe un mensaje secreto..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#1F2937]/80 border border-cyan-500/20 rounded-2xl px-4 py-4 md:px-5 md:py-5 text-white text-sm md:text-base outline-none focus:border-cyan-400 mb-6"
          />

          {/* ASCII */}

          {message && (
            <div className="mb-8 bg-black/30 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-cyan-400 text-xl font-bold mb-4">
                Transformación ASCII
              </h3>

              <div className="flex flex-wrap gap-3">
                {message.split("").map((char, index) => (
                  <div
                    key={index}
                    className="bg-[#1F2937] px-3 py-2 md:px-4 md:py-3 rounded-xl border border-cyan-500/20"
                  >
                    <p className="text-xl md:text-2xl font-bold text-cyan-400">
                      {char}
                    </p>

                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      ASCII: {char.charCodeAt(0)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BUTTONS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <button
              onClick={encryptMessage}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-all duration-300 text-black font-black py-3 md:py-5 rounded-2xl text-base md:text-xl"
            >
              Cifrar
            </button>

            <button
              onClick={decryptMessage}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:scale-[1.02] transition-all duration-300 text-black font-black py-3 md:py-5 rounded-2xl text-base md:text-xl"
            >
              Descifrar
            </button>

            <button
              onClick={hackRSA}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 text-black font-black py-3 md:py-5 rounded-2xl text-base md:text-xl"
            >
              Atacar RSA
            </button>
          </div>

          {/* ENCRYPTED */}

          {encrypted.length > 0 && (
            <div className="mt-10">
              <h3 className="text-green-400 text-2xl font-bold mb-4">
                Datos Encriptados
              </h3>

              <div className="bg-black/40 border border-green-500/20 rounded-2xl p-6">
                <p className="text-2xl text-green-400 font-mono break-all">
                  {encrypted.join(" - ")}
                </p>
              </div>
            </div>
          )}

          {/* DECRYPTED */}

          {decrypted && (
            <div className="mt-10">
              <h3 className="text-pink-400 text-2xl font-bold mb-4">
                Mensaje Descifrado
              </h3>

              <div className="bg-black/40 border border-pink-500/20 rounded-2xl p-6">
                <p className="text-4xl font-black">{decrypted}</p>
              </div>
            </div>
          )}

          {/* HACKING */}

          {hacking && (
            <div className="mt-10 bg-black border border-red-500/30 rounded-2xl p-6">
              <p className="text-red-400 font-mono text-2xl animate-pulse">
                ⚠ Intentando ataque de factorización RSA...
              </p>
            </div>
          )}

          {/* SMALL PRIMES */}

          {factors.length > 0 && mode === "small" && (
            <div className="mt-10 bg-black/40 border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-red-400 text-3xl font-black mb-4">
                RSA Comprometido
              </h3>

              <p className="text-3xl font-mono text-red-400 mb-6">
                {result.n} = {factors[0]} × {factors[1]}
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Los números primos pequeños pueden factorizarse rápidamente,
                haciendo a RSA vulnerable a ataques.
              </p>

              <p className="text-green-400 mt-4 text-xl font-bold">
                Tiempo estimado de ruptura: milisegundos
              </p>
            </div>
          )}

          {/* LARGE PRIMES */}

          {!hacking && mode === "large" && (
            <div className="mt-10 bg-black/40 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-green-400 text-3xl font-black mb-4">
                RSA Permanece Seguro
              </h3>

              <p className="text-lg text-gray-300 leading-relaxed">
                Los números primos grandes aumentan drásticamente la dificultad
                de los ataques de factorización.
              </p>

              <p className="text-cyan-400 mt-6 text-2xl font-bold">
                Tiempo estimado de ruptura:
              </p>

              <p className="text-4xl font-black text-green-400 mt-2">
                Millones de años
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RSAForm;
