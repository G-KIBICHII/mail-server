import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { registerDecorator, ValidationArguments } from 'class-validator';

/**
 * Custom validator to match password & confirmPassword
 */
export function MatchPassword(property: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'MatchPassword',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: { message: 'Passwords do not match' },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return value === (args.object as any)[relatedPropertyName];
        },
      },
    });
  };
}

export class SignupDto {
  // 👤 Identity
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  // 🔐 Security
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @MatchPassword('password')
  confirmPassword: string;

  // 📱 Contact
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
