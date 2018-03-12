import { Sede } from "../models/sede";

export class Institucion {
    _id?: string;
    nombre: string;
    sedes: Sede[];
    periodo : {
        ano : string;
        semestre : string;
    }
}
