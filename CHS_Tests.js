/*
TESTING THE CANVAS HELP SCREEN
Whenever changes are made, review this document to make sure the current functionality 
of the help screen hasn't been affected.

Each of these tests can be run independently. If the test title has a (V) in it, it 
must be visually verified. If the test title has a (P) in it, it is a programmatic 
test, and can be run all at once. Output from these tests are sent to the console.

These tests do not achieve 100% code coverage. You may yet find new ways to screw 
things up.
*/
//These are here so lint doesn't complain. Just ignore them
var chs, q, l, el, tester;

    /// BLANK TEST ///
    /* blank */
    /* TESTS:  */
    // [CODE]
    chs = new HelpScreen([{

    }]);
    chs.render();
    // [CODE]
    /* blank */



/****
 * TESTS
 ****            */

/* render() (V) */
/* TESTS: Object constructor, creation of config, render() */
// [CODE]
chs = new HelpScreen(); //No config
chs.showCanvas();
// 1 
chs = new HelpScreen({}); //Bad config
chs.showCanvas();
// 2 
chs = new HelpScreen([{}]); //Empty config
chs.render();
// 3
chs.showCanvas();
// 4 
// [CODE]
/* This tests only the basic functionality of render(). The other tests
   finish it out.
   [1] You should get a warning about the object list not being defined.
   [2] It works, but should warn about Item config being an array.
   [3] You should see nothing.
   [4] You should see a gray overlay. Click to remove it. */


/* Deletion (P) */
/* TESTS: destroy(), showCanvas(), hideCanvas()*/
// [CODE]
chs = new HelpScreen([{}]);
chs.showCanvas();
// 1
chs.hideCanvas();
l = document.getElementsByTagName('canvas').length;
chs.destroy();
q = document.getElementsByTagName('canvas');
tester.assert(l > 0 && q.length, 0, "Deletion of CHS");
// [CODE]
/* You should see a gray screen at [1]
   Check the console for the rest */


/* getTextPosition */
/* TESTS:  getTextPosition() */
// [CODE]
chs = new HelpScreen([{
    text: "This should be in the top left corner",
    textColor: "blue"
},{
   text: "This should be at 300,300",
   textPosition: "300,300"
},{
   text: "This should be at 300,400",
   textPosition: [300,400]
},{
   text: "This should be at 300,500",
   textPosition: {x:300,y:500}
},{
   text: "This should fail, but still show at 0,0",
   textPosition: 4
},{
   text: "This should be at 600,0",
   textPosition: {x:600}
}]);
chs.showCanvas();
// [CODE]
/*  */


/* drawText() */
/* TESTS: drawText(), splitText(), drawObject(), replaceConfig()*/
// [CODE]
chs = new HelpScreen([{
    title: "Multiline",
    text: "This\n"+"is text.\n"+"It spans across\n"+"many lines",
    textPosition: '200,300'
},{
    title: "Colors & Fonts",
    titleFont: "16pt Helvetica",
    titleColor: "blue",
    text: "This config should be different",
    textFont: "14pt Helvetica",
    textColor: "green",
    textPosition: "200,500"
},{
    text: "just text",
    textPosition: "400, 300",
    boxShadowColor: "rgba(34,154,234,.2)"
},{
    title: "Merely a Title",
    textPosition: "400, 400",
    showBoxShadow: true
}]);
chs.showCanvas();
// 1
chs.setTitleStyle("16pt Helvetica", "blue");
chs.setTextStyle("14pt Helvetica", "green");
chs.replaceConfig([{
    title: "Checkin' the change",
    titleFont: "16pt Times New Roman",
    titleColor: "yellow",
    text: "This should be different",
    textFont: "16pt Times New Roman",
    textColor: "red",
    textPosition: "300,500"
},{
    title: "Checkin' the change",
    text: "This should reflect the \n"+"changed text and colors.",
    textPosition: "500,300"
}]);
chs.render();
// 2
// [CODE]
/* Check: word wrap, colors and fonts */


/* clear() (V) */
// [CODE]
chs = new HelpScreen([{
    title: "A config",
    text: "I am here"
}]);
chs.showCanvas();
// 1
chs.clear();
// 2
// [CODE]
/* The screen should show nothing at [2] but the gray overlay. */


