#!/usr/bin/env node

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout, null)

rl.on('line', function(line) {
    if (line == "exit") {
        rl.close();
        process.stdin.destroy();
        process.exit();
    }
});
    
rl.setPrompt('> ');
var argv = require('optimist').argv;

var lesson_no = argv.lesson || 1;

var lesson = require('./lessons/lesson-' + lesson_no++);


(function() {
    var step = -1;

    function next() {
        step++;
        lesson[step].start(rl);
        run();
    }

    function run() {
        var input = rl.prompt();
        try {
            var result = eval(input);
            if (lesson[step].data(result, rl)) {
                process.nextTick(next);
            }
            else {
                process.nextTick(run);
            }
        }
        catch (e) {
            console.log(e);
            process.nextTick(run);
        }
    }
    
    next();
})();
