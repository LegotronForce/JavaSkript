var fs = require("fs");
var data = "# made using JavaSkript, the JavaScript compiler for Skript!\n";
var currentTabValue = "";
let debugMode = false;

// OTHER
function debugModeOn() {debugMode = true};
function debugModeOff() {debugMode = false};

function addToData(thing) {
    data = data + "\n" + currentTabValue + thing;
}
function addToTab() {
    currentTabValue = currentTabValue + "    ";
}
function resetTabValue() {
    currentTabValue = "";
}

// EFFECTS
function broadcast(text) {
    addToData(`broadcast \"${text}\"`);
}

// COMMAND
function command(commandWithoutSlash,description,usage,permission,permissionMessage,usableBy,code) {
    resetTabValue();
    addToData(`command /${commandWithoutSlash}:`); // Adds 'command /%command_name%:'
    addToTab();
    addToData(`description: ${description}`);
    addToData(`usage: ${usage}`);
    addToData(`permission: ${permission}`);
    addToData(`permission message: ${permissionMessage}`);
    addToData(`executable by: ${usableBy}`);
    addToData(`trigger:`);
    addToTab();
    code();
    resetTabValue();
    addToData("\n");

    if(debugMode) {console.log(`found command.\n`)};
}



// This effect bans the player with a non-required reason and time.
function ban(player,reason=null,time=null) {
    let banMessage = `ban ${player} `;

    if (reason !=null) {
        banMessage = banMessage + `due to "${reason}"`;
    }
    if (time != null) {
        banMessage = banMessage + ` for ${time}`;
    }
    
    if (debugMode) {console.log(`ban-effect found: banMessage:${banMessage}, currentTabValue:${currentTabValue.length}\n`);};
    addToData(banMessage);
};

// Runs func num times
function branch(num,func) {
    for(var x = 0; x<num;x++) {
        func();
        if (debugMode) {console.log(`Branch loop, current stage: ${x}, function: ${func}\n`)};
    }
}

// unbans a player
function unban(player) {
    addToData(`unban ${player}`);
    if (debugMode) {console.log(`Unban-effect, player: ${player}.\n`)};
};

// @param type, it can be one of 3 things: shaped , shapeless , or furnace. From TuSKe
function registerRecipe(type,output,items) {
    addToData(`register new custom ${type} recipe for ${output} using ${items[0]} ${items[1]} ${items[2]} ${items[3]} ${items[4]} ${items[5]} ${items[6]} ${items[7]} ${items[8]}`);
    if (debugMode) {console.log(`found registerRecipe-effect, item array: ${items}, type: ${type}, output: ${output}\n`)}; 
}

// The registerEnchantment is from TuSKe
function registerEnchantment(id) {
    addToData(`register a new custom enchantment with id ${id}`);
    if (debugMode) {console.log(`found registerEnchantment-effect, id: ${id}\n`)}; 
}

// Makes an actionBar to the player with the text
function actionBar(text,player) {
    addToData(`send action bar with text \"${text}\" to ${player}`);
    if (debugMode) {console.log(`found actionBar-effect, text: ${text}, player: ${player}\n`)};
}

//EVENTS
// Runs when the skript is loaded. Converts to 'on load:'
function onLoad(func) {
    addToData("on load:");
    addToTab();
    func();
    resetTabValue();
    if (debugMode) {console.log(`found onLoad-Event, func: ${func}\n`)};
};

// Runs when a player joins
function onPlayerJoin (func) {
    addToData("on player join:");
    addToTab();
    func();
    resetTabValue();
    if (debugMode) {console.log(`found onPlayerJoin-Event, func: ${func}`)};
}



// FINISH
function finish() {
    fs.writeFileSync("C:/JavaSkript/out/output.sk", data); // Writes data to the file
    console.log("-----------------------------");
    console.log("Finished update of \"output.sk\". the value of data is:\n\n" + data); // Shows you the file data.
};


module.exports = {broadcast,onLoad,onPlayerJoin,branch,command,actionBar,debugModeOn,debugModeOff,registerRecipe,ban,unban,finish};