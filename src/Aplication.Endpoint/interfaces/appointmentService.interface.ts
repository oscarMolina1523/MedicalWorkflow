import Appointment from "../../Domain.Endpoint/entities/appointment.model";
import { AppointmentRequest } from "../dtos/request/appointment.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IAppointmentService {
  getAppointments(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment | null>;
  getByAreaId(token: string): Promise<Appointment[]>;
  addAppointment(
    appointment: AppointmentRequest,
    token: string
  ): Promise<ServiceResult<Appointment>>;
  updateAppointment(
    id: string,
    appointment: AppointmentRequest,
    token: string
  ): Promise<ServiceResult<Appointment | null>>;
  deleteAppointment(id: string, token:string): Promise<{ success: boolean; message: string }>;
}
