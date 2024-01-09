/**
 * Smeup object
 */
export interface SmeupObject {
  /** type (T) */
  tipo: string;
  /** parameter (P) */
  parametro: string;
  /** code (K) */
  codice: string;
  /** text (D) */
  testo?: string;
  /** exec (E) */
  exec?: string;

  /** Field */
  fld?: string;
  /** Leaf */
  leaf?: string;
  /** i (I) */
  i?: string;
}
