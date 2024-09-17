export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    emailVerifiedAt: Date;
  
    constructor(id: number, name: string, email: string, password: string, emailVerifiedAt: Date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.emailVerifiedAt = emailVerifiedAt;
    }
  }