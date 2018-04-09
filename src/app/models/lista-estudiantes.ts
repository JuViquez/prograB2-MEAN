import { Rubro } from "../grupo/rubro";
import { EvaluacionEstudiante } from './evaluacion-estudiante'
//modelo de lista de estudiante
//utiliza el modelo de EvaluacionEstudiante
export class ListaEstudiantes {
    
    id_estudiante: string;
    nombre: string;
    evaluaciones: EvaluacionEstudiante[];
    
}
