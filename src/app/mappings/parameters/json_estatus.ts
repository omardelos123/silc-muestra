export class estatus {
    public prm_estatus = {
        token: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token)))),
        accion_tipo: '',
        id_compania: parseInt(localStorage.getItem("COMP")),
        id_estatus: 0,
        sw_activo: 0,
        nombre: '',
        fecha_actualiza: new Date().toUTCString(),
        fecha_crea: new Date().toUTCString(),
        tipo_de_estatus: 0,
        id_tipo_estatus: 0,
        descripcion: '',
        usuario_crea: parseInt(localStorage.getItem("USU")),
        usuario_actualiza: parseInt(localStorage.getItem("USU")),
        id_usuario: parseInt(localStorage.getItem("USU"))
    }
}