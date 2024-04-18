export class ubicacion {
    catalogo: string;
    cod_rfid: string;
    descripcion: string;
    descripcion_ubicacion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_almacen: number;
    id_compania: number;
    id_parte: number;
    id_proveedor: number;
    id_ubicacion: number;
    nombre: string;
    nombre_ubicacion: string;
    sw_activo: number;
    sw_rfid: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class almacen_compania {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_almacen_compania: number;
    id_compania: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class catalogo_compania {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_parte_compania: number;
    id_proveedor: number;
    id_unidad_entrega: number;
    id_unidad_proveedor: number;
    nombre: string;
    nombre_proveedor: string;
    nombre_unidad_entrega: string;
    nombre_unidad_proveedor: string;
    precio_unitario_base: number;
    sw_activo: number;
    sw_esencial: number;
    sw_reparable: number;
    unidad_entrega: number;
    unidad_proveedores: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class proveedores {
    codigo_postal: string;
    correo: string;
    descripcion: string;
    domicilio: string;
    fecha_actualiza: Date
    fecha_crea: Date
    id_compania: number;
    id_distrito: number;
    id_forma_pago: number;
    id_pais: number;
    id_proveedor: number;
    id_provincia: number;
    nombre: string;
    nombre_contacto: string;
    nombre_distrito: string;
    nombre_pais: string;
    nombre_provincia: string;
    pagina_web: string;
    ruc: string;
    sw_activo: number;
    sw_tipo_entrega: number;
    telefono: string;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class unidades {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_unidad: number;
    inicial: string;
    nombre: string;
    sw_activo: number;
    sw_entrega: number;
    sw_proveedor: number;
    usuario_actualiza: number;
    usuario_crea: number;
}
