# Archstrore
Assignment 1
__Node.js Program to Fetch Cat Breed Data__
__Objective: Retrieve data from the Cat Fact API about cat breeds and organize them by country__.
__Steps to Execute the Program:__
1.**Getting Data from API:**
  i.The program makes a GET request to https://catfact.ninja/breeds.
  ii.Logs the response AS-IS into a text file.
2.**Counting Pages:**
  i.Console logs the number of available pages of data from the API.
3.**Fetching Data from All Pages:**
  i.Retrieves data from ALL available pages.
4.**Organizing Data by Country:**
  i.Returns cat breeds grouped by their respective countries in the format specified.
 ***Libraries Used***
   1.*Axois*-To fetch data from URL
   2.*File System (fs)*- For writing the fetched data to a text file.
   3.*Express* - To create Api's


Assignment 2
__Node.js Route to Validate Payload__
__Objective: Implement a localhost route that validates the payload for a minimum word count.__
__Steps to Implement the Route:__   
1.**Creating a Route:**
  i.Sets up a POST route on localhost to receive the payload:
2.**Payload Validation:**
  i.Uses regex to check if there are at least 8 words (word count, not characters).
3.**Response Handling:**
  i.Returns 200 OK if the payload contains at least 8 words.
  ii.Returns Not Acceptable if the payload does not meet the word count requirement.

 ***Libraries Used***
    1.*Express* - To create Api's
      
