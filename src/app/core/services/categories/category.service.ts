import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './../../models/category.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  createCategory(category: Category) {
    return this.http.post(`${environment.url_api}/products/category`, category);
  }

  updateCategory(category: Category) {
    return this.http.patch(`${environment.url_api}/products/category`, category);
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/products/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${environment.url_api}/products/categories/${id}`);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.url_api}/products/category/${id}`);
  }

}
