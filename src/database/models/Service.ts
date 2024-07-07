import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"

@Entity("services")
export class Service {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({name:"service_name"})
    serviceName!:string

    @Column({name:"description"})
    description!:string

    @OneToMany(()=> Appointment,  appointment => appointment.service)
    appointment_service!: Appointment[]
}
