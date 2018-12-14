import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  constructor(private http: HttpClient) { }

  fetchInitRecipeList(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8081/fetchRecipies`);
  }

  getRecipe(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8081/fetchRecipie/${id}`);
    //this.http.get('api/leagues/${id}').map(res => res.json());
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    console.log("IN ADD");
    return this.http.post<Recipe>(`http://127.0.0.1:8081/addRecipe`, recipe);
} 

}

/*return this.http.get(API_URL)
        .map(res => res.json()
        .subscribe(
            data => this.YOUR_VARIABLE = JSON.stringify(data),
            error => alert(error),
            () => TO_DO_AFTER_REQUEST_COMPLETION
         ));*/