import { hash } from 'bcrypt';
import { createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

async function create() {
  const connection = await createConnection();

  const id = uuidv4();
  const hashedPassword = await hash('admin', 8);

  await connection.query(`
    INSERT INTO users VALUES (
      '${id}', 'Administrator', 'admin@hublocal.com', '${hashedPassword}', true, '${new Date().getTime()}', '${new Date().getTime()}'
    )
  `);

  await connection.close();
}

create().then(() => console.log('Admin user created'));
