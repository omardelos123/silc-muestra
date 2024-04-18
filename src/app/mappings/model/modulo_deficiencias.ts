export class deficiencia {
    fecha_actualiza: Date;
    fecha_crea: Date;
    fecha_deficiencia: Date;
    id_compania: number;
    id_deficiencia: number;
    id_tipo_deficiencia: number;
    id_tipo_mantenimiento: number;
    nombre_deficiencia: string;
    nombre_mantenimiento: string;
    usuario_actualiza: number;
    usuario_crea: number;
    nombre_estatus: string;
    nombre_tipo_de_deficiencia: string;
    nombre_tipo_de_mantenimiento: string;
    nombre_sistema: string;
    id_sistema: number;
    descripcion: string;
    numero_serie: string;
    nombre_posible_falla: string = '';
    id_posible_falla: number = 0;
}

export class tipo_deficiencia {
    color: string;
    fecha_actualiza: string;
    fecha_crea: string;
    id_compania: number;
    id_tipo_deficiencia: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class tipo_mantenimiento {
    fecha_actualiza: Date;
    fecha_crea: Date;
    id_compania: number;
    id_tipo_mantenimiento: number;
    nombre: string;
    sw_activo: number;
    usuario_actualiza: number;
    usuario_crea: number;
}

export class requisisiones {
    id_compania: number = 0;
    id_requisicion: number = 0;
    id_deficiencia: number = 0;
    id_parte: number = 0;
    sw_solicitada: number = 0;
    descripcion: string = '';
    nombre: string = '';
    id_parte_compania: number;
    requerida: boolean = false;
    cantidad: number = 0;
    id_prioridad: number = 0;

    usurario_crea: number = 0;
    fecha_crea: number = 0;
    usuario_actualiza: number = 0;
    fecha_actualiza: number = 0;
    sw_activo: number = 0;
    agreagada: number = 0;
}

export class prioridades { }

export class posibles_fallas {
    sw_activo: number = 0;
    descripcion: string = '';
    id_posible_falla: number = 0;
    id_sistema: number = 0;
    id_tipo_deficiencia: number = 0;
    nombre: string = '';
    nombre_sistema: string = '';
    nombre_tipo_de_deficiencia: string = '';
    seleccionada: boolean = false;
    codigo_falla: string = '';
    sw_codigo_falla: number = 0;
    nombre_equipo:string = ''
}