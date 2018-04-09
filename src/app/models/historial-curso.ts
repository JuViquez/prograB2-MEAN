//modelo de Historial del curso
//almacena todos los datos de un curso 
export class HistorialCurso {  
    periodo:{
        ano: string;
        semestre : string;};
    codigo_curso: string;
    nombre: string;
    estado: string;
    nota_final: number;
    id_grupo: string;
}