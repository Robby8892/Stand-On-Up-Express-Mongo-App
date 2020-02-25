Splints
-

Sprint-One (2/21/20 - 2/24/20)
Build wireframe, models, user story and routes for the proposed project.
-
Create api route for authentication on app, can register,login, and logout
-
Project was approved, and auth api was setup with express and mongo. Had to retool modeling to be an api route instead of templating. Auth api was built and working in postman.

Sprint-Two (2/25/20 - 2/27/20)
Build out socket.io functionaility for live chats
-
Create model for chats and reference users as FK 
-
Have full crud on chats api via publically or private chats by Wednesday afternoon. Have socket.io working and allowing for live chats.

Sprint-Three (2/28/20 - 3/1/20)
Work on setting up live streaming on my app through ffmepg and OBS systems
-
create model for videos that have a user FK and chat sub document
-
Full crud on videos api and being working setting up React front end. Have live video streaming working with my api's. Have at least auth api setup with React. 



Sprint-Four (3/2/20 - 3/5/20)
Have all api's synced up in react and working with a nice design for presentation.
-
Have design layout nice and presentable. Deploy app through heroku. Have seed data on the site for presentation 


#Models 

https://files.slack.com/files-pri/T0351JZQ0-FUD4D83EH/20200221_170454.jpg




#Routes


#User Routes
`Post - /users/register - Register user info`
`Post - /users/login - Login user info`
`Delete - /users/id - Delete user by id`
`Put - /users/id - Edit user info by id`
`Get - /users/logout - Logout user`





#Chat Routes 
`Post - /chats/new - Create new chat`
`Get - /chats - Get all chats` 
`Delete - chats/id - Delete chat by id`
`Put / chats/id - Edit chat by id`





#Video Routes
`Post - /videos/new - Create new chat`
`Get - /videos - Get all videos` 
`Get - /videos/id - Get one video by id` 
`Delete - /videos/id - Delete video by id`
`Put - /vidoes/id - Edit video by id`


