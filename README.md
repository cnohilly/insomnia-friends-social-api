# 18 NoSQL: Social Network API

In this project, I was required to create a database with MongoDB and the API to manage that database with [Express](https://www.npmjs.com/package/express) and [Mongoose](https://www.npmjs.com/package/mongoose)] in order to create a functional backend for a Social Network app. This app needed to be capable of having Users who can add friends (other users) and create Thoughts. Thoughts are simple posts with a body and author. The API should allow for all CRUD (Create, Read, Update, Destroy) functions for both Users and Thoughts, and allow for creating and deleting Reactions to Thoughts.

The video demonstration of the API can be found here: [Social Network API Demo](https://www.youtube.com/watch?v=vWzIxtsruhw)

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```


## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## API Demonstration

The video demonstration of the API can be found here: [Social Network API Demo](https://www.youtube.com/watch?v=vWzIxtsruhw)

GIFs from the above video are below:

![demonstrating the user routes and starting the server](./assets/users-gif.gif)

![demonstrating the thoughts routes](./assets/thoughts-gif.gif)

![demonstrating the reactions routes](./assets/reactions-gif.gif)