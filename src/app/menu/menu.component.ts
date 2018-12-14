import { Component, OnInit } from '@angular/core';
import { RecipeServiceService } from '../recipe-service.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  recipies:Recipe[];
  recipeList:String[];
  recipeFetched:Recipe = new Recipe();
  recipeToAdd:Recipe = new Recipe();
  recipeSelected:Recipe = new Recipe();
  id:number;
  welcomeScreen:boolean = true;
  fetchScreen:boolean = false;
  addScreen:boolean = false;

  constructor(private recipeServiceService: RecipeServiceService) { }

  ngOnInit() {
   
      this.getAllRecipes();
    }

    getAllRecipes(){

        this.recipeServiceService.fetchInitRecipeList().subscribe(
        response => {
          this.recipies = response;
        },
        error => console.log('error',error)
         );
    }

    getRecipe(id: number) {
        this.recipeServiceService.getRecipe(id).subscribe(
          response => {
            this.recipeFetched = response;
            this.welcomeScreen = false;
            this.fetchScreen = true;
            this.addScreen = false;
          },
          error => console.log('error', error)
          
        );
    }

    addRecipe() {
      if(this.recipeToAdd.recipeName && this.recipeToAdd.recipeName != '') {
       this.recipeServiceService.addRecipe(this.recipeToAdd).subscribe(
         response => {
          this.welcomeScreen = false;
          this.fetchScreen = false;
          this.addScreen = true;
          this.getAllRecipes();
          alert("Recipe added successfully");
         },
         error => console.log('error', error)
      );
     }
     else {
       alert("Please enter the required fields");
     }
    }

    addRecipeScreen() {
        this.welcomeScreen = false;
        this.fetchScreen = false;
        this.addScreen = true;
    };
  }

 
