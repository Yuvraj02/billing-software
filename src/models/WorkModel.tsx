export interface SpecificWorkProperties {
    work_id: string;
    customer_id?: number;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    work_status: string; // Consider 'Pending' | 'Completed' for type safety
    date: Date; // <-- This is where your Date type lives
}

// This interface can represent any additional, dynamic properties.
export interface DynamicWorkProperties {
    [key: string]: number | string | undefined | Date;
}

// Combine them using an intersection type
export type WorkModel = SpecificWorkProperties & DynamicWorkProperties;
