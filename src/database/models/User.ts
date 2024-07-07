import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment"

@Entity("users")
export class User  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({name:"first_name"})
    firstName!:string

    @Column({name:"last_name"})
    lastName!:string

    @Column({name:"email"})
    email!:string

    @Column({name:"password"})
    password!:string

    @Column({name:'role_id'})
    roleId!:number

    @ManyToOne(()=> Role, role => role.user_role)
    @JoinColumn({name:"role_id"})
    role!:Role

    @OneToMany(()=> Appointment,  appointment => appointment.user)
    appointment_user!: Appointment[]

}
