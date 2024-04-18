export class historico_pedidos {
    public prm_historico_pedidos = {
        token: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token)))),
        id_compania: parseInt(localStorage.getItem("COMP")),
        id_historico: 0,
        id_pedido: 0,
        id_parte: 0,
        sw_recibida: 0,
        entrada: 0,
        salida: 0,
        precio: 0,
        fecha_crea: new Date().toUTCString(),
        fecha_actualiza: new Date().toUTCString(),
        sw_activo: 0,
        accion_tipo: '',
        fila: 0,
        historico_cant_disponible: 0,
        usuario_crea: parseInt(localStorage.getItem("USU")),
        usuario_actualiza: parseInt(localStorage.getItem("USU")),
    }
}