import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsuarioSemSenha } from "../../auth/interfaces/usuario-sem-senha.interface";

@ApiTags('Usuario')
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<UsuarioSemSenha[]> {
        const usuarios = await this.usuarioService.findAll();
        return usuarios.map(({ senha, ...usuarioSemSenha }) => usuarioSemSenha);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<UsuarioSemSenha> {
        const usuario = await this.usuarioService.findById(id);
        const { senha, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<UsuarioSemSenha> {
        const usuarioCriado = await this.usuarioService.create(usuario);
        const { senha, ...usuarioSemSenha } = usuarioCriado;
        return usuarioSemSenha;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<UsuarioSemSenha> {
        const usuarioAtualizado = await this.usuarioService.update(usuario);
        const { senha, ...usuarioSemSenha } = usuarioAtualizado;
        return usuarioSemSenha;
    }
}
