import { Product } from './product';

export interface Order {
  orderId?: number;
  dateCreated?: Date;
  userId: string;
  products: Product[];
  total: number;
}
