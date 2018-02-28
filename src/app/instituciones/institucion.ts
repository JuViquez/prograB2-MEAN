export class Institucion {
    _id?: string;
    nombre: string;
    sedes: [
        {
            nombre: string;
            id_escuelas: string[];
        }
    ];
}

