<?php
import cn.nukkit.Nukkit;
namespace org\CreadoresProgram{
    class Main{
        public $getLogger;
        public function __construct(){
            global $getLogger;
            $this->getLogger = $getLogger;
        }
        public function onLoad(){
            $this->getLogger->info("Hello");
            $this->getLogger->info(\cn\nukkit\Nukkit::VERSION);
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
