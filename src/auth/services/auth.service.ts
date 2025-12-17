import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { JwtService } from "@nestjs/jwt";
import { UsuarioSemSenha } from "../interfaces/usuario-sem-senha.interface";
import { UsuarioResponse } from "../interfaces/usuario-response.interface";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<UsuarioSemSenha | null> {
    const usuario = await this.usuarioService.findByUsuario(username);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const senhaValida = await this.bcrypt.compararSenhas(password, usuario.senha);

    if (senhaValida) {
      const { senha, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin): Promise<UsuarioResponse> {
    const usuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    const payload = { sub: usuario.usuario, id: usuario.id };

    return {
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
