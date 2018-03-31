import { Comentario } from "./comentario";

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
