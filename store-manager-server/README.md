# e-Store Manager Server
e-Store Manager Server is a Spring Boot Application used for hosting a server-side Store Manager.
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
**MySql Or MariaDB Database latest version**
`https://www.mysql.com/downloads/`

**Java JDK 8**
`https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html`

**Redis Database latest version**
`https://redis.io/download`

**Apache Maven 3.0 or above (For contributors)**  
If you use some IDE such as IDEA Intellij or Eclipse IDE, they could include the Maven integration. Or if you don’t already have Maven installed or you want to use Maven in your terminal instead, you can follow the instructions at http://maven.apache.org.

### Installing
#### Clone
Clone this repo to your local machine using https://github.com/
#### Starting up the server
##### Using our release package
`java -jar store-0.0.1-SNAPSHOT.jar`
##### (For contributors) Using Maven
- Running on Intellij or Eclipse
- Running on cmd: `mvn spring-boot:run`

#### Database Table Building Script
**Warning: The MySql and Redis Database is configure based on the configuration of the developer's local machine. For more details, go to src/main/resources/application.properties (Spring DATASOURCE and redis properties Section) to see or change the database configure used for deploy or running on your local machine. After changing the configure, run the `mvn spring-boot:run` again to restart the server.**

The eStoreManager.sql file is scripting file responsible for building sample database system into MySql server.

## Built with
- Maven

## Documentation
### API Documentation
* [hackmd.io online](https://hackmd.io/_uMJukxZTsOt3VEP3eO92g?view)

### Postman sample request
* [Postman saved json file](https://bitbucket.org/vietanhdev/isd.ict.20181-01/src/master/Project/eStoreManager-SERVER/Postman)

### Account Admin:
```
{
    "username": "admin",
    "email": "admin@gmail.com"
    "password": "admin@gmail.com",
    "roles": [
        "ROLE_ADMIN"
    ]
}
```

## Version
0.0.1
## Authors
- Trung Dung Vu
- Nguyen Sy An
- Nguyen Xuan Hoang