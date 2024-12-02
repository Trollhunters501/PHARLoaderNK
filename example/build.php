<?php
echo "Empaquetando PHAR...\n";
$pharFile = "Example.phar";
$phar = new Phar($pharFile);
$phar->setAlias("Example-1.1.1.phar");
$phar->buildFromDirectory(dirname(__FILE__) . '/Plugin');
if (Phar::canCompress(Phar::GZ)) {
    $phar->compressFiles(Phar::GZ);
} elseif (Phar::canCompress(Phar::BZ2)) { 
    $phar->compressFiles(Phar::BZ2); 
}
$phar->setSignatureAlgorithm(Phar::SHA512);
$phar->setStub("<?php __HALT_COMPILER(); ?>");
echo "Done!\n";
?>
