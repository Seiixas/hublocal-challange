import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<void>;

  getAddressFromUser(id: string): Promise<Address>;
}

export { IAddressesRepository };
