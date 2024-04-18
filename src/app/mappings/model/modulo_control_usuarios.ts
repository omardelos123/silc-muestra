export class menus {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_menu: number;
    id_padre: number;
    link: string;
    nombre: string;
    sw_activo: number;
    sw_contenedor: number;
    usuario_actualiza: number;
    usuario_crea: number;
    sw_mostrar: number;
}

export class roles {
    descripcion: string;
    fecha_actualiza: string;
    fecha_crea: string;
    id_compania: number;
    id_rol: number;
    nombre: string;
    sw_activo: number;
    sw_crea: number;
    sw_deshabilita: number;
    sw_editar: number;
    sw_eliminar: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class usuarios {
    apellido: string;
    cedula: string;
    contrasena: string;
    correo: string;
    direccion: string;
    fecha_actualiza:  Date;
    fecha_crea: Date;
    fecha_de_nacimiento: string;
    id_compania: number;
    id_rol: number;
    id_usuario: number;
    nombre: string;
    nombre_rol: string;
    sw_activo: number;
    telefono: string;
    usuario: string;
    usuario_actualiza: number;
    usuario_crea: number;
}