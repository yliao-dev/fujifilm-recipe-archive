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
  id: string;
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

// Define JobBody to wrap NewJob
export interface JobBody {
  body: NewJob;
}

// Response after creating the recipe (adjust it to match your API's response shape)
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

// Response for a successful delete operation
export interface DeleteJobResponse {
  success: boolean;
  message: string; // e.g., "Job deleted successfully"
}

// Error response structure for delete operation
export interface DeleteJobError {
  message: string; // e.g., "Job not found"
}

export interface EditJobData {}
export interface EditJobResponse {}
export interface EditJobError {
  message: string;
  code?: number;
}
