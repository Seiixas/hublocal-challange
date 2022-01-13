import { getRepository, Repository } from 'typeorm';

import { ICreateAddressDTO } from '../../../dtos/ICreateAddressDTO';
import { IAddressesRepository } from '../../../repositories/IAddressesRepository';
import { Address } from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

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
    const address = this.repository.create({
      street,
      district,
      number,
      city,
      state,
      postal_code,
      created_by,
      updated_by,
    });

    await this.repository.save(address);
  }

  async getAddressFromUser(id: string): Promise<Address> {
    const address = await this.repository.findOne({ created_by: id });

    return address;
  }
}

export { AddressesRepository };
