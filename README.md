# Framework base to build your ToManage ERP/CRM and IoT


ToManage is the first ERP software with internet of things (IOT) network in open source.

ERP software manage your organization's activity (contacts, suppliers, invoices, orders, stocks, agenda, ...).
The IOT network allow for faster and further (to collect relevant external data, to relay sensor data through, to create alerts, ...) to work in real time .

It's an Open Source ERP software with javascript language and use Nodejs MongoDB Angularjs and Totaljs .

You can freely use, study, modify or distribute it according to its Free Software licence.

You can use it as a standalone application or as a web application to be able to access it from the Internet or a LAN.


# Getting Started

## Install

Need :
 - install Node.js > 4.0
 - install MongoDB > 3.2

```shell
git clone git@github.com:ToManage/framework.git
```

```shell
npm install -g bower
npm install
bower install
```

Using demo mongoDB database from dump directory

```shell
cp config.sample config
```

A demo database is in dump directory

Edit and replace demo name database in config file

## Start

```shell
node debug.js
```

Demo authentication : admin/admin

