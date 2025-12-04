import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findbyId(id: number): Promise<Postagem> {
        const postagem = await this.postagemRepository.findOne({
            where: {
                id,
            },
        });

        if (!postagem)
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return postagem;
    }

    
    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {
        await this.findbyId(postagem.id);

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findbyId(id);

        return await this.postagemRepository.delete(id);
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]>{
        return await this.postagemRepository.find({
            where:{titulo: ILike(`${titulo}%`)},
            relations:{tema:true}
        })
    }
}

