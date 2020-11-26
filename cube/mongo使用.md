---
time: '1996-09-08T23:37:07+08:00'
id: 'lvp8blv'
---
# install
```sh
docker run --name some-mongo -d mongo:tag
```
# run
```sh
docker run --name mongodb -p 27017:27017 -d mongo
```
## mongo url
mongodb://localhost:27017
## ubuntu 20.04(wsl)
### mongo-shell only

# mongo db version v4.x mongo node driver v3.2.7
## install mongo shell ubuntu 18.04/16.04
```
wget -qO - https://www.mongodb.org/static/pgp/server-3.2.asc | sudo apt-key add -
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```
## show all users for all databases under mongo shell
db.system.users.find()
## use collection

## how to create database && create user 
```js
//注意在未向mongo db中插入数据前 show dbs 不会显示此db
const MongoClient = require("mongodb").MongoClient;
const config = require("./config");
const url = `mongodb://${config.mongoUser}:${config.mongoPass}@${
  config.mongoHost
}:${config.mongoPort}`;

async function main() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const scheduleDb = client.db("DB_YOU_WANT_TO_CREATE");
    scheduleDb.addUser("USER_NAME", "PASS", { roles: ["readWrite"] });
    client.close();
  } catch (error) {
    console.log(error);
  }
}

main();

```
# mongo-shell
## connect with port
--port
## show all collections
```
db.getCollectionNames()
```


# 聚合
## lookup
类似于join
