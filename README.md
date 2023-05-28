# Fictional-Store-Backend
REST API for fictional store

#### How to run on local machine:-
1. Clone the project from github. Change "myproject" to your project name.
`git clone https://github.com/Maitryee-Choudhary/Fictional-Store---Backend.git ./myproject`
2. `cd myproject`
3. `npm install`
4. Setting up environment:-
- You will find a file named ".env.example" in config folder of project.
- Create a new file by copying and pasting the file and then renaming it to just ".env" in config folder
- Change the value of file to your environment. (MongoDb is used for DB)
5. Running API locally:-
`npm run dev`

### REST API
| METHOD | URL | ACTIONS |
| ------- | --- | -------- |
| GET | localhost:5000/api/getProduct | Fetch all products |
| GET | /api/getProduct/name/<query> | Fetch product with name containing <query> word |
| GET | /api/getProduct/category/<query> | Fetch product with category containing <query> word |
| GET | /api/getProduct/desc/<query> | Fetch product with desc containing <query> word |
| POST | /api/user/signup | Register a new user with name, email, password |
| POST | /api/user/login | Login a user with email, password |
| POST | /api/product |Adds a new product item but with admin authorization [ Admin :- email = admin@gmail.com (while creating a admin register admin with the same email only and password can be anything). Add authorization header as `Bearer <token>` while making a request ]|
| DELETE | /api/:id | Delete a product item by passing id as params - only admin can access this route, so make sure to add admin authorization header |
| PATCH | /api/:id | Update a product item by passing id as params - only admin can access this route, so make sure to add admin authorization header |
 | POST | /api/cart | Only logged in user can access this route(add authorization header) this will take an array "product_list" which contains {"prod_id":<product_id>, "qty":<number>}. It will add the following products_id into logged in user cart  |
| GET | /api/cart | Fetch list of item that are availabe in logged in user's cart |
| GET | /api/order | Fetch orders placed till now of logged in user |
| POST | /api/order | Places an order. It will clear the cart and place an order. Only logged in user can access this route |


