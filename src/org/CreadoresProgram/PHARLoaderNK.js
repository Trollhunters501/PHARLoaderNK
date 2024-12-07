let PHPEngineNK;
let isDisable = false;
let PhpEng;
let NnClP;
let PathDir = server.getPluginPath() + "PHARLoaderNK/";
let FilePathDir = new java.io.File(PathDir);
let JsonNN = new java.io.File(PathDir+"Config/NnClassLoaderPHP.json");
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
  let JsonNNC = new java.io.File(PathDir+"Config/");
  JsonNNC.mkdir();
  if(!JsonNN.exists()){
    let escritor = new java.io.FileWriter(JsonNN);
    escritor.write('{"NnClassLoader":[]}');
    escritor.close();
  }
  let subJsN = readFully(JsonNN.getAbsolutePath());
  if(subJsN == '{"NnClassLoader":[]}') return;
  NnClP = JSON.parse(subJsN);
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
    while ((Dread = inputSt.read(data)) != -1){
      buffer.write(data, 0, Dread);
    }
    dir[i.getName()] = buffer.toByteArray();
  }
  return dir;
}
function enable(){
  if(isDisable) return;
  PhpEng = new PHPEngineNK().build();
  PhpEng.put("Phar", LibPHAR.type("name.npetrovski.jphar.Phar"));
  PhpEng.put("NKevents", new java.util.function.BiFunction(function(eventstr, callb){
    script.addEventListener(eventstr, function(event){
      PhpEng.put("eventNK3233567878_"+eventstr, event);
      PhpEng.put("callb5354646646NK_"+eventstr, callb);
      PhpEng.eval("<?php $callb5354646646NK_"+eventstr+"($eventNK3233567878_"+eventstr+"); ?>");
    });
  }));
  PhpEng.put("NKcommandAdapter", new java.util.function.Function(function(callb){
    return function CommandPHP(sender, args, label, managerCMD){
      PhpEng.put("senderCMDNK28828383_"+label, sender);
      PhpEng.put("argsCMDNK2938384_"+label, args);
      PhpEng.put("labelCMDNK283747_"+label, label);
      PhpEng.put("managetCMD902898932_"+label, managerCMD);
      PhpEng.put("callb2883833_"+label, callb);
      PhpEng.eval("<?php $callb2883833_"+label+"($senderCMDNK28828383_"+label+", $argsCMDNK2938384_"+label+", $labelCMDNK283747_"+label+", $managetCMD902898932_"+label+"); ?>");
    };
  }));
  PhpEng.put("NKTaskAdapter", new java.util.function.Function(function(callb){
    return function TaskPHP(tik){
      PhpEng.put("tik983894883443_"+tik, tik);
      PhpEng.put("callb28838338_"+tik, callb);
      PhpEng.eval("<?php $callb28838338_"+tik+"($tik983894883443_"+tik+"); ?>");
    };
  }));
  PhpEng.put("Java", Java);
  PhpEng.put("creaInsJava", new java.util.function.BiFunction(function(clazz, args){
    let Subargs = args.map(function(_, i) { return "args[" + i + "]"; }).join(", ");
    return eval("return new clazz("+Subargs+");");
  }));
  if(NnClP != null){
    PhpEng.setNnClassLoader(NnClP.NnClassLoader[0], NnClP.NnClassLoader[1]);
  }
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
    let PluginYml = yamlIns.load(resources["plugin.yml"]);
    if(PluginYml.get("name") == null){
      console.error(prefix+"§cNot Load "+plPHP.getAbsolutePath()+" plugin.yml name not found!");
      continue;
    }
    let isCopy;
    for each(let uo in pluginsPHP){
      if(uo.get("name") == PluginYml.get("name")){
        isCopy = true;
      }
    }
    if(isCopy){
      console.error(prefix+"§cNot Load "+PluginYml.get("name")+" plugin already load!");
      continue;
    }
    if(PluginYml.get("main") == null){
      console.error(prefix+"§cNot Load "+PluginYml.get("name")+" main not found!");
      continue;
    }
    if(PluginYml.get("version") == null){
      console.error(prefix+"§cNot Load "+PluginYml.get("name")+" version not found!");
      continue;
    }
    if(isNaN(parseInt(PluginYml.get("version").replaceAll(".", "")))){
      console.error(prefix+"§cNot Load "+PluginYml.get("name")+" version invalid!");
      continue;
    }
    console.info(prefix+"§eLoading "+PluginYml.get("name")+"...");
    PhpEng.put("resources", Java.asJSONCompatible(resources));
    let MainPhp = PhpEng.getEngine().eval("<?php "+phpCode + "\nreturn new \\"+PluginYml.get("main")+"();\n?>");
    mainsPHPpls[mainsPHPpls.length] = [PluginYml.get("name"), MainPhp];
    pluginsPHP[pluginsPHP.length] = PluginYml;
    PhpEng.put("pluginPHP", mainsPHPpls[mainsPHPpls.length - 1][1]);
    mainsPHPpls[mainsPHPpls.length - 1][1] = PhpEng.getEngine().eval("<?php $pluginPHP->onLoad(); return $pluginPHP; ?>");
  }
  console.info(prefix+"§eEnabling PHP Plugins...");
  PhpEng.put("requirePL", Java.asJSONCompatible(mainsPHPpls));
  for each(let i in mainsPHPpls){
    console.info(prefix+"§eEnablig "+ i[0]+"...");
    PhpEng.put("pluginPHP", i[1]);
    i[1] = PhpEng.getEngine().eval("<?php $pluginPHP->onEnable(); return $pluginPHP; ?>");
  }
  manager.createCommand("plphp", "list plugins php", phpPlCMD, "/plphp", ["pluginsphp"], "nukkit.command.plugins");
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

