let PHPEngineNK;
let isDisable = false;
let PhpEng;
let PathDir = server.getPluginPath() + "PHARLoaderNK/";
let FilePathDir = new java.io.File(PathDir);
let prefix = "[PHARLoaderNK] ";
let pluginsPHP = [];
let mainsPHPpls = [];
function load(){
  if(script.getScriptByName("PHPEngineNK") == null){
    console.error(prefix+"§cCould not load PHARLoaderNK Script");
    isDisable = true;
    return;
  }
  console.info(prefix+"§eLoading...");
  PHPEngineNK = require("PHPEngineNK/org/CreadoresProgram/PHPEngineNK.js").PHPEngineNK;
  FilePathDir.mkdir();
}
let LibPHAR = new NnClassLoader({ urls: ["https://github.com/npetrovski/jphar/releases/download/2.0.1/jphar-2.0.1.jar"] });
function readPhar(file){
  let Phar = LibPHAR.type("name.npetrovski.jphar.Phar");
  let pharF = new Phar(file);
  let dir = {};
  for each(let i in pharF.getEntries()){
    if(i.isDirectory()) continue;
    let inputSt = i.getInputStream();
    let buffer = new java.io.ByteArrayOutputStream();
    let Dread;
    let data = Java.to(new Array(1024), "byte[]");
    while ((Dread = inputSt.read(data, 0, data.length)) != -1){
      buffer.write(data, 0, Dread);
    }
    buffer.flush();
    dir[i.getName()] = buffer.toByteArray();
  }
}
function enable(){
  if(isDisable) return;
  PhpEng = new PHPEngineNK().build();
  console.info(prefix+"§eLoading PHP Plugins...");
  for each(let plPHP in java.util.Objects.requireNonNull(FilePathDir.listFiles())){
    if(plPHP.isDirectory() || !plPHP.getName().endsWith(".phar")) continue;
    let dirPhar = readPhar(plPHP);
    let resources = {};
    let phpCode = "";
    for each(let fileP in Object.keys(dirPhar)){
      if(fileP.endsWith(".php")){
        phpCode += ((new java.lang.String(dirPhar[fileP])) + "\n").replace("<?php", "").replace("?>", "");
      }else{
        resources[fileP] = new java.lang.String(dirPhar[fileP]);
      }
    }
    let Yaml = Java.type("org.yaml.snakeyaml.Yaml");
    let yamlIns = new Yaml();
    console.info(Object.keys(resources).toString());
    console.info(resources["plugin.yml"]);
    let PluginYml = yamlIns.load(resources["plugin.yml"]);
    if(PluginYml.get("name") == null){
      console.error(prefix+"§cNot Load "+plPHP.getAbsolutePath()+" plugin.yml name not found!");
      continue;
    }
    if(PluginYml.get("main") == null){
      console.error(prefix+"§cNot Load "+PluginYml.get("name")+" main not found!");
      continue;
    }
    console.info(prefix+"§eLoading "+PluginYml.get("name")+"...");
    PhpEng.put("resources", Java.to(resources, "java.util.Map"));
    let MainPhp = PhpEng.getEngine().eval("<?php "+phpCode + "\nreturn new \\"+PluginYml.get("main")+"();\n?>");
    mainsPHPpls[mainsPHPpls.length] = [PluginYml.get("name"), MainPhp];
    pluginsPHP[pluginsPHP.length] = PluginYml;
    PhpEng.put("pluginPHP", MainPhp);
    PhpEng.eval("<?php if(method_exists($pluginPHP, 'onLoad')){ $pluginPHP->onLoad(); } ?>");
  }
  console.info(prefix+"§eEnabling PHP Plugins...");
  PhpEng.put("requirePL", Java.to(mainsPHPpls, "java.lang.Object[][]"));
  for each(let i in mainsPHPpls){
    console.info(prefix+"§eEnablig "+ i[0]+"...");
    PhpEng.put("pluginPHP", i[1]);
    PhpEng.eval("<?php if(method_exists($pluginPHP, 'onEnable')){ $pluginPHP->onEnable(); } ?>");
  }
  manager.createCommand("plphp", "plugins php", phpPlCMD, "/plphp", [], "nukkit.command.plugins");
  console.info(prefix+"§aDone!");
}
function phpPlCMD(sender, args, label, managerCMD){
  if(sender.hasPermission("nukkit.command.plugins")){
    let msg = "Plugins PHP("+mainsPHPpls.length+"): ";
    for each(let i in mainsPHPpls){
      msg += i[0] + " ";
    }
    sender.sendMessage(msg);
    return;
  }
  sender.sendMessage("§cUnknown command. Try /help for a list of commands");
}

function getPhPplugin(name){
  for each(let i in mainsPHPpls){
    if(i[0] == name){
      return i[1];
    }
  }
  return null;
}

module.exports = {
  onEnable: enable,
  onLoad: load,
  getPhPplugin: getPhPplugin
};