
ln -s httpd-2.4.20 httpd_source_tree_root
cd httpd_source_tree_root
./configure --with-apr=/usr
make
make install

#https://geekforum.wordpress.com/2014/06/17/install-apache-httpd-http-server/
rm /etc/ld.so.cache
/sbin/ldconfig

#/usr/local/apache2/bin
#sudo ./apachectl [start|stop|-v|....]
