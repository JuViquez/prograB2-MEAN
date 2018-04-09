import { Sede } from "../models/sede";
//modelo para almacenar las instituciones
//almacena las sedes como un arreglo de tipo Sede
export class Institucion {
    _id?: string;
    nombre: string;
    sedes: Sede[];
    periodo : {
        ano : string;
        semestre : string;
    }
}
