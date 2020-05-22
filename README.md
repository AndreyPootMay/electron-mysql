## Electron & MySQL Application

Electron application to implement CRUD operations using MySQL (MariaDB).

### Installing

1. Clone the project using `git clone {url}.git`.
2. Change to the directory using command prompt, terminal or power-shell use `cd electron-mysql`.
3. Inside the directory you can download the `node_modules` using _Node Package Manager_, the command is `npm install` or `npm i`.
4. Copy the environment variables example file using `cp .env.example .env`, and edit the file using Visual Studio Code, Nano, Vim or any Code-editor.

#### Database

Use a database with the next collation `utf8_general_ci`, and now you can copy the unique table DDL.

```sql
CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(16,4) NOT NULL DEFAULT '0.0000',
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
