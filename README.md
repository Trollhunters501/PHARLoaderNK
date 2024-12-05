# PHARLoaderNK
Load phar files into Nukkit for PHPEngineNK!
# Dependencies:
- [JSEngineNK](https://cloudburstmc.org/resources/jsenginenk.939/)
- [JSENK2](https://cloudburstmc.org/resources/jsenk2.1017/)
- [PHPEngineNK](https://cloudburstmc.org/resources/phpenginenk.968/)
# Getting started
put the tgz file in the plugins/JSENK2 folder

put your phar plugins in the plugins/PHARLoaderNK folder

THIS DOES NOT LOAD POCKETMINE PLUGINS IN NUKKIT, BUT IT CAN BE VERY EASY TO ADAPT.

# How to build Phar
This script uses the JPhar library so it supports all phars that support that library.

[An example of how to package](https://github.com/Trollhunters501/PHARLoaderNK/tree/main/example)

# Plugin Yml in PHARLoaderNK
It is the same as nukkit except that there is no api, softdepend, depend, authors (but there is author), commands and permissions.

main is the same as Pocketmine

# Config
There is a configuration to add Java libraries with the NnClassLoader API
in plugins/PHARLoader/Config/NnClassLoaderPHP.json:
```json
{
  "NnClassLoader":[{
     "maven": ["groupName:package:1.0.0"]
   },
   {
      "objectName": "java.class.My"
   }]//equal to setNnClassLoader in PHPEngineNK
}
```
