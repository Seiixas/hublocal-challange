import buscaCep from 'busca-cep';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors';
import { IAddressesRepository } from '../../repositories/IAddressesRepository';

interface IRequest {
  street: string;
  district: string;
  number: string;
  postal_code: string;
  created_by: string;
}

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository
  ) {}

  async execute({
    street,
    district,
    number,
    postal_code,
    created_by,
  }: IRequest): Promise<void> {
    const {
      uf: state,
      localidade: city,
      erro: cepDoesNotExists,
    } = await buscaCep(postal_code, {
      sync: false,
      timeout: 1000,
    });

    if (cepDoesNotExists) {
      throw new AppError('This CEP does not exists', 404);
    }

    const updated_by = created_by;

    await this.addressesRepository.create({
      street,
      district,
      number,
      city,
      state,
      postal_code,
      created_by,
      updated_by,
    });
  }
}

export { CreateAddressUseCase };
