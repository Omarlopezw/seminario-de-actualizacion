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
    // let sql = `CALL ${name}('${argument}')`

    let parameters = args.slice(1).map( ()=> '?').join(',')
    let sql = `CALL ??(${parameters})`;
    console.log(args)
    
    this.mysqlConnection.query( sql ,args,( err,result ) =>
    {
      if( err )
      {
        console.log( 'There is a error',err )
      }
      else 
      {
        console.log( 'Result: ',result )
      }
      // const ID = result.insertId;
      // resolve(ID)
    })
  }
  disconnect()
  {
    console.log('disconnected from the database')
    this.mysqlConnection.end();
  }
}

// db = new DataBaseHandler(file);

// db.connect();
// db.callStoredProcedure(`selectAllData`,`\`group\``);
// db.callStoredProcedure(`addUser`,`juan`,`1321321`);
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
