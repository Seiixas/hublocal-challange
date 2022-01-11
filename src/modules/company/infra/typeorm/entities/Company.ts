import { v4 as uuidv4 } from 'uuid';

class Company {
  id?: string;

  name: string;

  description: string;

  cnpj: string;

  latitude: number;

  longitude: number;

  created_at: Date;

  updated_at: Date;

  created_by: string;

  updated_by: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Company };
