<?php
import cn.nukkit.Nukkit;
$versionNK = Nukkit::API_VERSION;
namespace org\CreadoresProgram{
    class Main{
        public $getLogger;
        public function __construct(){
            global $getLogger;
            $this->getLogger = $getLogger;
        }
        public function onLoad(){
            $this->getLogger->info("Hello");
            global $versionNK;
            $this->getLogger->info($versionNK);
        }
        public function onEnable(){
            $this->getLogger->info("World");
        }
        public function onDisable(){
            $this->getLogger->info("Byee");
        }
    }
}
?>
