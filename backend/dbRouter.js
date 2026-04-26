import fs from 'fs';
import path from 'path';

// db drivers
import Database from 'better-sqlite3';

export default function dbRouter(app, databasesFolder, sqliteFolder) {

  let connections = {};

  // Read config
  let dbInfoFile = path.join(databasesFolder, 'databases-in-use.json');
  let dbInfos = [];

  if (fs.existsSync(dbInfoFile)) {
    dbInfos = JSON.parse(fs.readFileSync(dbInfoFile, 'utf-8'));
  }

  for (let { name, file } of dbInfos) {
    let fullPath = path.join(sqliteFolder, file);

    if (fs.existsSync(fullPath)) {
      connections[name] = {
        type: 'sqlite',
        con: new Database(fullPath)
      };
    }
  }

  // API endpoint
  app.get('/api/dbquery/:name/:query', (req, res) => {
    let { name, query } = req.params;

    let connection = connections[name];

    if (!connection) {
      return res.json({ error: 'No such db' });
    }

    try {
      if (!query.toLowerCase().startsWith('select')) {
        return res.json({ error: 'Only SELECT allowed' });
      }

      let result = connection.con.prepare(query).all();
      res.json(result);

    } catch (e) {
      res.json({ error: e.toString() });
    }
  });
}