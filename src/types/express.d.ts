declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      projectId: string;
    }
  }
}

export {};
