import { Asistencia } from "./asistencia";
//modelo de la lista de asistencia
//utiliza el modelo Asistencia
export class ListaAsistencia {
    _id?: string;
    id_grupo : string;
    fecha: Date;
    asistencia: Asistencia[]; //almacena objetos de tipo Asistencia
}
