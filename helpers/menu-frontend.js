export const getMenu=(role = 'USER_ROLE')=>{
const menu = [
    {
      titulo:'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'dashboard'},
        {titulo:'Progressbar', url:'progress'},
        {titulo:'Grafica', url:'grafica'},
        {titulo:'Promesas',url:'promesas'},
        {titulo:'RxJs',url:'rxjs'}
        
      ]
    },

    {
      titulo:'Mantenimiento',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        // {titulo:'Usuarios',url:'usuarios'},
        {titulo:'Medicos',url:'medicos'},
        {titulo:'Hospitales',url:'hospitales'},
  
        
      ]
    }
  ];

  if(role === 'ADMIN_ROLE') menu[1].submenu.unshift({titulo:'Usuarios',url:'usuarios'});

  return menu



}