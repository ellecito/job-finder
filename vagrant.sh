#!/bin/bash

sudo su

apt-get update

apt-get install apache2 -y
apt-get install php7.0 -y
apt-get install libapache2-mod-php7.0 -y
apt-get install php7.0-xml -y

a2enmod rewrite

echo '
<Directory "/var/www">
    AllowOverride All
</Directory>' >> /etc/apache2/sites-available/000-default.conf

service apache2 restart