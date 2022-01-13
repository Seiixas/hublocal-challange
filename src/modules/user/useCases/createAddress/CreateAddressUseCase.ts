import 'reflect-metadata';
import CepCoords from 'coordenadas-do-cep';
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
    try {
      const { uf: state, localidade: city } = await CepCoords.getInfoCep(
        postal_code
      );
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
    } catch (err) {
      throw new AppError('This CEP does not exists or does not matches');
    }
  }
}

export { CreateAddressUseCase };
