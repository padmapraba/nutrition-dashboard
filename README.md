# Nutrition Dashboard
## Team: Padma Prabagaran, Manali Redkar, Anjali Singh, Pallavi Koyye

## Overview
![thumbnail](images/thumbnail.png)
For this project we have implemented a nutrition dashboard with the help of data visualization techniques and the D3 library. Many people may wonder whether the foods they are eating is healthy or not. The go-to method to obtain an answer to this problem is to google each food item and compare its nutritional values. Our solution to this drawback is a dashboard that consists of nutritional information about all foods in one place. This dashboard will be a source for individuals to use, specifically for nutritionists, dieticians, and other food enthusiasts to visualize different food items and their nutritional value.
## Data
- Source: https://corgis-edu.github.io/corgis/csv/ingredients/
- Preprocessing: Since some of the attributes in the data were in different units we decided to convert all of them to milligrams using python. We also only chose a subset of the data to use in our dashboard for the ease of implementing it.
## Tasks
## Idioms
The interface consists of 4 main visualizations that provide different nutritional insights. The charts used are:
  1. Pie chart
  2. Bar chart 
  3. Circular packing chart 
  4. Nutritional label 
 
  The first visualization, which is a pie chart that shows the macronutrient information of the food item selected in the second dropdown menu. This visualization will give the user a high-level breakdown of the distribution of main nutrients in the food item. 
  The second visualization, which is a bar chart that is linked with the pie chart from the first. When a sector on the pie chart is clicked on, the visualization to the right is updated with a bar chart that gives the detailed nutrient information of the specific macronutrient. For example, if the Vitamins and Minerals section is clicked on, the visualization on the right will show a bar chart populated with the different amounts of vitamins and minerals such as Vitamin A, Vitamin C, Zinc, etc found in the food item selected on the second dropdown menu. This visualization gives users a much deeper understanding of the specific nutrients found in the food item.
	The third visualization in our dashboard is a circular packing chart that shows the specific nutrient information (chosen from dropdown 3). Usually, one of the biggest questions on a user's mind while looking at the nutrition of a specific food item would be if there is a healthier alternative. This visualization attempts to answer this question. Based on the food category selected in dropdown 1, this visualization compares the value selected in dropdown 3 among the different items in the food category. The food selected in the second dropdown will be highlighted in this chart for ease of comparing it to others. When the user hovers over a circle the circle is highlighted by increasing its border and the numerical data of the value selected in the 3rd dropdown is displayed in the circle.
  The fourth visualization in our dashboard mimics the nutrition label that can be found on most food packages. This visualization is also our “innovative view”.  This is an extension of an existing technique and the aim of this visualization is to give the users a brief rundown of the most important nutrients in each food item. The plan is to make this visualization using just rectangles and text. 

  <img src="images/dropdowns.png" alt="dd1" width="600"/>
  <img src="images/a.png" alt="viewA" width="450"/> <img src="images/b.png" alt="viewB" width="450"/>
  <img src="images/c.png" alt="viewC" width="600"/>
  <img src="images/d.png" alt="viewd" height="600"/>
  
## Reflection

## Team Workload
- Padma:
- Manali:
- Anjali:
- Pallavi:

