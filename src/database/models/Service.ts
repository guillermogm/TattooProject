import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({name:"service_name"})
    serviceName!:string

    @Column({name:"description"})
    description!:string


}
