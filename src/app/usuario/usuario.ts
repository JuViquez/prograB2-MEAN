
import { HistorialCurso } from "../models/historial-curso";
//modelo de usuario, utiliza HistorialCurso
export class Usuario {
    _id?: string;
    nombre: string;
    tipo: string;
    carnet: string;
    password: string;
    email: string;
    institucion: {
        id_institucion : string;
        sede: string;
    } 
    escuela: string;
    programa: {
        codigo_programa: string;
        nombre: string;
    }
    historial_cursos: HistorialCurso[]
}
