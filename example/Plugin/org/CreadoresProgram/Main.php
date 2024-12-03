<?php
namespace org\CreadoresProgram{
    class Main{
        public function __construct(){
            //null
        }
        public function onLoad(){
            global $getLogger;
            $getLogger->info("Hello");
        }
        public function onEnable(){
            global $getLogger;
            $getLogger->info("World");
        }
    }
}
?>