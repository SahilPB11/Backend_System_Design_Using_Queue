import { registerUser, loginUser } from '../src/auth.js';
import { pool } from '../src/database.js';


beforeAll(async () => {
  await pool.query('DELETE FROM users');
});

test('registers a new user', async () => {
  await registerUser('testuser', 'password');
  const result = await pool.query('SELECT * FROM users WHERE username = $1', ['testuser']);
  expect(result.rows.length).toBe(1);
});

test('logs in an existing user', async () => {
  const token = await loginUser('testuser', 'password');
  expect(token).toBeTruthy();
});
