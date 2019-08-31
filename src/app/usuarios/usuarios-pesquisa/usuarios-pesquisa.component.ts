import {Title} from '@angular/platform-browser';
import {Component, OnInit, ViewChild} from '@angular/core';

import {ConfirmationService} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import {ErrorHandlerService} from '../../core/error-handler.service';
import {UsuarioService} from '../usuario.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  usuarios = [];
  @ViewChild('tabela') grid;

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de usuários');
    this.pesquisar();
  }

  pesquisar() {
    this.usuarioService.listarTodas()
      .then(resultado => {
        this.usuarios = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.messageService.add({severity: 'success', detail: 'Usuário excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
