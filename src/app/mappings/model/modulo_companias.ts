export class cls_companias {
    codigo_postal: string;
    contacto: string;
    correo: string;
    descripcion: string;
    direccion: string;
    fecha_actualiza: string;
    fecha_crea: string;
    gerente: string;
    id_compania: number;
    id_distrito: number;
    id_pais: number;
    id_provincia: number;
    impuesto: number;
    nombre: string;
    nombre_distrito: string;
    nombre_pais: string;
    nombre_provincia: string;
    pagina_web: string;
    sub_gerente: string;
    sw_activo: string;
    telefono: string;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class cls_distrito {
    fecha_actualiza: string;
    fecha_crea: string;
    id_distrito: number;
    id_pais: number;
    id_provincia: number;
    latitud: number;
    longitud: number;
    nombre: string;
    nombre_pais: string;
    nombre_provincia: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class cls_paises {
    fecha_actualiza: string;
    fecha_crea: string;
    id_pais: number;
    latitud: number;
    longitud: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class cls_provincias {
    fecha_actualiza: string;
    fecha_crea: string;
    id_pais: number;
    id_provincia: number;
    latitud: number;
    longitud: number;
    nombre: string;
    nombre_pais: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}