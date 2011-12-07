var wrap = require('wordwrap')(15, 60);

var errors = {
    ReferenceError: function(problem) {
        var ref = problem.split(' ')[0];
        console.log("ReferenceError");
        console.log(wrap([
                "This means that the value " + ref + " needs to be a variable, but",
                "no variable of that name has been defined."
            ].join(' '))
        );
    },
};

module.exports = {
    explain: function(error) {
        if (errors[error.name])
            errors[error.name](error.message);
        else
            console.log("Don't know what to do about " + error)
    }
};
