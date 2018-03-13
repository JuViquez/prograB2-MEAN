
import { HistorialCurso } from "../models/historial-curso";

export class Usuario {
    _id?: string;
    nombre: string;
    tipo: string;
    carnet: string;
    password: string;
    email: string;
    institucion: {
<<<<<<< HEAD
        id_institucion: string;
=======
        id_institucion : string;
>>>>>>> 72449551a29c2df646aa6c1ce2cf64187e7cc860
        sede: string;
    } 
    escuela: string;
    programa: {
        codigo_programa: string;
        nombre: string;
    }
    historial_cursos: HistorialCurso[]
}
