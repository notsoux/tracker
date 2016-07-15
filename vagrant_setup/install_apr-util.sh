#http://www.linuxfromscratch.org/blfs/view/svn/general/apr-util.html
cd apr-util-1.5.4
./configure --prefix=/usr  --with-apr=/usr
make
make install