import { Routes } from '@angular/router';
import { Lista } from './usuarios/lista/lista';
import { Home } from './home/home';
import { Catalogo } from './catalogo/catalogo';

export const routes: Routes = [
    {path: '',  component: Home},
    {path: 'usuarios', component:Lista},
    {path: 'catalogo', component:Catalogo}
];
