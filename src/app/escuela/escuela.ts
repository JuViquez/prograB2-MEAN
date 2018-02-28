export class Escuela {
    _id?: string;
    nombre: string;
    programas: [
        {
            codigo_programa: string;
            nombre: string;
            malla_curricular: [
                {
                    codigo_curso: string;
                    nombre: string;
                    temas: [
                        {
                            nombre: string;
                            subtemas: string[];
                        }
                    ]
                }
            ]
        }
    ]
}
