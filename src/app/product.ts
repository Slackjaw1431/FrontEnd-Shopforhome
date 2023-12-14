import { ProductCategory } from './product-category';

export class Product {
  constructor(
    public id?: string,
    public sku?: string,
    public name?: string,
    public brand?: string,
    public description?: string,
    public discount?: number,
    public unitPrice?: number,
    public imageUrl?: string,
    public totalSold?: number,
    public category?: ProductCategory, // Assuming ProductCategory is the related class
    public unitsInStock?: number,
    public dateCreated?: Date,
    public lastUpdated?: Date
  ) {}
}
