<h1>Setting up environment</h1>
<h3>Setting up database</h3>
    <hr>
    <li>Create MySql schema
    <li>Enter MySql connection credentials for test and development environment in <i><b>hotelApp/src/config/config.json</b></i>

<h3>Setting up dependencies</h3>
<hr>
    <li>Move into hotelApp directory
    <li>run:
       <i><b> npm install  </b></i>

<h3>Running the application</h3>
<hr>
    <li>In hotelApp directory run:
      <i><b>  npm run start</b></i>

<h3>Running tests</h3>
<hr>
   <li>In hotelApp directory run:
      <i><b>  npm run test</b></i>


<br>
<br>
<hr>
<hr>
<h1> Comments </h1>
<h3>There are some thing that I would improve if I had more time/less preassure</h3>
<li>Better error handling (For most of the routes error handling is done,  but it can be improved by checking request paramteres that are send )
<li>Image upload for hotel (I would upload photos using npm package multer and saving it in database or
 filestysem as blob. I belive that it would take me to much time)
<li>Unit/integration tests (I started writing endpoint tests, and there are few to show how it could be done, unfortunatelly I didn't have enough time to finish them or write more. Important: I am not one of those developers who think test are not important, it just was not my priority today)
<li>Database Migrations (Right now I am using sequelize sync method which always drops the schema and creates it again,
which is ofcourse bad practice. I would done migrations with sequelize-cli support.)
<li> Optimize calculation of overall hotel rating
<li> Search Hotels by name ( It is quite easy feature)