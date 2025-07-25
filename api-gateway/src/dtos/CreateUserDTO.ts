export interface CreateUserDTO {
  firstNames: string;
  lastNames: string;
  shortName: string;
  ci: string;
  ciType: string;
  imageUrl?: string;
  address?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  gender: string;
  birthDate: Date;
  roleId: number;
}
