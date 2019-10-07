# ARC designs; 
## Project Overview
ARC designs is a archetrial design platform that enable organizations and the general public to purchase sketch and arc designs for their dream homes, partments, and building structures.<br>

## Badges <br>


### Main features
1. A user is able to create an account and login with their credentials.
2. Users are able to browse through diffrent ARC designs
3. Authenticated users are able to add designs to cart and checkout.
4. Authenticated users can logout.

### Quick Setup
a) Open your terminal.<br>
c) Write `cd flask-arc-designs` command to checkout directory. <br>
d) Download the virtual environment with `pip install virtual env`
d) Create a virtual environment and then `pip install -r requirements/dev.txt` <br>
e) Now run the app using `python manage.py runserver` <br>

### API Features:

|URL Endpoint	|HTTP Method	|Description|
|-------------|-------------|-----------|
|`/api/designs`	|`GET`|	Fetch all posts|
|`/api/designs`|`POST`|Create a design entry|
|`/api/designs/<slug>/delete`|	`DELETE`|Delete a post|
|`/api/designs/cart/<int:cartId>`|`POST`|Add a design to cart|
|`/api/designs/cart/<int:cartId>/delete`|	`DELETE`|Delete a design from cart|
|`/api/auth/signup`|`POST`|Registering  user|
|`/api/auth/login`|`POST `|Login user|
|`/api/designs/cart/<int:cartId>`|`GET `|Fetch post from cart |

# Authors
David Kayongo
