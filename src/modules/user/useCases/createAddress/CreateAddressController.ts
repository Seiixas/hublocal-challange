import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressUseCase } from './CreateAddressUseCase';

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: created_by } = request.user;
    const { street, district, number, postal_code } = request.body;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    await createAddressUseCase.execute({
      street,
      district,
      number,
      postal_code,
      created_by,
    });

    return response.status(201).send();
  }
}

export { CreateAddressController };
