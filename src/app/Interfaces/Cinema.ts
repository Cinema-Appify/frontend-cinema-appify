
export interface Cinema {
  id: number; // Cambia a 'string' si estás usando cadenas
  email: string;
  name: string;
  password?: string; // Si no lo usas, podrías considerar eliminarlo
  photo?: string | null;
  state: string;
}