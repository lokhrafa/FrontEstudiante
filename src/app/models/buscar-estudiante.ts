import { Calificacion } from "./calificacion";
import { Estudiante } from "./estudiante";

export interface BuscarEstudiante {
    estudiante: Estudiante
    estudiantedetalle: Calificacion[]
    
}