/* isRendered() (P)*/
// [CODE]
chs = new HelpScreen([{
    title: "A config",
    text: "I am here",
    textPosition: "300,300"
}]);
tester.groupBegin("isRendered tests");
tester.assert(chs.isRendered(), false, "pre-render");
chs.showCanvas();
tester.assert(chs.isRendered(), true, "post-render");
chs.hideCanvas();
tester.assert(chs.isRendered(), true, "rendered, but hidden");
chs.replaceConfig([{
    title: "A config",
    text: "I am here"
}]);
tester.assert(chs.isRendered(), false, "after changing config");
chs.showCanvas();
tester.assert(chs.isRendered(), true, "after rendering again");
chs.setTitleFont('11pt Times New Roman');
tester.assert(chs.isRendered(), false, "after changing a general config property");
tester.groupEnd();
// [CODE]
/* See if anything failed */


/* Dimensions (P) */
/* TESTS:  getDimensions() */
// [CODE]
chs = new HelpScreen([{
    title: "Left alignment",
    text: "I am here",
    alignment: "left",
    textPosition: "375,600"
}, {
    title: "Right alignment",
    text: "I am here",
    alignment: "Right",
    textPosition: "375, 400"
},{
    title: "Centered text",
    text: "I am here",
    alignment: "center",
    textPosition: "375, 200"
}], { showBoxShadow: true });
chs.showCanvas();
var objL = chs.objectList;

tester.assert({
    height : 37.3,
    width  : 130,
    x      : 375,
    y      : 600
}, objL[0].dimensions," Left Alignment");

tester.assert({
    height : 37.3,
    width  : 142,
    x      : 375,
    y      : 400
}, objL[1].dimensions," Right Alignment");

tester.assert({
    height : 37.3,
    width  : 126,
    x      : 312,
    y      : 200
}, objL[2].dimensions," Centered text");
// [CODE]
/* Alignment affects the x,y position of the top left corner (the one used for reference) */


/* Dot position (V/P) */
/* TESTS: getDotPosition() (V)*/
// [CODE]
el = $('.fixedEl');
chs = new HelpScreen([{
    title: "DotPosition as string",
    text: "I am here",
    dotPosition: "225,300",
    textPosition: "300, 600"
}, {
    title: "DotPosition as selector",
    text: "I am here",
    element: ".theBox",
    textPosition: "525, 400"
},{
    title: "DotPosition as element",
    text: "I am here",
    element: el,
    dotPosition: "600,600",
    textPosition: "275, 100"
}]);
chs.showCanvas();
// [CODE]
/* The first one should be hanging in space. 
   The second should point to the middle of the center box. 
   The third should point to the middle of the fixed element */

/* TESTS: getDotPosition() (P) */
// [CODE]
var fixedEl = $('.fixedEl');
var fixedPsn = fixedEl.position();
fixedPsn.x = fixedPsn.left + (fixedEl.width() /2);
fixedPsn.y = fixedPsn.top  + (fixedEl.height()/2);
var boxEl = $('.theBox');
var boxPsn = boxEl.position();

chs = tester.createExposedInstance(HelpScreen);
chs.testDotPostioning = function () {
    var tests = [{
        description: "Improper dotPosition",
        arguments: [{
            text: "I am here",
            dotPosition: "3"
        }],
        expectedVal: {x:3,y:0}
    },{
        description: "DotPosition as array",
        arguments: [{
            text: "I am here",
            dotPosition: [13,10]
        }],
        expectedVal: {x:13,y:10}
    },{
        description: "DotPosition as string",
        arguments: [{
            text: "I am here",
            dotPosition: "225,300"
        }],
        expectedVal: {x:225,y:300}
    },{
        description: "DotPosition as selector",
        arguments: [{
            text: "I am here",
            element: ".theBox"
        }],
        expectedVal: {x:boxPsn.left,y:boxPsn.top}
    },{
        description: "DotPosition as element",
        arguments: [{
            text: "I am here",
            element: fixedEl
        }],
        expectedVal: {x:fixedPsn.x,y:fixedPsn.y}
    }];
    
    tester.runTests(tests, this, this._privMems.getDotPosition, "Tests for getDotPosition");
};
chs.testDotPostioning();
// [CODE]
/* Check the console for failed tests */

