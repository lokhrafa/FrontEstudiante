import { Asistencia } from "./asistencia";
import { Asistenciadetalle } from "./asistenciadetalle";

export interface BuscarAsistencia {
    asistencia: Asistencia,
    asistenciadetalle: Asistenciadetalle[]
}
