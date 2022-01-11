import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<void>;

  all(): Promise<Company[]>;

  findByCnpj(cnpj: string): Promise<Company>;
}

export { ICompaniesRepository };
