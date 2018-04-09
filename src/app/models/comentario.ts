//modelo de comentario
//almacena los comentarios del foro
export class Comentario {
    autor: {
        id_usuario: String;
        nombre: String;
        tipo: String;
    }
    fecha: Date;
    texto: String;
}
