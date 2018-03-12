import { Rubro } from "./rubro";

export class Grupo {
    _id?: string;
    numero: number;
    id_institucion: string;
    id_escuela: string;
    sede: string;
    id_profesor: string;
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
        codigo_curso: string;
        nombre: string;
    }
    rubros: Rubro[]
    lista_estudiantes: [
        {
            id_estudiante: string;
            evaluaciones: Rubro[];
        }
    ]
    lista_asistencia: [
        {
            fecha: Date;
            estudiantes: [
                {
                id_estudiante: string;
                estado: string;
                }
            ]
        }
    ]
}
