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
