import { ICreateCompanyDTO } from '../dtos/ICreateCompanyDTO';
import { ISetCompanyApprovedDTO } from '../dtos/ISetCompanyApprovedDTO';
import { Company } from '../infra/typeorm/entities/Company';

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<void>;

  all(): Promise<Company[]>;

  findByCnpj(cnpj: string): Promise<Company>;

  findById(id: string): Promise<Company>;

  allUnapproved(): Promise<Company[]>;

  setCompanyApproved({ admin_id, id }: ISetCompanyApprovedDTO): Promise<void>;
}

export { ICompaniesRepository };
