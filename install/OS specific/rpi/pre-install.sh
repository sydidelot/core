#!/bin/sh
systemctl mask serial-getty@ttyAMA0.service
systemctl stop serial-getty@ttyAMA0.service
systemctl mask serial-getty@ttymxc0.service
systemctl stop serial-getty@ttymxc0.service
systemctl stop serial-getty@ttyS0.service
systemctl mask serial-getty@ttyS0.service
systemctl stop dietpi-service
systemctl mask dietpi-service
echo "tmpfs  	      /tmp            tmpfs  defaults,size=64M                                       0 0" >> /etc/fstab
apt-get -y install locate tar unzip telnet wget logrotate dos2unix fail2ban
apt-get -y install apache2 apache2-utils libexpat1 ssl-cert
echo jeedom > /etc/hostname
(echo "Mjeedom96";echo "Mjeedom96";) | passwd root
rm /root/.not_logged_in_yet
rm /etc/motd
wget https://raw.githubusercontent.com/jeedom/core/beta/install/motd -O /etc/motd
echo "deb http://repozytorium.mati75.eu/raspbian jessie-backports main contrib non-free" >> /etc/apt/sources.list
echo "#deb-src http://repozytorium.mati75.eu/raspbian jessie-backports main contrib non-free" >> /etc/apt/sources.list
gpg --keyserver pgpkeys.mit.edu --recv-key CCD91D6111A06851
gpg --armor --export CCD91D6111A06851 | apt-key add -
rm -rf /root/.bashrc
wget https://raw.githubusercontent.com/jeedom/helper/master/install-server/bashrc?token=ABdwJOoJCWA01DFrg4ANxuEP6AKTa665ks5XWm4EwA%3D%3D -O /root/.bashrc
(echo "@reboot root [[ -f /var/www/html/core/config/common.config.php ]] && exit 0;cd /root;echo '<script>setTimeout(function(){ location.reload(); }, 1000);</script>Start installation of jeedom in 30s, please wait.' > /var/www/html/index.html;sleep 30;rm -rf /root/install.sh;wget https://raw.githubusercontent.com/jeedom/core/beta/install/install.sh -O /root/install.sh;chmod +x /root/install.sh;PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin;/root/install.sh -h 1 > /var/www/html/index.html 2>&1;"; crontab -l) | crontab -