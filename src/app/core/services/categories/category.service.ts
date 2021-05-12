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


  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/products/get_categories`);
  }

  // TODO: OSCAR
  // getCategory(id: string) {
  //   return this.http.get<Category>(`${environment.url_api}/products/categories/${id}`);
  // }

  createCategory(category: Category) {
    return this.http.post(`${environment.url_api}/products/create_category`, category);
  }

  // TODO SANTIAGO
  // updateCategory(id: string, changes: Partial<Category>) {
  //   return this.http.put(`${environment.url_api}/categories/${id}`, changes);
  // }
  //
  // deleteCategory(id: string) {
  //   return this.http.delete(`${environment.url_api}/delete_category/${id}`);
  // }
}
