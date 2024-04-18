export class ModelExcel {
    public prm_excel = {
        token: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token)))),
        accion_tipo: '',
        id_compania: parseInt(localStorage.getItem("COMP")),
        
        descripcion: '',
        fecha_crea: new Date().toUTCString(),
        fecha_actualiza: new Date().toUTCString(),
        sw_activo: 0,

        usuario_crea: parseInt(localStorage.getItem("USU")),
        usuario_actualiza: parseInt(localStorage.getItem("USU")),

        matriz:[],
    }
}