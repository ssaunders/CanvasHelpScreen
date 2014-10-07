var chs=null;
function startHS() {
    if(chs === null) {
        chs = new HelpScreen([],{
            titleFont: "24pt Helvetica",
            textFont : "14pt Helvetica"
        });
    }
    chs.clear();
    chs.replaceConfig([{
        title: "Now announcing...",
        relativePos: "50%,25%",
        alignment: "center"
    }]);
    chs.showCanvas();
    chs.onClick(one);
}

function one () {
    chs.drawObject({
        title: "The most amazing thing since the last amazing thing...",
        alignment: "center",
        relativePos: "50%, 30%"
    });
    chs.onClick(two);
}

function two () {
    chs.drawObject({
        text: "(drumroll)",
        alignment: "center",
        relativePos: "50%, 35%"
    });
    chs.onClick(three);
}

function three () {
    chs.clear();
    chs.drawObject({
        title: "The CHS goes responsive!",
        alignment: "center",
        relativePos: "50%, 30%",
        titleFont: "46pt Palatino Linotype"
    });
    chs.onClick(startReview);
    // chs.onClick(startReview);
}

/*
    point from any angle
*/
function startReview () {
    chs.replaceConfig([{
        text: "But first",
        relativePos: "50%, 27%",
        alignment: "center",
        textFont: "18pt Helvetica"
    },{
        title: "A quick review of the",
        relativePos: "50%,30%",
        alignment: "center",
        titleFont: "40pt Helvetica"
    },{
        title: "basic functionality",
        relativePos: "50%,36%",
        alignment: "center",
        titleFont: "40pt Helvetica"
    }]);
    chs.clear();
    chs.render();
    chs.onClick(rOne);
}

function rOne () {
    chs.replaceConfig([{
        text: "Attach",
        dotPosition: "175,150",
        relativePos: "0,-50"
    },{
        text: "to the",
        dotPosition: "175,150",
        relativePos: "55,-50"
    },{
        text: "specified",
        dotPosition: "175,150",
        relativePos: "55,0"
    },{
        text: "point",
        dotPosition: "175,150",
        relativePos: "55,50"
    },{
        text: "from",
        dotPosition: "175,150",
        relativePos: "0,50"
    },{
        text: "any",
        dotPosition: "175,150",
        relativePos: "-65,50"
    },{
        text: "angle",
        dotPosition: "175,150",
        relativePos: "-75,0"
    },{
        text: ":-)",
        dotPosition: "175,150",
        relativePos: "-50,-50"
    }]);
    chs.clear();
    chs.render();
    chs.onClick(rTwo);
}

function rTwo () {
    chs.appendToConfig([{
        text: "Change (l)",
        relativePos: "30%,10%"
    },{
        text: "text (m)",
        relativePos: "30%,13%",
        alignment: "center",
    },{
        text: "alignment (r)",
        relativePos: "30%,16%",
        alignment: "right",
    }]);
    chs.render();
    chs.onClick(rThree);
}

function rThree () {
    chs.appendToConfig([{
        title: "Color Time!",
        titleColor: "rgb(123,43,54)",
        text : "You can change the color of text or title per config",
        textColor : "rgb(234,65,43)",
        relativePos: "40%,10%"
    },{
        title: "Text Change",
        titleFont: "32pt Palatino Linotype",
        text : "You can change the color of text or title per config",
        textFont : "16pt Comic Sans",
        relativePos: "40%,18%"
    }]);
    chs.render();
    chs.onClick(rFour);
}

function rFour () {
    chs.appendToConfig([{
        title: "Multiline",
        text : "Text (NOT title) can be\n"+
               "multiline. That means \n"+
               "you can make really long\n"+
               "comments look better.",
        relativePos: "70%,10%"
    },{
        title: "Close Button",
        text : "This attack does nothing.",
        dotPosition: "1540,90",
        textPosition: "1440, 153"
    }]).positionCloseButton(1540,90)
       .render();
    chs.onClick(rFive);
}

