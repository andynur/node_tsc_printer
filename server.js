'use strict';

var edge = require('edge-js');
var express = require('express');
var bodyParser = require('body-parser')
const util = require('util');

var app = express();


var about;;
var openport;
var sendcommand;
var clearbuffer;
var printerfont;
var barcode;
var printlabel;
var closeport;
var sendcommand_utf8;
var sendcommand_binary;
var windowsfont;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./'));



app.listen(8888, function () {
    console.log("Server Start!!");
})


app.get('/test_get', function (req, res) {
    console.log('GET Function Test!!');

});


app.post('/', urlencodedParser,function (req, res) {
    printfile();
    res.redirect(req.get('referer'));
});


try {
    openport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'openport'
    });
}
catch (error) {
    console.log(error);
}


try {
    about = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'about'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand'
    });
}
catch (error) {
    console.log(error);
}


try {
    clearbuffer = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'clearbuffer'
    });
}
catch (error) {
    console.log(error);
}


try {
    printerfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printerfont'
    });
}
catch (error) {
    console.log(error);
}


try {
    barcode = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'barcode'
    });
}
catch (error) {
    console.log(error);
}



try {
    printlabel = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'printlabel'
    });
}
catch (error) {
    console.log(error);
}


try {
    closeport = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'closeport'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand_utf8 = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_utf8'
    });
}
catch (error) {
    console.log(error);
}

try {
    sendcommand_binary = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'sendcommand_binary'
    });
}
catch (error) {
    console.log(error);
}

try {
    windowsfont = edge.func({
        assemblyFile: 'tsclibnet.dll',
        typeName: 'TSCSDK.node_driver',
        methodName: 'windowsfont'
    });
}
catch (error) {
    console.log(error);
}


function printfile()
{
    var font_variable = { x: '50', y: '50', fonttype: '3', rotation: '0', xmul: '1', ymul: '1', text: 'Font Test' }
    var windowsfont_variable = { x: 50, y: 250, fontheight: 64, rotation: 0, fontstyle: 0, fontunderline: 0, szFaceName: 'Arial', content: 'Windowsfont Test' }
    var barcode_variable = { x: '50', y: '100', type: '128', height: '70', readable: '0', rotation: '0', narrow: '3', wide: '1', code: '123456' }
    var label_variable = { quantity: '1', copy: '1' };

    openport('TSC TA210', true);

    clearbuffer('', true);
    printerfont(font_variable, true);
    barcode(barcode_variable, true);
    windowsfont(windowsfont_variable, true);
    sendcommand('CODEPAGE UTF-8', true);
    sendcommand('TEXT 250,50,\"0\",0,10,10,\"Text Test!!\"', true);
    sendcommand_utf8('TEXT 50,200,\"KAIU.TTF\",0,10,10,\"測試中文Text Test!!\"', true);
    printlabel(label_variable, true);

    //var selftest_command = 'SELFTEST\r\n';
    //var arr = [];
    //for (var i = 0; i < selftest_command.length; ++i) 
    //    arr.push(selftest_command.charCodeAt(i));
    //var selftest_command_buffer = new Uint8Array(arr);
    //sendcommand_binary(selftest_command_buffer, true);

    closeport('', true);
}