script.addEventListener('ServerCommandEvent', function (event){
  if(!event.getSender().hasPermission("nukkit.command.version")) return;
  let args = event.getCommand().split(" ");
  let label = args.shift();
  if(label != "ver" || label != "version") return;
  if(args[0] != "php") return;
  let msg;
  if((msg = VerfyVer(event.getPlayer(), args, label))){
    event.setCancelled(true);
    event.getSender().sendMessage(msg);
  }
});
script.addEventListener('PlayerCommandPreprocessEvent', function(event){
  if(!event.getPlayer().hasPermission("nukkit.command.version")) return;
  let args = event.getMessage().replace("/", "").split(" ");
  let label = args.shift();
  if(label != "ver" || label != "version") return;
  if(args[0] != "php") return;
  let msg;
  if((msg = VerfyVer(event.getPlayer(), args, label))){
    event.setCancelled(true);
    event.getPlayer().sendMessage(msg);
  }
});
function VerfyVer(sender, args, label){
  for each(let i in pluginsPHP){
    if(i.get("name") != args[1]) continue;
    let msg = "§2"+i.get("name")+" §fversion §2"+i.get("version");
    if(i.get("description") != null){
      msg += "\n"+i.get("description");
    }
    if(i.get("website") != null){
      msg+= "\nWebsite: "+i.get("website");
    }
    if(i.get("author") != null){
      msg += "\nAuthor: "+i.get("author");
    }
    return msg;
  }
}

function getPhPplugin(name){
  for each(let i in mainsPHPpls){
    if(i[0] == name){
      return i[1];
    }
  }
  return null;
}
function disable(){
  if(isDisable) return;
  console.info(prefix+"§cDisable PHP Plugins...");
  for each(let i in mainsPHPpls){
    PhpEng.put("pluginPHP", i[1]);
    PhpEng.eval("<?php $pluginPHP->onDisable(); ?>");
  }
}

module.exports = {
  onEnable: enable,
  onLoad: load,
  onDisable: disable,
  getPhPplugin: getPhPplugin
};