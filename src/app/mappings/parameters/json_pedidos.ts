export class pedidos {
    public prm_pedidos = {
        token: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token)))),
        accion_tipo: '',
        detalle_pedido: [],
        id_compania: parseInt(localStorage.getItem("COMP")),
        id_pedido: 0,
        id_proveedor: 0,
        id_estatus: 0,
        fecha_pedido: new Date().toUTCString(),
        linea: 0,
        cantidad: 0,
        id_parte: 0,
        id_unidad: 0,
        id_tarea: 0,
        precio_unitario: 0,
        total: 0,
        sub_total: 0,
        manejo_envio: 0,
        descuento: 0,
        itbms: 0,
        gran_total: 0,
        usuario_crea: parseInt(localStorage.getItem("USU")),
        fecha_crea: new Date().toUTCString(),
        usuario_actualiza: parseInt(localStorage.getItem("USU")),
        fecha_actualiza: new Date().toUTCString(),
        numero_parte_nombre: 0,
        num_tarea: 0,
        sw_activo: 0,
        faltante: 0,
        estatus: '',
        linea_detalle_pedido: 0,
        nombre: '',
        cant_disponible: 0,
        fila: 0,
        entrada: 0,
        historico_cant_disponible: 0,
        suma_total_pedidos: 0,
        id_fabricante: 0,
        nombre_estatus: '',
        unidad_nombre: '',
        nombre_deficiencia: '',
        matriz:[],
        itemsDB:[]
    }
}