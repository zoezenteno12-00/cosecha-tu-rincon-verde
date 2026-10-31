// Datos tomados de fuentes oficiales (ver /fuentes).
// Ciclo, siembra, distancia y días: INIFAP (2023), Cuadro 1.
// Contenedor: SMA Coahuila, "El mejor contenedor para cada planta".
export type Ciclo = "P-V" | "O-I" | "Todo el año";

export interface Planta {
  nombre: string;
  ciclo: Ciclo;
  siembra: string;
  distanciaCm: string;
  dias: string;
  contenedor?: string;
}

export const plantas: Planta[] = [
  { nombre: "Acelga", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "25", dias: "60", contenedor: "4 L · 1 planta" },
  { nombre: "Ajo", ciclo: "O-I", siembra: "Directa", distanciaCm: "10", dias: "180", contenedor: "4 L · 2 plantas" },
  { nombre: "Apio", ciclo: "Todo el año", siembra: "Trasplante", distanciaCm: "25-30", dias: "180", contenedor: "4 L · 1 planta" },
  { nombre: "Betabel", ciclo: "Todo el año", siembra: "Directa o trasplante", distanciaCm: "10", dias: "85", contenedor: "8 L · 4 plantas" },
  { nombre: "Brócoli", ciclo: "Todo el año", siembra: "Directa o trasplante", distanciaCm: "33", dias: "85", contenedor: "4 L · 1 planta" },
  { nombre: "Calabacita", ciclo: "P-V", siembra: "Directa", distanciaCm: "50", dias: "45" },
  { nombre: "Calabaza", ciclo: "P-V", siembra: "Directa", distanciaCm: "50", dias: "80", contenedor: "19 L · 1 planta" },
  { nombre: "Cebolla", ciclo: "Todo el año", siembra: "Trasplante", distanciaCm: "12", dias: "120", contenedor: "4 L · 1 planta" },
  { nombre: "Chícharo", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "3", dias: "90", contenedor: "4 L · 2 plantas" },
  { nombre: "Chile", ciclo: "P-V", siembra: "Trasplante", distanciaCm: "40-50", dias: "120", contenedor: "4 L · 1 planta" },
  { nombre: "Cilantro", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "3", dias: "55", contenedor: "1 L · 1 planta" },
  { nombre: "Col", ciclo: "O-I", siembra: "Directa o trasplante", distanciaCm: "20", dias: "110", contenedor: "4 L · 1 planta" },
  { nombre: "Coliflor", ciclo: "P-V", siembra: "Trasplante", distanciaCm: "20-35", dias: "90", contenedor: "4 L · 1 planta" },
  { nombre: "Ejote", ciclo: "P-V", siembra: "Directa", distanciaCm: "10", dias: "70", contenedor: "4 L · 2 a 3 plantas" },
  { nombre: "Espinaca", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "10-12", dias: "45", contenedor: "4 L · 2 plantas" },
  { nombre: "Jitomate", ciclo: "Todo el año", siembra: "Directa o trasplante", distanciaCm: "25-50", dias: "120", contenedor: "19 L · 1 planta" },
  { nombre: "Lechuga", ciclo: "Todo el año", siembra: "Trasplante", distanciaCm: "30-35", dias: "90-100", contenedor: "4 L · 1 planta" },
  { nombre: "Maíz", ciclo: "P-V", siembra: "Directa", distanciaCm: "30", dias: "90-120", contenedor: "19 L · 3 plantas" },
  { nombre: "Papa", ciclo: "Todo el año", siembra: "Trasplante", distanciaCm: "40", dias: "110", contenedor: "19 L · 1 planta" },
  { nombre: "Pepino", ciclo: "P-V", siembra: "Directa", distanciaCm: "30-40", dias: "90", contenedor: "19 L · 1 planta" },
  { nombre: "Perejil", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "5", dias: "80" },
  { nombre: "Rábano", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "3", dias: "30", contenedor: "8 L · ~10 plantas" },
  { nombre: "Tomate verde", ciclo: "P-V", siembra: "Directa o trasplante", distanciaCm: "40", dias: "90" },
  { nombre: "Zanahoria", ciclo: "Todo el año", siembra: "Directa", distanciaCm: "3", dias: "110", contenedor: "8 L · 6 plantas" },
];

export const fuentes = [
  {
    id: "inifap",
    titulo: "Huertos sostenibles para la seguridad alimentaria en la agricultura rural familiar",
    autor: "Gómez Carreño, P. C. y Aguirre Gómez, J. A. — INIFAP / SADER, Folleto para productores Núm. 1 (2023)",
    url: "https://biblioteca.semarnat.gob.mx/janium/Documentos/Ciga/libros2023/CD009604.pdf",
    uso: "Época de siembra, tipo de siembra, distancia entre plantas y días del ciclo.",
  },
  {
    id: "coahuila",
    titulo: "Huertos urbanos — Manual de trabajo",
    autor: "Secretaría de Medio Ambiente del Estado de Coahuila (2021)",
    url: "https://sma.gob.mx/wp-content/uploads/2021/08/MANUAL_PAGWEB_HUERTOS_V1.pdf",
    uso: "Tamaño de contenedor, drenaje, horas de sol, composta, plantas comadres y consejos.",
  },
  {
    id: "sedema",
    titulo: "Guía rápida para huertos urbanos familiares. Sin salir de casa",
    autor: "Secretaría del Medio Ambiente de la Ciudad de México (2020)",
    url: "https://www.sedema.cdmx.gob.mx/storage/app/media/Guiadehuertosurbanos.pdf",
    uso: "Materiales básicos y recomendación de iniciar en primavera.",
  },
  {
    id: "sader",
    titulo: "Calendario Agrícola",
    autor: "SADER — Dirección General del SIAP",
    url: "https://nube.agricultura.gob.mx/calendario_agricola/",
    uso: "Ciclos Primavera–Verano y Otoño–Invierno en México.",
  },
];
