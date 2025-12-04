import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: 'tb_temas'}) //se torna uma entidade no banco de dados
export class Tema {

    @PrimaryGeneratedColumn()
    id:  number;

    @IsNotEmpty()
    @Column({ length: 355, nullable: false})
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}