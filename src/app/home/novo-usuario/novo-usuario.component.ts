import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { minusculoValidator } from './usuario.minusculo';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup

  constructor(private formBuider: FormBuilder,
              private novoUsuarioService: NovoUsuarioService,
              private usuarioExisteService: UsuarioExisteService,
              private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuider.group({
      email: ['',[Validators.required, Validators.email]],
      fullName: ['',[Validators.required, Validators.minLength(3)]],
      userName: ['', [minusculoValidator], [this.usuarioExisteService.usuarioJaExiste()]],
      password: [''],
     },
     {
      validators: [usuarioSenhaIguaisValidator],
     }
    );
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

}

