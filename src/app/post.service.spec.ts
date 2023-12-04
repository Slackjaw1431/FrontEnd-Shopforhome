import { TestBed } from "@angular/core/testing";

import { BookService } from "./post.service";

describe("PostService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BookService = TestBed.get(BookService);
    expect(service).toBeTruthy();
  });
});
