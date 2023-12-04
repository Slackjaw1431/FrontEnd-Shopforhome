export class Book {
  constructor(
    public id: number,
    public bookTitle: string,
    public author: string,
    public category: string,
    public bookPrice: number,
    public quantity: number
  ) {}
}
