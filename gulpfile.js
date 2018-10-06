const gulp = require('gulp');
const createDbManager = require('manage-database');
const seqDbConf = require('./backend/src/db/config/config.json');

// Determine NODE_ENV
let env = 'development';
if (['test', 'development'].indexOf(process.env.NODE_ENV) > -1) {
  env = process.env.NODE_ENV;
}

// Load DB Config
const dbConfig = seqDbConf[env];
const dbManager = createDbManager({
  user: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
});

// Gulp Tasks
gulp.task('default', defaultTask);
gulp.task('db:create', dbCreate);
gulp.task('db:createTestDb', dbCreateTestDb);
gulp.task('db:drop', dbDrop);
gulp.task('db:dropTestDb', dbDropTestDb);
// gulp.task('db:migrate', dbMigrate); ADD LATER

function defaultTask(done) {
  // place code for your default task here
  done();
}

function dbCreate(done) {
  dbManager.create(dbConfig.database, function (err) {
    if (err) {
      done(err);
      return;
    }
    console.log(`Database \'${dbConfig.database}\' created.`);
    if (env === 'development') {
      dbCreateTestDb(done);
      return;
    }
    done();
  });
}

function dbCreateTestDb(done) {
  const testDbConfig = seqDbConf['test'];
  dbManager.create(testDbConfig.database, function (err) {
    if (err) {
      done(err);
      return;
    }
    console.log(`Database \'${testDbConfig.database}\' created.`);
    done();
  });
}

function dbDrop(done) {
  dbManager.drop(dbConfig.database, function (err) {
    if (err) {
      done(err);
      return;
    }
    console.log(`Database \'${dbConfig.database}\' dropped.`);
    done();
  });
}

function dbDropTestDb(done) {
  const testDbConfig = seqDbConf['test'];
  dbManager.drop(testDbConfig.database, function (err) {
    if (err) {
      done(err);
      return;
    }
    console.log(`Database \'${testDbConfig.database}\' dropped.`);
    done();
  });
}