function rFive () {
    chs.appendToConfig([{
        title: "Colored",
        textPosition: "100, 300",
        dotPosition: "275, 310",
        dotColor: "blue"
    },{
        title: "Dots!",
        textPosition: "100, 340",
        dotPosition: "275, 350",
        dotColor: "green"
    },{
        title: "Box Shadow",
        text : "Box shadows are optional, and \n"+
               "can be configured per config",
        textPosition: "405, 300",
        showBoxShadow: true
    }]).render();
    chs.onClick(rSix);
}

function rSix () {
    var el = $('.absEl');
    chs.appendToConfig([{
        title: "Setting a Target",
        textPosition: "440,430",
        showBoxShadow: true
    },{
        text : "You can do so by giving an element\n"+
               "  el = $('.absEl')\n"+
               "  element: el",
        element: el,
        textPosition: "440,475"
    },{
        text : "Or by giving a selector string \n"+
              "  element: '.theBox'",
        element: ".theBox",
        textPosition: "440,545"
    }]).render();
    chs.onClick(rSeven);
}

function rSeven () {
    chs.appendToConfig([{
        title: "Other cool things",
        text : "* You can change the defaults of the CHS (or restore them), \n"+
               "     even after creation.\n"+
               "* You can show and hide the close button.\n"+
               "* You can attach different functions to the click handler of the \n"+
               "     canvas element to chain configurations (like this presentation).\n"+
               "* You can append to the list of objects to be rendered, \n"+
               "     allowing a set of configs to be built dynamically.\n"+
               "* You can clear, show, and hide the canvas.\n"+
               "* You can check the state of the screen by using \n"+
               "     isRendered() and isVisible()",
        textPosition: "1022,325"
    }]).render();
    chs.onClick(newZero);
}

function newZero () {
    chs.replaceConfig([{
        title: "The New Stuff",
        relativePos: "50%, 30%",
        alignment: "center",
        titleFont: "40pt Helvetica"
    }])
    .showCloseBtn(false)
    .render()
    .onClick(newOne);
}

function newOne () {
    chs.replaceConfig([{
        title: "Before",
        text : "When the screen resized, text would stay in one place, \n"+
               "while the dot moved. You had to figure out exactly where \n"+
               "on the screen you wanted the text.",
        element: ".theBox",
        textPosition: "250,100"
    },{
        title: "After",
        text : "Now, text positioning can be relative to the element \n"+
               "chosen, so positioning the text is a lot easier. Text \n"+
               "now stays with the dot or element, meaning resizing \n"+
               "on windows looks better.",
        element: ".theBox",
        relativePos: "50,100"
    }]);
    chs.render();
    chs.onClick(newTwo);
}

function newTwo () {
    chs.replaceConfig([{
        title: "Positives and Negatives",
        text : "Relative position values can be positive or negative.",
        relativePos: "38%, 30%"
    },{
        text: "-50,-50",
        relativePos: "-50,-50",
        element: ".theBox"
    },{
        text: "50,50",
        relativePos: "50,50",
        element: ".theBox"
    }]);
    chs.render();
    chs.onClick(newThree);
}
function newThree () {
    chs.replaceConfig([{
        title: "Percent",
        text : "Relative position values can also be expressed as percentages.\n"+
               "Creating a title screen is now painfully easy.\n"+
               "(50%,40% with alignment: center).",
        relativePos: "50%,40%",
        alignment: "center"
    },{
        text: "0%",
        relativePos:"0%, 55%"
    },{
        text: "25%",
        relativePos:"25%, 55%"
    },{
        text: "50%",
        relativePos:"50%, 55%"
    },{
        text: "75%",
        relativePos:"75%, 55%"
    },{
        text: "100%",
        alignment: "right",
        relativePos: "100%,55%"
    }]);
    chs.render();
    chs.onClick(end);
}

function end () {
    chs.hideCanvas();
}
