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