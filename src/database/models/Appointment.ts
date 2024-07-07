import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

}
