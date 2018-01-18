#!/bin/bash

sudo su

apt-get update

apt-get install apache2 -y
apt-get install php7.0 -y
apt-get install libapache2-mod-php7.0 -y
apt-get install php7.0-xml -y

a2enmod rewrite

service apache2 restart