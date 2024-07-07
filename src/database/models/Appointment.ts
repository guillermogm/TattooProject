import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity("appointments")
export class Appointment {
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
}
