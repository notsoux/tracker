
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.7.tgz
tar -zxvf mongodb-linux-x86_64-3.2.7.tgz
ln -s mongodb-linux-x86_64-3.2.7 mongodb
echo "setup mongodb PATH"
if [ ! -f /etc/profile.d/mongo_setup.sh ]; then
	touch /etc/profile.d/mongo_setup.sh
fi

if source /etc/profile.d/mongo_setup.sh && [ -z "$MONGO_PATH" ]; then
	echo "MONGO_PATH=/home/vagrant/mongodb/bin" >> /etc/profile.d/mongo_setup.sh
	echo "PATH=$PATH:\$MONGO_PATH" >>  /etc/profile.d/mongo_setup.sh
fi

echo "setup mongodb data folder"
if [ ! -f /home/vagrant/mongo-data ]; then
	mkdir /home/vagrant/mongo-data
fi

