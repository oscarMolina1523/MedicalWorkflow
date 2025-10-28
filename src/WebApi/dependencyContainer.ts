import 'reflect-metadata';
import { container } from 'tsyringe';
import { ISingletonSqlConnection } from '../Infrastructure.Endpoint/interfaces/database/dbConnection.interface';
import { IEntitiesService } from '../Infrastructure.Endpoint/interfaces/entitiesService.interface';
import { ISqlCommandOperationBuilder } from '../Infrastructure.Endpoint/interfaces/sqlCommandOperation.interface';
import { SingletonSqlConnection } from '../Infrastructure.Endpoint/database/dbConnection';
import { EntitiesService } from '../Infrastructure.Endpoint/services/entitiesService';
import { SqlCommandOperationBuilder } from '../Infrastructure.Endpoint/builders/sqlCommandOperation.builder';
import { IUserRepository } from '../Domain.Endpoint/interfaces/repositories/userRepository.interface';
import { UserRepository } from '../Infrastructure.Endpoint/services/user.repository';
import { IUserService } from '../Aplication.Endpoint/interfaces/userService.interface';
import UserService from '../Aplication.Endpoint/services/user.service';
import UserController from './controllers/user.controller';
import { ITokenRepository } from '../Domain.Endpoint/interfaces/repositories/tokenRepository.interface';
import TokenRepository from '../Infrastructure.Endpoint/services/tokenRepository';
import { IAuthService } from '../Aplication.Endpoint/interfaces/authService.interface';
import AuthService from '../Aplication.Endpoint/services/auth.service';
import AuthController from './controllers/auth.controller';
import { IRoleRepository } from '../Domain.Endpoint/interfaces/repositories/roleRepository.interface';
import RoleRepository from '../Infrastructure.Endpoint/services/role.repository';
import { IRoleService } from '../Aplication.Endpoint/interfaces/roleService.interface';
import RoleService from '../Aplication.Endpoint/services/role.service';
import RoleController from './controllers/role.controller';
import { IMedicationRepository } from '../Domain.Endpoint/interfaces/repositories/medicationRepository.interface';
import MedicationRepository from '../Infrastructure.Endpoint/services/medication.repository';
import { IDepartmentRepository } from '../Domain.Endpoint/interfaces/repositories/departmentRepository.interface';
import DepartmentRepository from '../Infrastructure.Endpoint/services/department.repository';
import { IPatientRepository } from '../Domain.Endpoint/interfaces/repositories/patientRepository.interface';
import PatientRepository from '../Infrastructure.Endpoint/services/patient.repository';
import { IAppointmentRepository } from '../Domain.Endpoint/interfaces/repositories/appointmentRepository.interface';
import AppointmentRepository from '../Infrastructure.Endpoint/services/appointment.repository';
import { IAuditLogRepository } from '../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface';
import AuditLogRepository from '../Infrastructure.Endpoint/services/auditLog.repository';
import { IMedicalServiceRepository } from '../Domain.Endpoint/interfaces/repositories/medicalService.interface';
import MedicalServiceRepository from '../Infrastructure.Endpoint/services/medicalService.repository';
import { IBillingRepository } from '../Domain.Endpoint/interfaces/repositories/billingRepository.interface';
import BillingRepository from '../Infrastructure.Endpoint/services/billing.repository';
import { IExpenseRepository } from '../Domain.Endpoint/interfaces/repositories/expenseRepository.interface';
import ExpenseRepository from '../Infrastructure.Endpoint/services/expense.repository';
import { IMedicationService } from '../Aplication.Endpoint/interfaces/medicationService.interface';
import MedicationService from '../Aplication.Endpoint/services/medication.service';
import { IDepartmentService } from '../Aplication.Endpoint/interfaces/departmentService.interface';
import DepartmentService from '../Aplication.Endpoint/services/department.service';
import { IPatientService } from '../Aplication.Endpoint/interfaces/patientService.interface';
import PatientService from '../Aplication.Endpoint/services/patient.service';
import { IAppointmentService } from '../Aplication.Endpoint/interfaces/appointmentService.interface';
import AppointmentService from '../Aplication.Endpoint/services/appointment.service';
import { IInventoryRepository } from '../Domain.Endpoint/interfaces/repositories/inventoryRepository.interface';
import InventoryRepository from '../Infrastructure.Endpoint/services/inventory.repository';
import { IInventoryService } from '../Aplication.Endpoint/interfaces/inventoryService.interface';
import InventoryService from '../Aplication.Endpoint/services/inventory.service';
import { IAuditLogService } from '../Aplication.Endpoint/interfaces/auditLogService.interface';
import AuditLogService from '../Aplication.Endpoint/services/auditLog.service';

//builder, database connection and entity service
container.registerSingleton<ISingletonSqlConnection>('ISingletonSqlConnection', SingletonSqlConnection);
container.registerSingleton<IEntitiesService>('IEntityService', EntitiesService);
container.register<ISqlCommandOperationBuilder>('IOperationBuilder', { useClass: SqlCommandOperationBuilder });

//token dependencies
container.register<ITokenRepository>('ITokenRepository', {useClass: TokenRepository});

//user dependencies
container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register<IUserService>('IUserService', { useClass: UserService });
container.register<UserController>('UserController', { useClass: UserController });

//auth dependencies
container.register<IAuthService>('IAuthService', { useClass: AuthService });
container.register<AuthController>('AuthController', { useClass: AuthController });

//role dependencies
container.register<IRoleRepository>('IRoleRepository', { useClass: RoleRepository });
container.register<IRoleService>("IRoleService", {useClass: RoleService});
container.register<RoleController>("RoleController", {useClass: RoleController});

//medication dependencies
container.register<IMedicationRepository>("IMedicationRepository", {useClass: MedicationRepository});
container.register<IMedicationService>("IMedicationService", {useClass:MedicationService});

//department dependencies
container.register<IDepartmentRepository>("IDepartmentRepository", {useClass:DepartmentRepository});
container.register<IDepartmentService>("IDepartmentService", {useClass: DepartmentService});

//patient dependencies
container.register<IPatientRepository>("IPatientRepository", {useClass: PatientRepository});
container.register<IPatientService>("IPatientService", {useClass: PatientService});

//appointment dependencies
container.register<IAppointmentRepository>("IAppointmentRepository", {useClass:AppointmentRepository});
container.register<IAppointmentService>("IAppointmentService", {useClass: AppointmentService});

//inventory dependencies
container.register<IInventoryRepository>("IInventoryRepository", {useClass: InventoryRepository});
container.register<IInventoryService>("IInventoryService", {useClass: InventoryService});

//auditlog dependencies
container.register<IAuditLogRepository>("IAuditLogRepository", {useClass: AuditLogRepository});
container.register<IAuditLogService>("IAuditLogService", {useClass: AuditLogService});

//medicalService dependencies
container.register<IMedicalServiceRepository>("IMedicalServiceRepository", {useClass:MedicalServiceRepository})

//billing dependencies
container.register<IBillingRepository>("IBillingRepository", {useClass:BillingRepository});

//expense dependencies
container.register<IExpenseRepository>("IExpenseRepository", {useClass: ExpenseRepository});