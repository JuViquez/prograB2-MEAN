//modelo para almacenar los rubros de una evaluacion
//evaluaciones se tiene como un documento incrustado con sus atributos asociados
export class Rubro {  
    nombre: string;
    porcentaje: number;
    evaluaciones: [
        {
            id_evaluacion: number;
            nombre: string;
            fecha_entrega: Date;
            porcentaje: number;
        }
    ]
}
