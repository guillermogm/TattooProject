import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({name:"service_name"})
    title!:string
}
