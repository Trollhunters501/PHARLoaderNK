<?php
namespace org\CreadoresProgram{
    class Main{
        public function __construct(){
            //null
        }
        public function onLoad(){
            $getLogger->info("Hello");
        }
        public function onEnable(){
            $getLogger->info("World");
        }
    }
}
?>