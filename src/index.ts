import bodyParser from 'body-parser';
import express from 'express';

import * as dotenv from 'dotenv';
import * as loginController from './controllers/login/login.controller';
import * as postsController from './controllers/posts/posts.controller';

// Loading configuration from the .ENV file.
dotenv.config();

// App express instance.
const app = express();

// Body parser middleware to better handle/manage all the requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/src/posts/views'));
app.use('/styles', express.static('src/styles'));
app.use('/scripts', express.static('src/scripts'));

// Login controller.
app.get('/', loginController.index);
app.get('/getLoggedUser', loginController.getCurrentUser);
app.get('/signinAsGuest', loginController.signinAsGuest);
app.post('/signin', loginController.signin);

// Post controller.
app.get('/posts', postsController.index);
app.get('/posts/view', postsController.viewById);
app.get('/posts/getById', postsController.openById);
app.get('/posts/get', postsController.getAll);
app.get('/posts/create', postsController.createView);
app.post('/posts/create', postsController.create);

// Configuring the port to listen based on the env file, otherwhise we're going to take 8080 as default.
const portNumber: string = process.env.PORT_NUMBER || '8080';

// tslint:disable-next-line:no-console
app.listen(portNumber, () => console.log(`Application is listening on port ${portNumber}!`));
