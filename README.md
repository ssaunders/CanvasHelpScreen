CanvasHelpScreen
================

Create a (relatively) responsive canvas overlay for your web page. (uses jQuery)

###Documentation
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
