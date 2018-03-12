
import { HistorialCurso } from "../models/historial-curso";

export class Usuario {
    _id?: string;
    nombre: string;
    tipo: string;
    carnet: string;
    password: string;
    email: string;
    institucion: {
        nombre: string;
        sede: string;
    } 
    escuela: string;
    programa: {
        codigo_programa: string;
        nombre: string;
    }
    historial_cursos: HistorialCurso[]
}
