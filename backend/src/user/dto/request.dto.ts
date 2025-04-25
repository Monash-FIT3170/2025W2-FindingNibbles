interface RequestUser extends Request {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
  }