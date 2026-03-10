/**
 * Conversiones de unidades:
 * Backend espera: Peso en Hectogramos (hg), Altura en Decímetros (dm)
 * Frontend muestra: Peso en Kilogramos (kg), Altura en Centímetros (cm)
 */

// Convertir de KG a HG (para enviar al backend)
export const kgToHg = (kg: number): number => kg * 10;

// Convertir de HG a KG (por si necesitamos leer el valor del backend en el frontend)
export const hgToKg = (hg: number): number => hg / 10;

// Convertir de CM a DM (para enviar al backend)
export const cmToDm = (cm: number): number => cm / 10;

// Convertir de DM a CM (por si necesitamos leer el valor del backend en el frontend)
export const dmToCm = (dm: number): number => dm * 10;
