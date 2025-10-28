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

//department dependencies
container.register<IDepartmentRepository>("IDepartmentRepository", {useClass:DepartmentRepository});

//patient dependencies
container.register<IPatientRepository>("IPatientRepository", {useClass: PatientRepository});

//appointment dependencies
container.register<IAppointmentRepository>("IAppointmentRepository", {useClass:AppointmentRepository});