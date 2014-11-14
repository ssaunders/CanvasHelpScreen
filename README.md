CanvasHelpScreen
================

Create a (relatively) responsive canvas overlay for your web page. (uses jQuery)

####Documentation
```
/* * * ALL ITEM CONFIG OPTIONS * * */
 {                                                   // "|" means "or"
   title       : "Hello",
   titleFont   : "25pt Helvetica",        // Must be in form "Xpt Font"
   titleColor  : '#A2C440',               // Anything *Color can take rgb(), rgba(), #hex, or text
   textPosition: "15,10"                  // The position of the TOP LEFT corner of the TITLE. Text spacing is figured out from there.
   text        : "I am here",                // Anything *Position can take a comma-separated string, array, or object in the form {x:N,y:N}.
   textColor   : 'rgb(150,10,77)',
   textFont    : '15pt Helvetica',
   alignment   : 'center'|'right'|'left'  // Will align text with respect to textPosition (e.g. it draws it from that point)
   relativePos : "1,1"|"-1,-1"|"1%,1%"    // Positions the text relative to dotPosition or the element''s position. Using a percent positions
                                             // the text relative to the SCREEN, not the dot. (Overrides textPosition.)
   dotPosition : "10,10" | [x,y] | {x:10,y:10},
   dotColor    : 'blue'
   element     : a | 'selector',           // element overrides dotPosition. It can be a jQuery element or selector, or an Ext element.
                                          // If specified, dot will center on the element, even if the window is resized. (Overrides dotPosition.)
   shadowColor    : 'green'
   showShadow     : false,                // Shows or hides the text shadow. (shadowColor overrides)
   boxShadowColor : 'gray',               // A box shadow is a rectangle behind the text.
   showBoxShadow  : true                  // Shows or hides the box shadow. (boxShadowColor overrides)
    
   /* Future configs:
     lineWidth         // The number of characters to put on a line (for multiline)
   */
 }
/* * * ALL CLASS CONFIG OPTIONS * * */
 {
    titleFont      : ...,           //Look above to see examples of these configs
    titleColor     : ...,
    textFont       : ...,
    textColor      : ...,
    shadowColor    : ...,
    boxShadowColor : ...,
    showCloseButton: false          //Draws the close button. Defaults to false
    closeBtnPos    : {x:#, y:#}     //Overrides showCloseButton
 }

```
#####Example Config
```
var halfWidth = $.viewportW()/2,
    halfHeight = $.viewportH()/2,
    fontWeight = 30;
var messages = [{
    title: "Welcome to the Canvas",
    textPosition: halfWidth+","+(halfHeight-fontWeight*4.2),
    alignment: 'center'
},{
    title: "Help Screen Tutorial",
    text: "(click to continue)",
    textPosition: halfWidth+","+(halfHeight-fontWeight*3),
    alignment: 'center',
    boxPad: 0
}];
 
helpOvly = new HelpScreen(messages, {
    titleFont: fontWeight +'pt Arial',
    titleColor: 'rgb(120,40,17)',
    textFont: "15pt Helvetica",
    textColor: 'white',
    boxShadowColor: 'rgba(0,170,170,.70)',
    showCloseButton: false
});
 
helpOvly.render();
helpOvly.showCanvas();
```
####Methods
```
/**** PUBLIC ****/
//anything returning "chs" is chainable.
bool : isRendered () - Returns whether the CHS has been rendered.
bool : isVisible () - Returns whether the CHS is visible.
chs  : render () - Renders the CHS, but does not display it. You only need to call this once, after creating the CHS, unless you are doing something fancy, like linking screens.
chs  : drawObject ( obj:TXT_CFG ) - Draws a single object to the canvas. Object must resemble an item config (shown above). Object is not saved in the canvas' object list.
[obj]: getObjectList () - returns the internal objectList, which stores the configs to be drawn. Modify with extreme caution.
chs  : setTitleFont ( font:STR )- 'font' must be in form "Xpt Font". Marks canvas for re-rendering.
chs  : setTextFont ( font:STR ) - 'font' must be in form "Xpt Font". Marks canvas for re-rendering.
chs  : setTitleStyle ( font:STR, color:STR ) - 'font' must be in form "Xpt Font". color can take rgb(), rgba(), #hex, or text. Marks canvas for re-rendering.
chs  : setTextStyle ( font:STR, color:STR ) - 'font' must be in form "Xpt Font". color can take rgb(), rgba(), #hex, or text. Marks canvas for re-rendering.
chs  : setShadowColor ( color:STR ) - color can take rgb(), rgba(), #hex, or text. Marks canvas for re-rendering.
ctxt : getContext () - Returns the CHS's 2D context. Useful if you need to do some custom work.
chs  : hideCanvas () - Hides CHS.
chs  : showCanvas () - Shows CHS. Will re-render it if necessary.
void : destroy () - Removes the ELEMENT connected to the canvas. DOES NOT destroy the variable instance.
chs  : clear () - Clears the canvas
chs  : appendToConfig ( input: [OBJ], rerender: BOOL ) - Appends input (an array or object) to the internal objectList. If rerender is true, the CHS is marked for rerendering.
chs  : replaceConfig ( newCfg:[TXT_CFG] ) - Replaces the item config. Marks canvas for re-rendering.
chs  : restoreDefaults () - Restores the CHS's default fonts and colors.
chs  : reconfigure () - Replace the CHS's defaults.
chs  : positionCloseButton ( x:INT, y:INT ) - Assigns the X and Y position of the close button for the CHS.
chs  : onClick ( fn:FUN ) - Assigns the click handler for the CHS element. Default is to hide the canvas.
 
/**** PRIVATE (cannot be accessed) ****/
void : drawDot ( txtConfig ) - Draws the dot in the appropriate color, at a certain point.
{xy} : getDotPosition ( txtConfig ) - Gets the position the dot should be in, and stores it. Gives preference to 'element'.
 {}  : getDimensions ( txtConfig ) - Returns the x,y position of the item's TOP LEFT corner, and its height and width.
num  : getBoxPadding ( txtConfig ) - Returns the bounding box padding for the item.
{xy} : getPositionOnBox ( txtConfig, vPos, hPos, withPad ) - Returns an object with the x,y location of a point on the item's bounding box. vPos and hPos is a percentage, given
               in decimal, of where the point should be. One of them should be a 0 or a 1. If not, then the largest is rounded to 1. WithPad is a boolean indicating whether to
consider the bounding box with padding or not.
void : drawBoxShadow ( txtConfig ) - Draws the box shadow.
void : drawText ( txtConfig ) - Draws the title and text.
{xy} : getRelativeTextPosition ( txtConfig ) - Gets the relative position of the title text, and stores it. A window resize will cause this to recalculate.
{xy} : getTextPosition ( txtConfig ) - Gets the position the title text should be in, and stores it.
[str]: getSplitText ( txtConfig ) - Breaks the text into parts based on splitChar.
void : drawLine ( txtConfig ) - Draws the line between the dotpoint and the line start point.
{xy} : getLineStartPoint( txtConfig ) - Determines where to draw the line from (currently just corners)
void : drawCloseBtn () - Draws the close button. In future versions, users may be able to override.
num  : randIdNum () - Used to assign a unique id to the canvas.
```
