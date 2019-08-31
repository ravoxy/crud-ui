import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPesquisaComponent,
  },
  {
    path: 'novo',
    component: UsuarioCadastroComponent,
  },
  {
    path: ':id',
    component: UsuarioCadastroComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
