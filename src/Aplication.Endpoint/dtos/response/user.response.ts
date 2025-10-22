export interface UserResponse {
  username: string;
  email: string;
  roleId: string; 
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; 
  updatedBy: string; 
  departmentId?: string;
}