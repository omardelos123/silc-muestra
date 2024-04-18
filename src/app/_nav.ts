export const navItems = [
  {
    name: 'Inicio',
    url: '/silc/inicio',
    icon: 'icon-home'
  },
  {
    name: 'Control de acceso',
    url: '/Control_de_acceso',
    icon: 'icon-home',
    children: [
      {
        name: 'Menus',
        url: '/silc/menus',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Roles',
        url: '/silc/roles',
        icon: 'icon-user'
      },
      {
        name: 'Usuarios',
        url: '/silc/usuarios',
        icon: 'icon-people'
      }
    ]
  },
  {
    name: 'Compañias',
    url: '/Companias',
    icon: 'fa fa-building',
    children: [
      {
        name: 'Compañias',
        url: '/silc/companias',
        icon: 'fa fa-building'
      }
      //,
      //{
        //name: 'Forma de pago',
        //url: '/silc/forma-de-pago',
        //icon: 'fa fa-calendar'
      //}
      ,
      {
        name: 'Pais',
        url: '/silc/pais',
        icon: 'fa fa-calendar'
      }
      ,
      {
        name: 'Provincia',
        url: '/silc/provincia',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Distrito',
        url: '/silc/distrito',
        icon: 'fa fa-calendar'
      }
    ]
  },
  {
    name: 'Inventario',
    url: '/Inventario',
    icon: 'icon-book-open',
    children: [
      {
        name: 'Lista de inventario',
        url: '/silc/catalogo',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Ubicacar artículo',
        url: '/silc/almacen',
        icon: 'icon-book-open'
      },
      {
        name: 'Almacen compañia',
        url: '/silc/almacen-compania',
        icon: 'fa fa-calendar'
      }
      ,
     
      {
        name: 'Catalogo de compañia',
        url: '/silc/catalogo-de-compania',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Proveedores',
        url: '/silc/proveedores',
        icon: 'fa fa-address-book'
      },
      {
        name: 'Forma de pago',
        url: '/silc/forma-de-pago',
        icon: 'fa fa-calendar'
      }
      ,
      {
        name: 'Unidades',
        url: '/silc/unidades',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Ubicacion',
        url: '/silc/ubicacion',
        icon: 'fa fa-calendar'
      }
    ]
  },
  {
    name: 'Pedidos',
    url: '/Pedidos',
    icon: 'cui-cart',
    children: [
      {
        name: 'Pedidos',
        url: '/silc/pedidos',
        icon: 'cui-cart'
      },
      //{
        //name: 'Prueba pedidos',
        //url: '/silc/n-pedido',
        //icon: 'fa fa-calendar'
      //},
      //{
        //name: 'Historial',
        //url: '/silc/historial',
        //icon: 'fa fa-address-book'
      //}
      //{
        //name: 'Estatus',
        //url: '/silc/estatus',
        //icon: 'fa fa-calendar'
      //},
      //{
        //name: 'Tipo de estatus',
        //url: '/silc/tipo-de-estatus',
        //icon: 'fa fa-calendar'
      //},
    ]
  },
  {
    name: 'Deficiencias',
    url: '/Deficiencias',
    icon: 'icon-home',
    children: [
      {
        name: 'Deficiencia',
        url: '/silc/deficiencia',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Tipo de deficiencia',
        url: '/silc/tipo-de-deficiencia',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Tipo de mantenimiento',
        url: '/silc/tipo-de-mantenimiento',
        icon: 'fa fa-calendar'
      }/*,
      {
        name: 'Requisisiones',
        url: '/silc/requisisiones',
        icon: 'fa fa-calendar'
      }*/,
      {
        name: 'Prioridades',
        url: '/silc/prioridades',
        icon: 'fa fa-calendar'
      }/*,
      {
        name: 'Entrega de partes',
        url: '/silc/entrega-de-partes',
        icon: 'fa fa-calendar'
      }*/,
      {
        name: 'Orden de trabajo',
        url: '/silc/orden-de-trabajo',
        icon: 'fa fa-calendar'
      }/*,
      {
        name: 'Tareas orden de trabajo',
        url: '/silc/tareas-orden-de-trabajo',
        icon: 'fa fa-calendar'
      }*/,
      {
        name: 'Posibles Fallas',
        url: '/silc/posibles-fallas',
        icon: 'fa fa-calendar'
      }

    ]
  },
  {
    name: 'Sistemas',
    url: '/sistemas',
    icon: 'fa fa-truck',
    children: [
      {
        name: 'Sistemas',
        url: '/silc/sistemas',
        icon: 'fa fa-truck'
      },
      {
        name: 'Tipos de sistemas',
        url: '/silc/tipo-de-sistemas',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Combustible',
        url: '/silc/combustibles',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Fabricantes',
        url: '/silc/fabricantes',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Servicio',
        url: '/silc/servicio',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Equipo',
        url: '/silc/equipo',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Modelo',
        url: '/silc/modelos',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Destino',
        url: '/silc/destinos',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Despacho',
        url: '/silc/despacho',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Personal',
        url: '/silc/personal',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Tipo de personal',
        url: '/silc/tipo-de-personal',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Tipo de combustible',
        url: '/silc/tipocombustible',
        icon: 'fa fa-calendar'
      }
    ]
  },
  {
   name: 'Estatus',
    url: '/estados',
   icon: 'icon-home',
    children: [
      {
      name: 'Estatus',
      url: '/silc/estatus',
      icon: 'fa fa-calendar'
     },
    {
     name: 'Tipo de estatus',
     url: '/silc/tipo-de-estatus',
     icon: 'fa fa-calendar'
    },
    ]
  },
  {
   name: 'Dasboard',
    url: '/dashboard',
   icon: 'icon-home',
    children: [
      {
        name: 'Administrador',
        url: '/silc/Dashboard-Adm',
        icon: 'fa fa-calendar'
      },
      {
        name: 'Dashboard Pedidos',  
        url: '/silc/Dashboard-Pedidos',
        icon: 'fa fa-calendar'
      }
      ,
      {
        name: 'Dashboard Top Numero-Partes',  
        url: '/silc/Dashboard-Numero-Partes',
        icon: 'fa fa-calendar'
      },
    ]
  }
];
