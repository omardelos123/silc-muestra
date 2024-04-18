export class sistemas {
    ano_fabricacion: Date;
    cargo_personal: string;
    descripcion: string;
    descripcion_cargo_personal: string;
    estatus: number;
    fecha_actualiza: Date;
    fecha_crea: Date
    fecha_expiracion: Date
    id_clase: number;
    id_compania: number;
    id_destino: number;
    id_fabricante: number;
    id_modelo: number;
    id_operador_principal: number;
    id_padre: number;
    id_sistema: number;
    id_supervisor_responsable: number;
    id_tipo_combustible: number;
    id_tipo_sistema: number;
    nombre: string;
    nombre_clase_equipo: string;
    nombre_destino: string;
    nombre_fabricante: string;
    nombre_modelo: string;
    nombre_operador: string;
    nombre_supervisor: string;
    nombre_tipo_combustible: string;
    nombre_tipo_sistema: string;
    numero_placa: string;
    numero_serie: string;
    sw_activo: number;
    sw_despachable: number;
    sw_garantia: number;
    sw_horas: number;
    sw_km: number;
    sw_millas: number;
    uso_util: number;
    usuario_actualiza: number;
    usuario_crea: number;
    valor: number;
}

export class tipo_sistemas {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_tipo_sistema: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class combustible { }

export class fabricantes {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_fabricante: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class servicios { }

export class equipo {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_clase: number;
    id_compania: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class modelo {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_modelo: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class destino {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_destino: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class despacho {
    descripcion: string;
    despachador: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    fecha_hora_retorno: Date;
    fecha_hora_salida: Date;
    id_compania: number;
    id_despacho: number;
    id_destino: number;
    id_operador_principal: number;
    id_operador_secundario: number;
    id_sistema: number;
    lectura: string;
    nombre_destino: string;
    nombre_operador: string;
    nombre_sistema: string;
    observaciones: string;
    sw_activo: number;
    sw_hora_sistema: number;
    sw_impreso: number;
    sw_kilometro_sistema: number;
    sw_millas_sistema: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class personal {
    apellido: string;
    cedula: string;
    descripcion: string;
    descripcion_tipoPersonal: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    fecha_inicio: Date;
    fecha_nacimiento: Date;
    foto_url: string;
    genero: string;
    id_compania: number;
    id_personal: number;
    id_tipo_personal: number;
    nombre: string;
    nombre_tipoPersonal: string;
    sw_activo: number;
    tipo_licencia: string;
    usuario_actualiza: number;
    usuario_crea: number;

}

export class tipo_de_personal {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_tipo_personal: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class tipo_combustible {
    descripcion: string;
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_tipo_de_combustible: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}