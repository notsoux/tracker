Vagrant.configure("2") do |config|
  	config.vm.box = "hashicorp/precise64"
 	config.vm.box_version = "1.1.0"
  	config.vm.network :forwarded_port, guest: 80, host: 1880
    config.vm.network :forwarded_port, guest: 27017, host: 27017

  	config.vm.provision "download_any", type: "shell", path: "download_any.sh"
  	config.vm.provision "install_pcre", type: "shell", path: "install_pcre.sh"
  	config.vm.provision "install_apr", type: "shell", path: "install_apr.sh"
  	config.vm.provision "install_apr-util", type: "shell", path: "install_apr-util.sh"

  	config.vm.provision "install_apache_2.4", type: "shell", path: "install_apache_2.4.sh"
	config.vm.synced_folder ".", "/usr/local/apache2/htdocs"

	config.vm.provision "start_apache_2.4", type: "shell", run: "always", inline: <<-SCRIPT
		/usr/local/apache2/bin/apachectl start
	SCRIPT

  config.vm.provision "install_curl", type: "shell", path: "install_curl.sh"
  config.vm.provision "install_mongodb", type: "shell", path: "install_mongodb.sh"

  config.vm.provision "start_mongodb", type: "shell", run: "always", inline: <<-SCRIPT
    echo "start mongdb"
    #http://stackoverflow.com/questions/12137431/test-if-a-command-outputs-an-empty-string
    mongo_pid=$(pgrep mongo)

    if [[ $? != 0 ]]; then
        echo "starting mongob"
        mongod --dbpath /home/vagrant/mongo-data &
    else
        echo "mongodb still running..."
    fi
  SCRIPT

end