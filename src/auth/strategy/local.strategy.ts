import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Authservice } from "../services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

   constructor(private readonly authService: Authservice) {
    super({
        usernameField: 'usuario',
        passwordField: 'senha',
    });
}
    async validate(usuario: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateuser(usuario, senha);
        if(!validaUsuario) {
            throw new UnauthorizedException('Usuário e/ou senha incorreta!');

        }
                    return validaUsuario;

    }

}