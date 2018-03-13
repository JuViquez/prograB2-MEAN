import { Rubro } from "./rubro";
import { ListaEstudiantes } from "../models/lista-estudiantes";
import { ListaAsistencia } from "../models/lista-asistencia";

export class Grupo {
    _id?: string;
    numero: number;
    id_institucion: string;
    id_escuela: string;
    sede: string;
    id_profesor: string;
<<<<<<< HEAD
    profesor: string;
=======
    profesor : string;
>>>>>>> 72449551a29c2df646aa6c1ce2cf64187e7cc860
    cupos: number;
    periodo:{
        ano: string;
        semestre : string;
    };
    horario: [
        {
            dia: string;
            hora_inicio: string;
            hora_final: string;
        }
    ]
    curso: {
        codigo_programa : string,
        codigo_curso: string;
        nombre: string;
    }
    rubros: Rubro[]
    lista_estudiantes: ListaEstudiantes[];
    lista_asistencia: ListaAsistencia[];
}