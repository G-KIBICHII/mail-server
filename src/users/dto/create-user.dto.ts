import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../schemas/user.schema';

class CommunicationPreferencesDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  whatsapp: boolean;
}

export class CreateUserDto {

  @IsString()
  username: string;

  @IsEmail()
  email: string;
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(1)
  password: string;


  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  isWhatsAppNumber?: boolean;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommunicationPreferencesDto)
  communicationPreferences?: CommunicationPreferencesDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  resetPasswordTokenExpiry?: Date;
}
