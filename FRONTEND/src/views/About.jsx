import Space from '../components/Space'
import { motion } from "framer-motion"
import { STLLoader } from 'three/examples/jsm/Addons.js'
import { useLoader } from '@react-three/fiber'

export default function About() {

  const geometry = useLoader(STLLoader, `/models/Vesta.stl`)
  
  return (
    <>

    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden">
      {/* Sección superior con la simulación */}
      <div className="relative h-[70vh] w-full">
        <Space />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex flex-col justify-center items-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg"
          >
            Stellar Analysis System
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-2xl text-lg md:text-xl text-gray-300 mb-8"
          >
            Un sistema impulsado por IA que predice, analiza y visualiza el impacto de asteroides en tiempo real.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href='/simulacion'
            onClick={() => window.location.href = "/simulacion"}
            className="bg-yellow-300 text-black px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 hover:bg-slate-200"
          >
            Iniciar Simulación
          </motion.button>
        </div>
      </div>

      {/* Sección de información */}
      <div className="relative z-10 px-10 md:px-20 py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-10 border-b border-gray-600 pb-4 inline-block"
        >
          Sobre Nosotros
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-300 max-w-4xl leading-relaxed"
        >
          En <span className="text-white font-semibold">Stellar Analysis System (SAS)</span>, unimos ciencia, simulación y 
          <span className="text-sky-400 font-semibold"> inteligencia artificial</span> para estudiar el impacto de asteroides 
          en distintos entornos planetarios. Nuestro objetivo es ofrecer una plataforma 
          visual e interactiva que permita comprender los efectos físicos y ambientales 
          de estos eventos cósmicos, apoyando la investigación y la toma de decisiones científicas.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid md:grid-cols-3 gap-10 mt-16"
        >
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">Problemática</h3>
            <p className="text-gray-300">
              Los estudios de impactos de asteroides requieren simulaciones avanzadas y modelos 
              predictivos costosos, lo que limita el acceso y la exploración abierta de estos fenómenos.
            </p>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">Solución</h3>
            <p className="text-gray-300">
              SAS combina visualización 3D, IA de predicción y análisis científico para 
              ofrecer simulaciones accesibles y realistas, fomentando la investigación y el aprendizaje interactivo.
            </p>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">Impacto</h3>
            <p className="text-gray-300">
              Potenciamos la educación científica, impulsamos la investigación espacial y 
              acercamos herramientas tecnológicas de predicción a universidades, estudiantes y científicos.
            </p>
          </div>
        </motion.div>
         <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-4xl font-bold  border-b border-gray-600 pb-4 inline-block"
        >
          Porqué SAS
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="grid md:grid-cols-3 gap-10 mt-16"
        >
          
        
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">Solución</h3>
            <p className="text-gray-300">
              SAS combina visualización 3D, IA de predicción y análisis científico para 
              ofrecer simulaciones accesibles y realistas, fomentando la investigación y el aprendizaje interactivo.
            </p>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">Impacto</h3>
            <p className="text-gray-300">
              Potenciamos la educación científica, impulsamos la investigación espacial y 
              acercamos herramientas tecnológicas de predicción a universidades, estudiantes y científicos.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}
