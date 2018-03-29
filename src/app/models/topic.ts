import { Comentario } from "./comentario";

export class Topic {
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
