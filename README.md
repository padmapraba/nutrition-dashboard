# Nutrition Dashboard
## Team: Padma Prabagaran, Manali Redkar, Anjali Singh, Pallavi Koyye

## Overview
![thumbnail](images/thumbnail.png)
For this project we have implemented a nutrition dashboard with the help of data visualization techniques and the D3 library. Many people may wonder whether the foods they are eating is healthy or not. The go-to method to obtain an answer to this problem is to google each food item and compare its nutritional values. Our solution to this drawback is a dashboard that consists of nutritional information about all foods in one place. This dashboard will be a source for individuals to use, specifically for nutritionists, dieticians, and other food enthusiasts to visualize different food items and their nutritional value.
## Data
The data that was used for this nutrition dashboard is the Ingredients dataset from CORGIS. This data was initially obtained from the USDA’s Food Composition Database and consists of data for different types of food ingredients with their nutritional values. The type of dataset we used is a table and the original dataset, before any preprocessing, had a total of 2333 data points but we shortened it to around 70 food items for ease of implementation. The dataset also had 33 different attributes out of which we used 29 attributes. Two of the attributes were categorical and these were then used to populate dropdowns 1 and 2 but the rest were all quantitative.
- Source: https://corgis-edu.github.io/corgis/csv/ingredients/
- Preprocessing: Since some of the attributes in the data were in different units we decided to convert all of them to milligrams using python. We also only chose a subset of the data to use in our dashboard for the ease of implementing it.
## Tasks
The main task of this dashboard is for the user to find the user to find the nutritional information of a specific food item. The dashboard will show this visualization in an organized way and the users will consume this information. The users can utilize this information for their dietary needs and customize their food plan. The visualization also has a nutritional label and will show the exact amount of nutrients. The users don’t have to do research for this data. This nutritional dashboard is extremely beneficial for the people with specific dietary needs and everything they need will be displayed.

Another goal of the nutritional dashboard is for the users to be able to compare the items and pick the healthiest option for them. Not only should the user be able to know the nutrients in the specific, but they should be able to compare it with other items. When the user selects the items in the drop downs, the dashboard is tasked with comparing that item with other items of the same category. Through this, the user is able to compare their selected item to the other items and decide if it fits their dietary needs.

While some online nutritional sources show the most popular items such as calories, carbohydrates, sodium, and the other items found on the back of most packages, others are filled with so much information which confuses the user. This dashboard was tasked with showcasing a more detailed visualization of all the nutrients in the micronutrient. The goal do this visualization was to give a much deeper understanding of each nutrient found in a food item. 

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
<p align="center">
  <img src="images/dropdowns.png" alt="dd1" width="700"/>
</p>
  
<p align="center">
  	<img src="images/a.png" alt="viewA" width="400"/> 
	<img src="images/b.png" alt="viewB" width="400"/>
</p>
<p align="center">
  <img align="center" src="images/c.png" alt="viewC" width="700" />
</p>
<p align="center">
  <img align="center" src="images/d.png" alt="viewd" height="400"/>
</p>
 
  
  
## Reflection

Initially, our project had a proposal that displayed four svg elements with their respective charts. When working on the project, we had some issue displaying the pie chart inside the respective svg element and we were not then able to correspond the pie chart with the stored data. The nutrition label was not able to display either in the WIP as there was an issue the team ran into. Coming to the final product, all visualizations were displayed in their respective svgs and all were interconnected. The team was able to integrate the data to be read by each visualization performing their respective functionalities. In addition, the team added a new svg displaying additional information.

Our goals stayed persistent throughout the project as we had initially stated a clear idea. The proposal was realistic because it allowed users to clearly navigate throughout the dashboard and understand the purpose of each element. In addition, the schedule was concise and retained clear goals and tasks to be completed each week. In order to avoid miscommunication, the team stated the tasks to be completed by each member. 

There were multiple challenges that occurred throughout the project. For instance, when trying to add a description inside an svg, we were unable to wrap the text. With some research and guidance, we were able to resolve this issue. There were not features that we wanted to implement but were not able to; our team was able to present all necessary information we had proposed. We had one workaround we did when creating the info text. To display the information in an organized manner, we created a dictionary with all the information and it was able to be wrapped in the svg.

Something we would do differently in the future, is add a line chart within the nutrition label to indicate comparisons between food items. Furthermore, we could also display related videos based on the type of nutrient the user selects to gather more information.


## Team Workload
	
The team decided to divide the project into 4 parts. As we proposed four forms of visualization, each member took the responsibility of taking one visualization each. The first visualization was a pie chart that was completed by Anjali, the second was a bar chart completed by Manali, the third was a circular packing chart completed by Padma and the fourth was a nutrition label completed by Pallavi. All visualizations read data from the csv files and the dropdowns are dependent on each other.

In the pie chart, Anjali worked on taking data from the second dropdown to display the portions of carbohydrates, lipids, protein, minerals and vitamins that consist within the food type chosen from drop down 1 and the food item chosen from drop down 2. She also worked on displaying a detailed description when the user hovers over each portion of the pie chart. 

The bar chart is connected to the pie chart, hence Manali worked on taking the user click performed on the pie chart and displaying a bar chart with the specific types of macronutrients within that portion of the pie chart.

The circular packing chart is connected to the bar chart and the third drop down, hence Padma worked on displaying the food items in circular forms for the user to compare and visualize items consisting of the macronutrient selected from the bar chart. As the user hovers over the circles, a detailed description is displayed. Padma also worked on making the label.

The nutrition label is connected with dropdown 2, hence Pallavi worked on displaying the respective number of mg consisting within the food item selected. In addition, she created the label with a detailed description.

