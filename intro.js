#!/usr/bin/env node

var read = require('read');
var argv = require('optimist').argv;

var lesson_no = argv.lesson || 1;

var lesson = require('./lessons/lesson-' + lesson_no++);

var readopt = {
    prompt: '> '
};

(function() {
    var step = -1;

    function next() {
        step++;
        if(lesson[step]) {
            lesson[step].start();
            prompt();
        }
        else {
            try {
                lesson = require('./lessons/lesson-' + lesson_no++);
            
                console.log('Lesson over! Press any key to start the next lesson.');
                step = -1;
                read({raw:true}, next);
            }
            catch (e) {
                console.log('That was the last lesson! Congratulations etc.');
                console.log('Press any key to quit');
                read({raw: true}, process.exit);
            }
        }
    }

    function prompt() {
        read(readopt, checkInput);
    }

    function checkInput(error, input) {
        console.log(input);
        try {
            var result = eval(input);
            if (lesson[step].data(result)) {
                process.nextTick(next);
            }
            else {
                process.nextTick(prompt);
            }
        }
        catch (e) {
            console.log(e);
            process.nextTick(prompt);
        }
    }

    next();
})();
