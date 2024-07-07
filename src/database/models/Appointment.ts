import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Service } from "./Service"

@Entity("appointments")
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({name:"appointment_date"})
    appointmentDate!:string

    @Column({name:'user_id'})
    userId!:number

    @Column({name:'service_id'})
    serviceId!:number

    @ManyToOne(()=> User, user => user.appointment_user)
    @JoinColumn({name:"user_id"})
    user!:User

    @ManyToOne(()=> Service, service => service.appointment_service)
    @JoinColumn({name:"service_id"})
    service!:Service
}
