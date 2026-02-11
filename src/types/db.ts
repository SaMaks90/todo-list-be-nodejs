interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

type IProfileUser = Omit<IUser, "password">;

interface IProject {
  id: string;
  name: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

const Roles = {
  member: "member",
  owner: "owner",
} as const;

type Role = (typeof Roles)[keyof typeof Roles];

interface IProjectMember {
  id: string;
  user_id: string;
  project_id: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

const TaskStatus = {
  open: "open",
  inProgress: "in progress",
  closed: "closed",
} as const;

type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

const TaskPriority = {
  low: "low",
  medium: "medium",
  high: "high",
} as const;

type TaskPriorityType = (typeof TaskPriority)[keyof typeof TaskPriority];

interface ITask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatusType;
  priority: TaskPriorityType;
  user_id: string;
  assigned_to_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IPaginationMeta {
  total: number;
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

const PaymentStatus = {
  pending: "pending",
  paid: "paid",
  failed: "failed",
  refunded: "refunded",
} as const;

type PaymentStatusType = (typeof PaymentStatus)[keyof typeof PaymentStatus];

const Currency = {
  USD: "USD",
  EUR: "EUR",
  UAH: "UAH",
  PLN: "PLN",
};

type CurrencyType = (typeof Currency)[keyof typeof Currency];

interface IPayment {
  id: string;
  user_id: string;
  amount: number;
  status: PaymentStatusType;
  currency: CurrencyType;
  created_at: Date;
  updated_at: Date;
  description: string;
  idempotency_key: string;
}

export { Roles, TaskStatus, TaskPriority, PaymentStatus, Currency };
export type {
  IUser,
  IProfileUser,
  IProject,
  IProjectMember,
  Role,
  TaskStatusType,
  TaskPriorityType,
  ITask,
  IPaginatedResponse,
  PaymentStatusType,
  CurrencyType,
  IPayment,
};
