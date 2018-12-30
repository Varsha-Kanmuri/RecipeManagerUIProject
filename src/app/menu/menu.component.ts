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
  recipeToAdd:Recipe= new Recipe();
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

    addRecipe(recipeToAdd:Recipe) {
      if(this.recipeToAdd.recipeName && this.recipeToAdd.recipeName != '' && this.checkIngredientsValid(this.recipeToAdd)) {
       this.recipeServiceService.addRecipe(this.recipeToAdd).subscribe(
         response => {
          this.welcomeScreen = false;
          this.fetchScreen = false;
          this.addScreen = true;
          this.getAllRecipes();
          alert("Recipe added successfully"); 
         },
         error => {
                    alert('Please check the arguments, ensure your Recipe name is not duplicate');
                    console.log("error",error);
        }
      );
     }
     else if(!this.checkIngredientsValid(this.recipeToAdd)){
       alert("We cannot have recipes with no ingedients!!!");
     }
     else {
       alert("Please enter valid Recipe Name");
    }

  };

    addRecipeScreen() {
        this.welcomeScreen = false;
        this.fetchScreen = false;
        this.addScreen = true;
    };

    checkIngredientsValid(recipeToAdd:Recipe) {
      for (var ingredient of recipeToAdd.items) {
        console.log(ingredient); 
        if(ingredient != ''){
          return true;
        }
      }
      return false;
    };

    resetRecipe() {
      this.recipeToAdd = new Recipe;
    }
  }

 
