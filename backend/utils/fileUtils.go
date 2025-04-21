package utils

import (
	"backend/types"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
)



const StoragePath = "./data/storage.json"

func SaveRecipeToFile(newRecipe types.Recipe) error {
	// Ensure the tmp directory exists
	if err := os.MkdirAll(filepath.Dir(StoragePath), os.ModePerm); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}

	var recipes []types.Recipe

	// Load existing recipes
	if file, err := os.ReadFile(StoragePath); err == nil {
		if err := json.Unmarshal(file, &recipes); err != nil {
			return fmt.Errorf("failed to parse existing recipes: %w", err)
		}
	}
	recipes = append(recipes, newRecipe)
	data, err := json.MarshalIndent(recipes, "", "  ")
	if err != nil {
		return fmt.Errorf("failed to marshal recipes: %w", err)
	}

	if err := os.WriteFile(StoragePath, data, 0644); err != nil {
		return fmt.Errorf("failed to write file: %w", err)
	}
	fmt.Println("SaveRecipeToFile")
	return nil
}

func SaveRecipesToFile(recipes []types.Recipe) error {
	data, err := json.MarshalIndent(recipes, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile("data/recipes.json", data, 0644)
}

func LoadRecipesFromFile(path string) ([]types.Recipe, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var recipes []types.Recipe
	if err := json.Unmarshal(data, &recipes); err != nil {
		return nil, err
	}
	fmt.Println(recipes)

	return recipes, nil
}