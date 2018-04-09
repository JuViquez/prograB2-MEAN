import { Comentario } from "./comentario";
//modelo de los topics de un foro
//utiliza el modelo Comentario
//guarda los comentarios en un arreglo de forma Comentario
export class Topic {
    _id?: String;
    id_grupo: String;
    autor: {
        id_usuario: String;
        nombre: String;
        tipo: String;
    }
    fecha: Date;
    titulo: String;
    texto: String;
    estado: String;
    comentarios: Comentario[];
}
