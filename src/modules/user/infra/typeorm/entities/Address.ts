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

import { User } from './User';

@Entity('addresses')
class Address {
  @PrimaryColumn()
  id?: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postal_code: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdUser: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedUser: User;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Address };