/* Postion on box (V/P) */
/* TESTS:  getPositionOnBox(), getLineStartPoint()*/
// [CODE]
chs = tester.createExposedInstance(HelpScreen,[[{
    title: "A simple config",       //top left
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "100,100"
},{
    title: "A simple config",       //top mid left
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "250,100"
},{
    title: "A simple config",       //top mid right
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "275,100"
},{
    title: "A simple config",       //top right
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "400,100"
},{
    title: "A simple config",       //mid left top
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "100, 205"
},{
    title: "A simple config",       //mid left bottom
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "100, 225"
},{
    title: "A simple config",       //mid right top
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "400,205"
},{
    title: "A simple config",       //mid right bottom
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "400,225"
},{
    title: "A simple config",       //bottom left
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "100, 300"
},{
    title: "A simple config",       //bottom mid left 
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "250, 300"
},{
    title: "A simple config",       //bottom mid right 
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "275, 300"
},{
    title: "A simple config",       //bottom right
    text: "It's just this, really.",
    textPosition: "200, 200",
    dotPosition: "400, 300"
},{
    title: "Shadows",
    text : "Does it work with a shadow?",
    textPosition: "600,400",
    dotPosition : "650,500",
    showBoxShadow: true
}]]);
chs.testPostionOnBox = function () {
    var tests = [{
        message: "WITHOUT PADDING"
    },{ /* * WithOUT Padding * */
        description: "NPd: (1,0) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 1, 0, false],
        expectedVal: {x:100,y:0}
    },{
        description: "NPd: (0,1) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0, 1, false],
        expectedVal: {x:0,y:100}
    },{
        description: "NPd: (0,0) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0, 0, false],
        expectedVal: {x:0,y:0}
    },{
        description: "NPd: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 1, 1, false],
        expectedVal: {x:100,y:100}
    },{
        description: "NPd: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0.4, 0.5, false],
        expectedVal: {x:0,y:50}
    },{
        description: "NPd: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            dimensions: {
                x: 100,
                y: 100,
                width: 100,
                height:100,
            }
        }, 1, 1, false],
        expectedVal: {x:200,y:200}
    },{ /* * With Padding * */
        message: "WITH PADDING"
    },{
        description: "Pad: (1,0) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 1, 0, true],
        expectedVal: {x:100,y:0}
    },{
        description: "Pad: (0,1) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0, 1, true],
        expectedVal: {x:0,y:100}
    },{
        description: "Pad: (0,0) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0, 0, true],
        expectedVal: {x:0,y:0}
    },{
        description: "Pad: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            textPosition: "0,0",
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 1, 1, true],
        expectedVal: {x:100,y:100}
    },{
        description: "Pad: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            dimensions: {
                x: 0,
                y: 0,
                width: 100,
                height:100,
            }
        }, 0.4, 0.5, true],
        expectedVal: {x:0,y:50}
    },{
        description: "Pad: (1,1) test with size 100,100 at 0,0",
        arguments: [{
            dimensions: {
                x: 100,
                y: 100,
                width: 100,
                height:100,
            }
        }, 1, 1, true],
        expectedVal: {x:200,y:200}
    }];
    
    tester.runTests(tests, this, this._privMems.getPositionOnBox, "Tests for getPositionOnBox");
};
chs.testPostionOnBox();
chs.showCanvas();
// [CODE]
/* Make sure the lines connect to the box in a way that makes sense. 
   Check the shadow box. The line should not be visible through the shadow.
   Look in the console for the listing of failed/succeeded tests. */

