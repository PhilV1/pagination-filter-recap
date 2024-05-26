
## pagination und filter recap:

 1. Importieren Sie Todos-Daten von der JSONPlaceholder-Website.
 2. Erstellen Sie eine neue Datenbank mit einem Sammlungsnamen in Ihrer MongoDB.

 3. **Erstellen Sie die package.json mit `npm init -y`**
 4. **Setzen Sie den Typ in der packag.json auf `type: modules`**
 5. **Installieren Sie die benötigten Pakete `npm i   dotenv express  mongoose`**

 6. **Einrichten von Umgebungsvariablen:**
 - Erstellen Sie eine .env-Datei mit folgendem Inhalt
  ```javascript

  MONGO_URL = mongodb+srv://name:password@cluster0.4cq8gx4.mongodb.net/pagination
  PORT=3000
  ```

7. **Todomodell erstellen**
 - Erstellen Sie eine neue ordner  `models`
 - In `models` Erstellen Sie eine neue Datei  `Todo.js`
 - In der `Todo.js`-Datei erstellen Sie ein Schema mit den erforderlichen Schlüsseln und Werten sowie einer Verweisung auf das Modell `Todo`, wie folgt:

 ```javascript
import  mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
```


8. **Datenbankverbindung erstellen**
 - Erstellen Sie eine neue ordner  `database`
 - In `database` Erstellen Sie eine neue Datei  `connectDB.js`
 - In der `connectDB.js`-Datei erstellen Sie eine Datenbankverbindung mit mongoDB, wie folgt:

```javascript
import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
```


9. **Express-Server erstellen und die erforderlichen Middleware importieren**
 - Erstellen Sie eine neue Datei  `server.js`
 - In der `connectDB.js`-Datei erstellen Sie eine Express-Server  mit erforderlichen Middleware und connectDb mit `url` abrufen, wie folgt:

```javascript
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
dotenv.config();

const app = express();


app.use(express.json());

const port = process.env.PORT || 5060;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Verbindung mit MongoDB hat geklappt");
    app.listen(port, () => {
      console.log("Server läuft auf:", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();


```

10.   **Endpunkten erstellen** 
 - Im server.js-Ordner erstellen Sie einen neuen Endpunkt, um alle Todos von MongoDB abzurufen.
Endpunkte, wie folgt:

```javascript
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 
});

```

11. **query.lmit() und query.skip() benutzen**

- Fügen Sie limit()  hinzu, um  die Anzahl der Todos auf 10 zu begrenzen.
- Fügen Sie skip()  hinzu, um das erste Objekt der Daten zu überspringen.
- 
-  wie folgt:
  
```javascript
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().limit(10).skip(1)
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 
});

```
##  Um limit und skip als Abfrageparameter in der URL zu erstellen, kannst du deine URL und Abfrage wie folgt erstellen:
```javascript
   http://localhost:3000/todos?limit=10&skip=1
```
##  Und dann die Parameter von req.query wie folgt entnehmen:

```javascript
  const {limit, skip} = req.query
  const todos = await Todo.find().limit(limit).skip(skip)
```

12. **Filtern der Ergebnisse der Abfrage**

- Suche nach Todos mit  eine ID kleiner als 15 haben.
- Wie folgt: 

```javascript
const todos = await Todo.find().where('id').lt(15)
```

- Suche nach Todos mit Titeln, die das Muster 'qui' enthalten.
- Wie folgt: 

```javascript
const todos = await Todo.find({ title: { $regex: new RegExp('qui', 'i') } });
```

##  Um filtern als Abfrageparameter in der URL zu erstellen, kannst du deine URL und Abfrage wie folgt erstellen:


  
  ```js
      http://localhost:3000/todos?title=qui&id_lt=15
  ```
##  Und dann die Parameter von req.query wie folgt entnehmen:
  
```js
 const {title, id_lt} = req.query
 const todos = await Todo.find({ title: { $regex: new RegExp(title, 'i') } }).where('id').lt(id_lt);

```



13.  ## **.gitignore datei erstellen** 
 - Erstellen Sie eine neue ordner  `.gitignore`
   1. ## userController
 - In `.gitignore` Addieren Sie `.env` und `node_modules`, wie folgt:
  

```js
.env
node_modules
```

