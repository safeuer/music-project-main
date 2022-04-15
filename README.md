# Sam Feuer, Nigel Hayes, Akaash Kapoor
# COMP333 Section 2

Homework 3: BoomTree Song Rating App with Django backend and React frontend

How to run App:

0. Install React according to tutorial install instructions. 
You may also need to install axios with
```shell
>>> npm add axios
```
This is a problem we've occasionally encountered across different operating systems.

1. Run the Django backend 
    cd into music_project directory and run
    ```shell
    >>> source venv/bin/activate # activate virtual environment
    >>> cd music_backend
    >>> python3 manage.py runserver # run Django server
    ```

2. Run the React frontend 
    open a new terminal window, cd into music_project directory, and run
    ```shell
    >>> source venv/bin/activate # activate virtual environment
    >>> cd music_frontend
    >>> npm start # run React app
    ```

    in the event of compilation error, run 
    ```shell
    # install necessary dependencies. these should already be in the venv, but if not npm install should take care of it
    >>> npm install 
    >>> npm start
    ```
    Your browser should automatically open the app. If not, check <http://localhost:3000/>.

Once the app is running, sign up with a username and password and enter the site. You can double click on already existing songs to create ratings for them (or create a new song) and view the average ratings across all users. You can also edit and delete songs and edit and delete yoir ratings.

Large additional implemented feature: user registration and authentication. A user must register with a username and password before having access to the site. If a user tries to register with a username that is already taken, they will be notified and told to choose a different username. If a user enters incorrect login info, they will receive an error message and be prompted to try again. Akaash tried *very* hard to get Token Authentication working through the Rest API, but this is the best we could do. 

Work Distribution:
Sam Feuer: most of CRUD functionality for ratings
Nigel Hayes: rest of CRUD functionality for ratings, login/signup and user authentication
Akaash Kapoor: backend with REST API, login/signup and user authentication
