import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Lista } from './usuarios/lista/lista';
import { Catalogo } from './catalogo/catalogo';
import { Login } from './login/login';
import { Listado } from './prestamo/listado/listado';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'usuarios', component: Lista },
  { path: 'catalogo', component: Catalogo },
  { path: 'prestamos', component: Listado },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
