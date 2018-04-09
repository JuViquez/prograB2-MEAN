import { Curso } from "./curso";
//modelo para almacenar los programas de los cursos
//almacena la malla curricular en un arreglo de tipo Curso
//implementa el modelo Curso
export class Programa {
    codigo_programa: string;
    nombre: string;
    malla_curricular: Curso[];
}
