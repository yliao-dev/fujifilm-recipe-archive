export interface ItemResponse {
  data: Item;
  message: string;
}

export interface Item {
  _id: number;
  status: boolean;
  body: Record<string, any>;
}

export interface NewJob {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}
