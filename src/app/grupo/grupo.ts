import { Rubro } from "./rubro";
import { ListaEstudiantes } from "../models/lista-estudiantes";
import { ListaAsistencia } from "../models/lista-asistencia";
//modelo para almacenar un grupo
//se importan los modelos Rubro, ListaAsistencia,ListaEstudiantes
//se almacenan los rubros, lista de estudiantes,  lista-asistencia como arreglos con sus respectivos tipos de datos
//periodo, horario, curso son modelos incrustados, cada uno con los atributos necesarios
export class Grupo {
    _id?: string;
    numero: number;
    id_institucion: string;
    id_escuela: string;
    sede: string;
    id_profesor: string;
    profesor : string;
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