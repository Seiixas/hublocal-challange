interface ICreateCompanyDTO {
  name: string;

  description: string;

  cnpj: string;

  latitude: number;

  longitude: number;

  created_by: string;

  updated_by: string;

  category_id: string;
}

export { ICreateCompanyDTO };
