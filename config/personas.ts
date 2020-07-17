export const personas: UserInfo[] = [
  { name: 'user 1', login: 'user1@example.com', password: 'user1' },
  { name: 'user 2', login: 'user2@example.com', password: 'user2' },
  { name: 'user 3', login: 'user3@example.com', password: 'user3' },
];

const userLogins: string[] = personas.map((p: UserInfo): string => p.login);

export function user(login: Email | undefined): UserInfo | undefined {
  if (login === undefined) {
    // eslint-disable-next-line no-console
    console.warn(`User login is undefined. Available logins are: ${userLogins}.
    (You can optionnaly add to the testcafe command-line the option: --user=${userLogins[0]})`);
    return undefined;
  }
  const foundUser = personas.filter((p: UserInfo): boolean => p.login === login)[0];
  if (foundUser) {
    return foundUser;
  }

  // eslint-disable-next-line no-console
  console.warn(`User login "${login}" is not found. Available logins are: ${userLogins}`);
  return undefined;
}
export interface UserInfo {
  name: string;
  login: Email;
  password?: string;
}

export type Email = 'user1@example.com' | 'user2@example.com' | 'user3@example.com';
