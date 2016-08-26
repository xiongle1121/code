SET NAMES UTF8;
DROP DATABASE IF EXISTS mfw;
CREATE DATABASE mfw CHARSET=UTF8;
USE mfw;
CREATE TABLE user_table(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd INT
);
INSERT INTO user_table VALUES(null,'13511111111',111111);
INSERT INTO user_table VALUES(null,'13522222222',222222);
INSERT INTO user_table VALUES(null,'13533333333',333333);
CREATE TABLE books(
  pno INT PRIMARY KEY AUTO_INCREMENT,
  src VARCHAR(32),
  time VARCHAR(32),
  download INT
);
INSERT INTO books VALUES(null,'main1.jpg','2016-03-04','2453354');
INSERT INTO books VALUES(null,'main2.jpg','2016-01-06','2246480');
INSERT INTO books VALUES(null,'main3.jpg','2016-03-21','1236548');
INSERT INTO books VALUES(null,'main4.jpg','2016-01-24','4578925');
INSERT INTO books VALUES(null,'main5.jpg','2015-12-06','1254987');
INSERT INTO books VALUES(null,'main6.jpg','2015-11-08','1336548');
INSERT INTO books VALUES(null,'main7.jpg','2015-12-23','2547891');
INSERT INTO books VALUES(null,'main8.jpg','2016-02-16','3213256');
INSERT INTO books VALUES(null,'main9.jpg','2016-02-27','5874125');
INSERT INTO books VALUES(null,'main10.jpg','2016-04-06','1523652');
INSERT INTO books VALUES(null,'main11.jpg','2016-04-16','2312365');
INSERT INTO books VALUES(null,'main12.jpg','2016-04-23','2546325');
INSERT INTO books VALUES(null,'main13.jpg','2016-5-06','2458745');
INSERT INTO books VALUES(null,'main14.jpg','2016-5-16','1254126');
INSERT INTO books VALUES(null,'main15.jpg','2016-5-26','1236325');
INSERT INTO books VALUES(null,'main16.jpg','2016-4-11','1236548');
INSERT INTO books VALUES(null,'main17.jpg','2016-2-14','3256231');
INSERT INTO books VALUES(null,'main18.jpg','2016-1-20','3652125');