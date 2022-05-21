const { Pool, types } = require('pg');
const pool = new Pool();

module.exports = {
  query: (text: string, params: any, callback: any) => {
    const start = Date.now();
    return pool.query(text, params, (err: any, res: any) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },
  getClient: (callback: Function) => {
    pool.connect((err: any[], client: any, done: any) => {
      const query = client.query
      client.query = (...args: any) => {
        client.lastQuery = args
        return query.apply(client, args)
      };
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000);
      const release = (err: any) => {
        done(err)
        clearTimeout(timeout)
        client.query = query
      };
      callback(err, client, release);
    });
  },
};
