import { EntityState } from '@ngrx/entity';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';

export const registrationsStoreName = 'Registrations';

export interface IRegistrationsState extends EntityState<RegistrationInfo> {
  isFetching: boolean;
}
