import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface Appointment {
    _id: string,
    date: Date,
    doctor: Doctor,
    patient: Patient
}