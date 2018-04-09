import { Tema } from "./tema";
//modelo de un curso
//utiliza el modelo Tema
//almacena todos los datos de un curso 
//guarda los temas en un arreglo de forma Tema
export class Curso {
    codigo_curso: string;
    nombre: string;
    temas: Tema[]
}
