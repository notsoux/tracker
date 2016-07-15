apt-get install -y build-essential
wget http://apache.openmirror.de//httpd/httpd-2.4.20.tar.gz
wget http://apache.panu.it/apr/apr-1.5.2.tar.gz
wget http://apache.panu.it/apr/apr-util-1.5.4.tar.gz
tar xvfz httpd-2.4.20.tar.gz
tar xvfz apr-1.5.2.tar.gz
tar xvfz apr-util-1.5.4.tar.gz

wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.39.tar.gz
tar xvfz pcre-8.39.tar.gz