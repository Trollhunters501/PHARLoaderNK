<?php
echo "Empaquetando PHAR...\n";
$pharFile = "Example.phar";
$phar = new Phar($pharFile);
$phar->startBuffering();
$phar->buildFromDirectory('Plugin');
$phar->stopBuffering();
if (Phar::canCompress(Phar::GZ)) {
    $phar->compressFiles(Phar::GZ);
}
echo "Done!\n";
?>