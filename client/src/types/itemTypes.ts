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

// Response after creating the job (adjust it to match your API's response shape)
export interface CreateJobResponse {
  id: string; // Example field, adjust based on actual API response
  title: string;
  type: string;
  // Add other fields returned by your API
}

// Error type if you have a custom error structure
export interface CreateJobError {
  message: string;
  code?: number;
}
