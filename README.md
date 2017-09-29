<a href="https://www.tomanage.fr/?=en" target="_blank">
<img src="https://www.tomanage.fr/images/gestion-de-production-tomanage-logo.png" alt="ERP software open source with IOT ToManage" data-canonical-src="https://www.tomanage.fr/images/gestion-de-production-tomanage-logo.png" style="max-width:100%;">
</a>

# Framework base to build your ToManage ERP/CRM and IoT

![Build status](https://img.shields.io/travis/ToManage/TM-CRM_ERP/develop.svg)

ToManage is the first ERP software with internet of things (IOT) network in open source.

ERP software manage your organization's activity (contacts, suppliers, invoices, orders, stocks, agenda, ...).
The IOT network allow for faster and further (to collect relevant external data, to relay sensor data through, to create alerts, ...) to work in real time .

<a href="https://www.tomanage.fr/?=en" target="_blank">
<img src="https://www.tomanage.fr/images/en/erp-software-open-source-iot-tomanage-diagram.jpg" alt="ERP software open source with Internet of things network schema ToManage" data-canonical-src="https://www.tomanage.fr/images/en/erp-software-open-source-iot-tomanage-diagram.jpg" width="673" height="386">
</a>


It's an Open Source ERP software with javascript language and use Nodejs MongoDB Angularjs and Totaljs .
<p><a href="https://www.tomanage.fr/logiciel-open-source/?=en" target="_blank">
<img src="https://cdn.evbuc.com/eventlogos/188938959/angularnodejstotaljsmongodb-1.jpg" alt="ERP software open source with Internet of things network totaljs nodejs angularjs mongodb" data-canonical-src="https://www.tomanage.fr/logiciel-open-source/?=en" style="max-width:100%;">
</a></p>

You can freely use, study, modify or distribute it according to its Free Software licence.

You can use it as a standalone application or as a web application to be able to access it from the Internet or a LAN.

<a href="https://www.tomanage.fr/?=en" target="_blank">
<img src="https://www.tomanage.fr/images/logiciel-cms-prise-de-commande-en-ligne-to-manage.png" alt="ERP software open source with IOT ToManage screen" data-canonical-src="https://www.tomanage.fr/images/logiciel-cms-prise-de-commande-en-ligne-to-manage.png" style="max-width:100%;">
</a>


# Getting Started

## Install

Need :
 - install Node.js 4.x
 - install MongoDB 3.2

```shell
curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
apt-get install nodejs
```

```shell
git clone git@github.com:ToManage/framework.git
```

```shell
npm install
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

## Run node.js service with systemd

Create /etc/systemd/system/nodeserver.service

```shell
[Unit]
Description=ToManage ERP
Documentation=https://www.tomanage.fr
After=network.target
Requires=mongodb.service

[Service]
Environment=NODE_PORT=8000
Type=simple
User=root
Group=root
# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nodeserver
ExecStart=/usr/bin/node /path/to/tomanage/debug.js
WorkingDirectory=/path/to/tomanage
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
Enable the service

```shell
systemctl enable nodeserver.service
Created symlink from /etc/systemd/system/multi-user.target.wants/nodeserver.service to /etc/systemd/system/nodeserver.service.
```
Start the service

```shell
systemctl start nodeserver.service
```

Demo authentication : admin/admin

Good coding :)


Follow us :
<p><a href="https://twitter.com/ToManage_js" target="_blank">On Twitter</a></p>
<p><a href="https://www.linkedin.com/company/6648031" target="_blank">On Linkedin</a></p>
<p><a href="https://plus.google.com/u/0/115392823150899643360" target="_blank">On Google +</a></p>
<p><a href="https://www.facebook.com/ToManage.erp/" target="_blank">On Facebook</a></p>
