import CepCoords from 'coordenadas-do-cep';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../../user/repositories/IUsersRepository';
import { Company } from '../../infra/typeorm/entities/Company';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface ICoordinates {
  lat: number;
  lon: number;
}

interface IRequest {
  user_id: string;
  distance?: number;
}

@injectable()
class ListCompaniesCloselyToUserUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, distance }: IRequest): Promise<Company[]> {
    const user = await this.usersRepository.findById(user_id);
    const address = await this.usersRepository.findAddress(user.id);
    const companies = await this.companiesRepository.all();

    const companiesClosely: Company[] = [];

    const { lat, lon } = await CepCoords.getByCep(address[0].postal_code);

    const userAddressCoordinates: ICoordinates = {
      lat,
      lon,
    };

    companies.forEach((company) => {
      const { latitude: lat, longitude: lon } = company;

      const companyCoordinates: ICoordinates = {
        lat,
        lon,
      };

      const kmDistance = CepCoords.getDistancia(
        userAddressCoordinates,
        companyCoordinates
      );

      const distanceSettedByUser = distance || 20;

      if (kmDistance < distanceSettedByUser) {
        companiesClosely.push(company);
      }
    });

    return companiesClosely;
  }
}

export { ListCompaniesCloselyToUserUseCase };
