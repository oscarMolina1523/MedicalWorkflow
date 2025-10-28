import Appointment from "../../entities/appointment.model";

export interface IAppointmentRepository {
  getAll(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment | null>;
  getByAreaId(areaId: string): Promise<Appointment[]>;
  create(appointment: Appointment): Promise<void>;
  update(appointment: Appointment): Promise<void>;
  delete(appointment: Appointment): Promise<void>;
}
