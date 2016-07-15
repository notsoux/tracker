#http://www.linuxfromscratch.org/blfs/view/svn/general/apr.html
cd apr-1.5.2
./configure --prefix=/usr    \
            --disable-static \
            --with-installbuilddir=/usr/share/apr-1/build
make
make install