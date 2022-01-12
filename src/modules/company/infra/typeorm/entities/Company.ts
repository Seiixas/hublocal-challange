import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../../user/infra/typeorm/entities/User';
import { Category } from './Category';

@Entity('companies')
class Company {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cnpj: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdUser: User;

  @Column()
  updated_by: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedUser: User;

  @Column()
  approved: boolean;

  @Column()
  category_id: string;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.approved = false;
    }
  }
}

export { Company };
