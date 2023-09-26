const mysql = require('mysql');
const file = require('./Config.js')

class DataBaseHandler
{
  constructor(DBConfig)
  {
    this.mysqlConnection = mysql.createConnection
      ({
          host: DBConfig.host,
          user: DBConfig.user,
          password: DBConfig.password,
          database: DBConfig.database,
      });
  }
  connect()
  {
    this.mysqlConnection.connect((error) => 
    {
      if (error) 
      {
        console.error('connection error: Try again:', error);
        return;
      }
      console.log('success connection');
    });
    
  }
  callStoredProcedure(...args) 
  {
    return new Promise((resolve, reject) => 
    {
      let parameters = args.slice(1).map(() => '?').join(',');
      let sql = `CALL ??(${parameters})`;
  
      this.mysqlConnection.query(sql, args, (err, result) => 
      {
        if (err) 
        {
          console.log('There is an error', err);
          reject(err); // Rechazar la promesa en caso de error

        } else 
        {
          let pResponseValue = result[0][0];
          resolve(pResponseValue); // Resolver la promesa con el valor
          pResponseValue = '';
        }
      });
    });
  }
  
  disconnect()
  {
    console.log('disconnected from the database')
    this.mysqlConnection.end();
  }
}

// db = new DataBaseHandler(file);

// db.connect();
// result = db.callStoredProcedure(`selectAccess`,`1`).then(response =>{console.log(response)});

// console.log('aber',result)
// db.callStoredProcedure(`addUser`,`juan`,`1321321`);
// db.callStoredProcedure(`authenticate`,`omaar`,`123456`).then(data =>
//   {
//     console.log(data);
//   });
// db.callStoredProcedure(`addGroup`,`teachers`,`423424`);
// db.disconnect();

// export let databaseHandler
// {
//   DataBaseHandler
// }
module.exports = 
{
  DataBaseHandler
};
