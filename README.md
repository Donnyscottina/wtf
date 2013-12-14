Starbind
===============

Starbind is a program to allow easy mod synchronization between clients and servers for the game Starbound.

If you host a Starbound server and would like to allow players to use Starbind to synchronize mods specifically for your
server, then follow the Server installation instructions below.

Hosting a Starbind Server
---------------------------------

### Mac OSX
Download the Starbind OSX build and unzip to the directory of your choice. Edit the config.json file with your settings (see below for a description of the settings).  Place your mod zip files in the `mods` directory. Double click the StarboundServer.command file to start the server.

### Windows
Download the Starbind Win32 build and unzip to the directory of your choice. Edit the config.json file with your settings (see below for a description of the settings).  Place your mod zip files in the `mods` directory. Double click the StarbindServer.bat file to start the server.

### Linux
First, [install NodeJS](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

Once NodeJS is installed, download Starbind using Git:
` git clone https://github.com/DougHamil/starbind-server.git`

Copy the config_server.default.json file to config.json
` cp config_server.default.json config.json`

Edit the new config.json file to match your settings (see below for a description of the settings)

Next, install Starbind NodeJS dependencies with

` npm install`

And run Starbind with

` node app.js server`

Starbind Server Configuration Settings
----------------
The config.json file contains the various configuration settings available:
> PORT: The port for the Starbind server, NOT the same port as your Starbound game server

> STARBOUND_INSTALL_DIR: Path to the base of your Starbound game installation

> ADMIN_USERNAME: Username for the admin login

> ADMIN_PASSWORD: Password for the admin login

> HTTPS_KEY_FILE: Key.pem file for HTTPS, if you want use HTTPS specify the location of the file using the property

> HTTPS_CERT_FILE: cert.pem file for HTTPS, if you want to use HTTPS specify the location of the cert.pem file here.

If you leave ADMIN_USERNAME or ADMIN_PASSWORD unset or an empty string, admin login will be disabled.
If the HTTPS_KEY_FILE or HTTPS_CERT_FILE properties don't point to valid locations, then Starbind will fall back to HTTP

### Example config.json

    {
    	"PORT":1337,
    	"STARBOUND_INSTALL_DIR":"/path/to/starbound",
    	"ADMIN_USERNAME":"admin",
    	"ADMIN_PASSWORD":"password"
    }


Installing Mods
----------------------
To install a mod on the server, just drop the mod zip file in the mods directory in your Starbind installation directory.
Starbind supports the standard mod zip packages and will look for a mod.json metadata file for mod info.
Additionally, Starbind does merging and allows for partial mods to base game assets.  See mod merging below for more info.

After adding a mod zip folder to the mods directory, you will need to restart Starbind server in order for the changes to be merged in.

At the moment there is no mod manager besides a simple mod package listing available if you set a admin username/password and navigate
to the Starbind server on your browser.

Admin Panel
-------------
By supplying an admin username and password in your config.json file you will be able to login to your Starbind server by pointing your browser to the server.  Once logged in, an admin panel is provided with some basic information regarding your server.  The admin panel is still in progress as of this writing, but it will list your installed mods and give the option to start your Starbound server, though it is NOT required to start your Starbound server through the Starbind admin panel.

Mod Support and Merging
-----------------------
Starbind works with zipped mod packages as most other mod managers. Starbind also supports differential mods to existing game assets
meaning a mod can specify a player.config mod and only list the properties that should change. Starbind will read in the existing player.config
file from the Starbound/assets directory and merge the change. It will do the same with any conflicting mods.
