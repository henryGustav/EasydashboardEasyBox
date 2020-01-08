import { MainMenuItem } from './main-menu-item';

export const MAINMENUITEMS: MainMenuItem[] = [
  {
    title: 'Inicio',
    icon: '',
    active: true,
    groupTitle: true,
    sub: '',
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: ''
  },
  {
    title: 'Panel de Control',
    icon: 'fa fa-home',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/dashboard',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Tiendas',
    icon: 'fa fa-briefcase',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/tienda/all',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Productos',
    icon: 'fa fa-briefcase',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/products/all',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Categorías',
    icon: 'fa fa-clone',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/categories/all',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Usuarios',
    icon: '	fa fa-user-circle-o',
    active: false,
    groupTitle: false,
    sub: [
      /*{
        title: 'Roles',
        routing: '/roles/all'
      },
      {
        title: 'Equipos',
        routing: '/equipo/jerarquia/all',
      },*/
      {
        title: 'Usuario',
        routing: '/users/usuario/all'
      }

    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Clientes',
    routing: '/users/client/all',
    icon: 'fa fa-group',
    active: false,
    groupTitle: false,
    sub: '',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Ordenes',
    icon: 'fa fa-shopping-basket',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Ordenes Disponibles',
        routing: '/orders/all'
      },
      {
        title: 'Ordenes Finalizadas',
        routing: '/orders/all-end'
      }
    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
  {
    title: 'Configuración',
    icon: 'fa fa-wrench',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Impuestos',
        routing: '/setting/tax'
      },
      {
        title: 'Cargos por envíos',
        routing: '/setting/extra'
      },
      {
        title: 'Cupones',
        routing: '/setting/coupon'
      },
      {
        title: 'Color',
        routing: '/options/color'
      },
      {
        title: 'Unidades de medida',
        routing: '/options/unit-size'
      }, /*,

         {
           title: 'Offfer',
           routing: '/options/offer'
         },*/
      {
        title: 'Marca',
        routing: '/options/brand'
      },
      {
        title: 'Preferencias',
        routing: '/setting/preferencias'
      }

    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: '#f44236'
  },
  {
    title: 'Importar',
    icon: '	fa fa-archive',
    active: false,
    groupTitle: false,
    sub: [
      {
        title: 'Productos',
        routing: '/archivos/productos'
      }
    ],
    routing: '',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
 /* {
    title: 'Demo',
    icon: '	fa fa-users',
    active: false,
    groupTitle: false,
    sub: '',
    routing: '/demo/demo',
    externalLink: '',
    budge: '',
    budgeColor: '#ff9933'
  },
*/
];
