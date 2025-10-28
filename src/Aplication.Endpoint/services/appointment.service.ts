import { inject, injectable } from "tsyringe";
import Appointment from "../../Domain.Endpoint/entities/appointment.model";
import { IAppointmentRepository } from "../../Domain.Endpoint/interfaces/repositories/appointmentRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { AppointmentRequest } from "../dtos/request/appointment.request";
import { IAppointmentService } from "../interfaces/appointmentService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { AppointmentMapper } from "../mappers/appointment.mapper";

@injectable()
export default class AppointmentService implements IAppointmentService {
  private readonly _appointmentRepository: IAppointmentRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IAppointmentRepository")
    appointmentRepository: IAppointmentRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._appointmentRepository = appointmentRepository;
    this._tokenRepository = tokenRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await this._appointmentRepository.getAll();
  }

  async getById(id: string): Promise<Appointment | null> {
    return await this._appointmentRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<Appointment[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._appointmentRepository.getByAreaId(
      currentUser.departmentId
    );
  }

  async addAppointment(
    appointment: AppointmentRequest,
    token: string
  ): Promise<ServiceResult<Appointment>> {
    const currentUser = this.getCurrentUser(token);
    const newAppointment = AppointmentMapper.toEntity(
      appointment,
      currentUser.id
    );
    await this._appointmentRepository.create(newAppointment);

    return {
      success: true,
      message: "Appointment created",
      data: newAppointment,
    };
  }

  async updateAppointment(
    id: string,
    appointment: AppointmentRequest,
    token: string
  ): Promise<ServiceResult<Appointment | null>> {
    const existing = await this._appointmentRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Appointment not found", data: null };
    }

    const currentUser = this.getCurrentUser(token);

    // actualizar solo las propiedades necesarias
    const updatedAppointment = AppointmentMapper.updateEntity(
      existing,
      appointment,
      currentUser.id
    );
    await this._appointmentRepository.update(updatedAppointment);

    return {
      success: true,
      message: "Appointment updated",
      data: updatedAppointment,
    };
  }

  async deleteAppointment(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._appointmentRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Appointment not found" };
    }

    await this._appointmentRepository.delete(existing);
    return { success: true, message: "Appointment deleted" };
  }
}
