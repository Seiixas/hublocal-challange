import { ICreateAddressDTO } from '../../dtos/ICreateAddressDTO';
import { Address } from '../../infra/typeorm/entities/Address';
import { IAddressesRepository } from '../IAddressesRepository';

class AddressesRepositoryInMemory implements IAddressesRepository {
  addresses: Address[] = [];

  async create({
    street,
    district,
    number,
    city,
    state,
    postal_code,
    created_by,
    updated_by,
  }: ICreateAddressDTO): Promise<void> {
    const address = new Address();

    Object.assign(address, {
      street,
      district,
      number,
      city,
      state,
      postal_code,
      created_by,
      updated_by,
    });

    this.addresses.push(address);
  }

  async getAddressFromUser(id: string): Promise<Address> {
    const address = this.addresses.find((address) => address.id === id);

    return address;
  }
}

export { AddressesRepositoryInMemory };
