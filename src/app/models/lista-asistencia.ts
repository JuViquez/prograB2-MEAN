import { Asistencia } from "./asistencia";

export class ListaAsistencia {
    _id?: string;
    id_grupo : string;
    fecha: Date;
    asistencia: Asistencia[];
}
