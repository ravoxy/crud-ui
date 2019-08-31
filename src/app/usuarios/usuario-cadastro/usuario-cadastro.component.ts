import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PerfisService } from '../../perfis/perfis.service';
import { UsuarioService } from '../usuario.service';
import { AparelhosService } from '../../aparelhos/aparelhos.service';
import { Perfil } from 'app/core/model';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  perfis = [];
  aparelhos = [];
  formulario: FormGroup;

  constructor(
    private perfisService: PerfisService,
    private aparelhosService: AparelhosService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.configurarFormulario();

    const idUsuario = this.route.snapshot.params['id'];

    this.title.setTitle('Novo Usuário');

    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    }

    this.carregarPerefis();
    this.carregarAparelhos();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, this.validarObrigatoriedade],
      login: [null, this.validarObrigatoriedade],
      email: [null, this.validarObrigatoriedade],
      senha: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      dataCriacao: [null, this.validarObrigatoriedade],
      tempoExpiracaoSenha: [],
      codigoAutorizacao: [null, this.validarTamanhoMinimo(1)],
      statusUsuario: [null, this.validarTamanhoMinimo(1)],
      codigoPessoa: [],
      perfil: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      aparelho: this.formBuilder.group({
        id: [null, Validators.required],
        descricao: [],
        codigo: []
      }),
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarUsuario(id: number) {
    this.usuarioService.buscarPorCodigo(id)
      .then(usuario => {
        this.formulario.patchValue(usuario);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarUsuario();
    } else {
      this.adicionarUsuario();
    }
  }

  adicionarUsuario() {
    this.usuarioService.adicionar(this.formulario.value)
      .then(usuarioAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });

        this.router.navigate(['/usuarios', usuarioAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario() {
    this.usuarioService.atualizar(this.formulario.value)
      .then(usuario => {
        this.formulario.patchValue(usuario);

        this.messageService.add({ severity: 'success', detail: 'Usuário alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPerefis() {
    return this.perfisService.listarTodas()
      .then(perfis => {
        this.perfis = perfis
          .map(c => ({ label: c.nome, value: c.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAparelhos() {
    this.aparelhosService.listarTodas()
      .then(aparelhos => {
        this.aparelhos = aparelhos
          .map(p => ({ label: p.descricao, value: p.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function () {
    }.bind(this), 1);

    this.router.navigate(['/usuarios/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle('Edição de Usuário');
  }
}
