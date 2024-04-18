export class control_sistemas {
    public prm_control_sistemas = {
        token: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token)))),
        accion_tipo: '',
        id_clase: 0,
        id_operador_principal: 0,
        id_operador_secundario: 0,
        fecha_de_salida: new Date().toUTCString(),
        fecha_hora_retorno: new Date().toUTCString(),
        id_destino: 0,
        id_compania: parseInt(localStorage.getItem("COMP")),
        nombre: '',
        descripcion: '',
        usuario_crea: parseInt(localStorage.getItem("USU")),
        usuario_actualiza: parseInt(localStorage.getItem("USU")),
        fecha_crea: new Date().toUTCString(),
        fecha_actualiza: new Date().toUTCString(),
        sw_activo: 0,
        id_fabricante: 0,
        id_modelo: 0,
        id_personal: 0,
        id_tipo_personal: 0,
        apellido: '',
        cedula: '',
        fecha_inicio: new Date().toUTCString(),
        fecha_nacimiento: new Date().toUTCString(),
        genero: "",
        foto_url: '',
        id_servicio: 0,
        id_sistema: 0,
        numero_serie: '0',
        numero_placa: 0,
        ano_fabricacion: new Date().toUTCString(),
        valor: 0,
        sw_despachable: 0,
        sw_garantia: 0,
        fecha_expiracion: new Date().toUTCString(),
        sw_km: 0,
        sw_millas: 0,
        sw_hora: 0,
        id_supervisor_responsable: 0,
        id_padre: 0,
        uso_util: 0,
        estatus: 0,
        id_tipo_sistema: 0,
        id_orden_combustible: 0,
        id_despacho: 0,
        cantidad: 0,
        costo: 0,
        despachador: 0,
        fecha_hora_salida: new Date().toUTCString(),
        lectura: '',
        sw_impreso: 0,
        sw_horas: 0,
        id_tipo_de_combustible: 0,
        identidad_personal: '',
        id_tipo_combustible: 0,
        observaciones: '',
        nombre_sistema: '',
        valor_lectura: 0,
        foto: '',
        tipo_img: '',
        valor_lectura_retorno:0,
        sw_retorno:0,
        distancia_recorrida:0,
        litros_combustible:0,
        costo_combustible:0
    }
}