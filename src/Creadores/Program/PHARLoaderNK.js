if(script.getScriptByName("PHPEngineNK")){
const PHARLoaderNK = Class(Object, {
  constructor: function(fileP){
    let lib = new NnClassLoader({ urls: ["https://github.com/npetrovski/jphar/releases/download/2.0.1/jphar-2.0.1.jar"] });
    let PHARLib = lib.type("name.npetrovski.jphar.Phar");
    let PharF = new PHARLib(fileP);
    let subClass = {
      getPhar: function(){
        return PharF;
      },
      evalPHP: function(dir, PHPEngineNKContext){
        let fileSearch = PharF.findEntry(dir);
        if(fileSearch == null){
          throw "The file was not found in the PHAR!";
        }
        let inputFile = fileSearch.getInputStream();
        let FilesImport = new JavaImporter(java.io, java.nio.charset);
        let reader;
        with(FilesImport){
          reader = new InputStreamReader(new BufferedInputStream(inputFile), StandardCharsets.UTF_8);
        }
        PHPEngineNKContext.eval(reader);
      },
      getFile: function(dir){
        return PharF.findEntry(dir);
      }
    };
    return subClass;
  }
});
}else{
  console.error("§c Could not load PHARLoaderNK Library");
  throw "PHPEngineNK Library Not Found!";
}
