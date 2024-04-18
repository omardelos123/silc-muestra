import {
    companias, control_sistemas, control_usuarios,
    deficiencias, inventarios, pedidos, estatus, dashboard, historico_pedidos, reportes, ModelExcel
} from '../mappings/parameters/_export_parameters';
import { environment } from '../../environments/environment';




// parametros a enviar al server.
export class parametros {
    public rest_server: string = environment.SRV;
    // public rest_server: string = 'https://api-rest-silc.herokuapp.com/';
    
    prm_companias = new companias().prm_companias;
    prm_control_sistemas = new control_sistemas().prm_control_sistemas;
    prm_control_usuarios = new control_usuarios().prm_control_usuarios;
    prm_deficiencias = new deficiencias().prm_deficiencias;
    prm_inventarios = new inventarios().prm_inventarios;
    prm_pedidos = new pedidos().prm_pedidos;
    prm_estatus = new estatus().prm_estatus;
    prm_dashboard = new dashboard().prm_dashboard;
    prm_historico_pedidos = new historico_pedidos().prm_historico_pedidos;
    prm_reportes = new reportes().prm_reportes;
    prm_excel = new ModelExcel().prm_excel;
}



export class prm_App {
    public nombre_App: string = 'SILC-im';
}

export class token{
    public token = JSON.parse(decodeURIComponent(escape(window.atob(localStorage._token))));
}



// Permisos en la aplicación.
export class Permisos {
    public access = {
        
        actualizar: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._acess)))).actualizar,
        eliminar: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._acess)))).eliminar,
        registrar: JSON.parse(decodeURIComponent(escape(window.atob(localStorage._acess)))).registrar
    }
}