/*
Tests:
x no element, dotPos
x dotPos
x element
x w/txtPos
x percent
  percent w/diff alignments
*/
el = $('.fixedEl');
chs = new HelpScreen([{
    text : "This should be relative to the top left corner (50,100).",
    relativePos: "50,100"
},{
    text:"A really long statement to see if alignment works.\n"+
         "This should be centered",
    relativePos: "50%,50%",
    alignment: 'center'
},{
    text:"Another alignment check.",
    relativePos: "50%,75%",
    alignment: 'right'
},{
    title: "Using dotPos",
    text : "This config is relative to dotPos.",
    dotPosition: [400,200],
    relativePos: "125,150"
},{
    title: "Using element",
    text : "This config is relative to an element.\n"+
           "Move the window around to make sure",
    element: ".fixedEl",
    relativePos: [100,100]
},{
    text: "relativePos overrides textPosition",
    textPosition: "300,300",
    relativePos: "50,50",
    dotPosition: {x:200, y:400}
},{
    text: "This text is above-right",
    dotPosition: "775,175",
    relativePos: "50,50"
},{
    text: "This text is below-right",
    dotPosition: "775,175",
    relativePos: "50,-50"
},{
    text: "This text is above-left",
    dotPosition: "775,175",
    relativePos: "-185,50"
},{
    text: "This text is below-left",
    dotPosition: "775,175",
    relativePos: "-185,-50"
},{
    title: "Shadow Check",
    text : "Does it work with a shadow?",
    textPosition: "200,600",
    dotPosition : "400,550",
    showBoxShadow: true
}]);
chs.showCanvas();



/* Prototype defaults (V) */
/* TESTS: the global settings for the instance, close button, drawBoxShadow() */
// [CODE]
chs = new HelpScreen([{
    title: "A config",
    text: "I am here",
    textPosition: "300,300"
}],{
    titleFont      : '15pt Calibri',
    titleColor     : '#ba45a3',
    textFont       : '10pt Times New Roman',
    textColor      : 'rgb(23,235,123)',
    // shadowColor    : '',
    boxShadowColor : 'rgba(10,10,159,.2)',
    showCloseButton: true
});
chs.showCanvas();
// [CODE]
/* Is the close button showing?
   Has the title & text color changed?
   Has the title & test font changed?
   Is there a box shadow visible?     */

/* Changing instance-level settings (V)*/
/* TESTS: reconfigure(), restoreDefaults() */
// [CODE]
chs = new HelpScreen([{
    title: "A config",
    text: "I am here",
    textPosition: "300,300",
    dotPosition: "400,400"
},{
    title: "A second config",
    text: "A really long description of things to \n"
         +"test how multiline text reacts to the \n"
         +"reconfiguration of the HelpScreen",
    textPosition: "600,300",
    element: $('.fixedEl')
}],{
    titleFont      : '15pt Calibri',
    titleColor     : '#ba45a3',
    textFont       : '10pt Times New Roman',
    textColor      : 'rgb(23,235,123)',
    // shadowColor    : '',
    boxShadowColor : 'rgba(10,10,159,.2)',
    showCloseButton: true
});
chs.showCanvas();
// 1
chs.reconfigure({
    titleFont      : '15pt Times New Roman',
    titleColor     : '#987f34',
    textFont       : '10pt Calibri',
    textColor      : 'rgb(213,35,23)',
    // shadowColor    : '',
    boxShadowColor : 'rgba(10,159,10,.2)',
    showCloseButton: false
});
chs.render();
// 2
chs.restoreDefaults();
chs.render();
// 3
// [CODE]
/* The text should change at [1], [2], and [3].
   Make sure the box shadow changes size with it. */


/* Close button stuffs (V) */
/* TESTS: the global settings for the instance, close button,  rerender() */
// [CODE]
chs = new HelpScreen([{
    title: "A config",
    text: "I am here"
}],{
    showCloseButton: true
});
chs.showCanvas();
// 1
chs.positionCloseButton(200,2200).rerender();
// 2
// [CODE]
/* Close button should be visible at [1]. It should have moved to 200,200 at [2] */

/*
Below is a list of the functions that are covered
in the tests.

**** PUBLIC ****
bool : isRendered           x
void : render               x
void : drawObject           x
void : setTitleFont         -
void : setTextFont          -
void : setTitleStyle        x
void : setTextStyle         x
void : setShadowColor       -
ctxt : getContext           x
void : hideCanvas           
void : showCanvas           
void : destroy              x
void : clear                x
void : replaceConfig        x
void : restoreDefaults      x
void : reconfigure          x
void : positionCloseButton  x
 
**** PRIVATE ****
void : drawDot              -
{xy} : getDotPosition       x
 {}  : getDimensions        x
num  : getBoxPadding        x
{xy} : getPositionOnBox     x
void : drawBoxShadow        x
void : drawText             x
{xy} : getTextPosition      x
[str]: getSplitText         x
void : drawLine             -
{xy} : getLineStartPoint    x
void : drawCloseBtn         -
num  : randIdNum            -
*/
