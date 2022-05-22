# Todo API

### Installation

Create env file in te root directory. Then fill it with environment variables. 
```
NODE_ENV=development
PORT=4300
DATABASE_URI=postgresql://localhost:5432
PGUSER=
PGHOST=localhost
PGPASSWORD=
PGDATABASE=
PGPORT=5432
PASSWORD_SECRET_KET=
JWT_SECRET_KEY=
JWT_REFRESH_SECRET_KEY=
```

install requirements via npm.
```
npm i
```

Run database migrations.
```
npm run db:migration
```

### Running

```
npm run dev
```

### Testing

````
npm run test
```
