export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    token: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
  }

  public static fromJson(json: any): User {
    return new User(
      json.id,
      json.name,
      json.email,
      json.password,
      json.role,
      json.token
    );
  }

  public isAdmin(): boolean {
    return this.role === 'admin';
  }

  public isUser(): boolean {
    return this.role === 'user';
  }

  public isGuest(): boolean {
    return this.role === 'guest';
  }

  public isLogged(): boolean {
    return this.token !== '';
  }

  public isNotLogged(): boolean {
    return this.token === '';
  }

  public isSameUser(user: User): boolean {
    return this.id === user.id;
  }

  public isNotSameUser(user: User): boolean {
    return !this.isSameUser(user);
  }

  public getFullName(): string {
    return this.name;
  }

  public getShortName(): string {
    return this.name.split(' ')[0];
  }

  public getID(): number {
    return this.id;
  }

  public setID(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      token: this.token,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJson());
  }
}
