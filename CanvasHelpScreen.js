/**
  * objectList:array
  * config:object
**/
HelpScreen = function(objectList, config) {
    /***** @Private Vars *****/
    var me = this,      //for use in private functions
        wdw = $(window),
        canvasId = "canvas-"+this.randIdNum(),
        canvas = $('<canvas/>', {
                Width  : wdw.width(),
                Height : wdw.height(),
                id     : canvasId
            }).css({
                position : 'fixed',
                top      : 0,
                left     : 0,
                zIndex   : me.maxZ()+3,
                backgroundColor : 'rgba(100,100,100,.6)'
            }),
        context = canvas[0].getContext('2d'),
        //States
        rendered = false,   //ie has it been drawn before
        visible = false,
        rerender = false,
        deleted = false,
        //Configs
        titleFont = this.defaults.defTitleFont,
        titleColor = this.defaults.defTitleColor,
        textFont = this.defaults.defFont,
        textColor = this.defaults.defColor,
        boxShadowColor = this.defaults.defShadowColor, showBoxShadow = false,
        shadowColor = this.defaults.defShadowColor, showShadow = false,
        showCloseButton = false,
        lineStyle = "straight",
        lineColor = "black",
        //Internal Vars
        splitChar = '\n',   //Char(s) used to split the text into lines
        lineSpacing = 1.5,
        titleSpacing = 1.3,
        closeButton = {
            lineColor: 'white',
            background: '#E93E2E',
            shape: 'square',
            size : 20,
            font : this.defaults.defFont,
            x : 800,
            y : 200
        };
    canvas.addClass("hide-canvas");
    me.screenW = wdw.width();
    me.screenH = wdw.height();

    $(window).resize(function (){
        me.screenW = wdw.width();
        me.screenH = wdw.height();
        canvas[0].setAttribute('width',  me.screenW);
        canvas[0].setAttribute('height', me.screenH);
        rerender = true;
        if(rendered && visible) {
            me.render();
        }
    });

    //setup for the canvas
    context.font = textFont;
//        context.fillStyle = textColor; //if you do this, the dots change color
    context.textBaseline = 'top';

    function clickFn() {
        me.hideCanvas();
    }
    canvas[0].onclick=clickFn;

    //Set up instance defaults (transfers config values to private variables).
    if(config !== undefined) {
        //responsive = config.responsive;
        titleFont  = config.titleFont  || me.defaults.defTitleFont;
        titleColor = config.titleColor || me.defaults.defTitleColor;
        textFont   = config.textFont   || me.defaults.defFont;
        textColor  = config.textColor  || me.defaults.defColor;
        if(config.showCloseButton !== undefined) {
            showCloseButton = config.showCloseButton ;
        }
        if(config.boxShadowColor === undefined) {
            boxShadowColor = me.defaults.defShadowColor;
        } else {
            boxShadowColor = config.boxShadowColor;
            showBoxShadow = true;
        }
        if(config.shadowColor === undefined) {
            shadowColor = me.defaults.defShadowColor;
        } else {
            shadowColor = config.shadowColor;
            showShadow = true;
        }
        if(config.closeBtnPos !== undefined) {
            closeButton.x = config.closeBtnPos.x;
            closeButton.y = config.closeBtnPos.y;
            showCloseButton = true;
        }
        if(config.lineStyle !== undefined) {
            lineStyle = config.lineStyle;
        }
        if(config.lineColor !== undefined) {
            lineColor = config.lineColor;
        }
        
        delete config.titleFont;
        delete config.titleColor;
        delete config.textFont;
        delete config.textColor;
        delete config.shadowColor;
        delete config.boxShadowColor;
        delete config.showCloseButton;
        delete config.closeBtnPos;
    }

    // // @DRAWING FUNCTIONS // //
    function drawDot(txtConfig) {
        var dotPos = getDotPosition(txtConfig),
            restore = false;
        if(txtConfig.dotColor) {
            restore = context.fillStyle;
            context.fillStyle = txtConfig.dotColor;
        } else {
            context.fillStyle = 'black';
        }

        context.beginPath();
        context.arc(dotPos.x, dotPos.y, 5, 0, Math.PI*2, false);
        context.fill();
        if(restore) { context.fillStyle = restore; }
    }

    //Gets the postion the dot should be in, and stores it.
    //Gives preference to the element
    function getDotPosition(txtConfig) {        //TODO warn about element being an array
        var xLoc, yLoc,
            dotPos = txtConfig.dotPosition;
        if(typeof(txtConfig.element) !== 'undefined')
        {   //TODO check element can be found, use dotPos as backup?
            var element, elHeight, elWidth, position;
            if( typeof(txtConfig.element.xtype) === 'string' || typeof(txtConfig.element.getXY) === 'function' )
            {   //an EXT element
                element  = txtConfig.element = (txtConfig.element.getEl ? txtConfig.element.getEl() : txtConfig.element);
                if(element === undefined) {
                    console.error("Could not find Ext element ",txtConfig.element, " title: ", txtConfig.title);
                    dotPos = {x:0,y:0};
                    return dotPos;
                }
                elHeight = element.getHeight();
                elWidth  = element.getWidth();
                xLoc     = element.getX()+(elWidth/2);
                yLoc     = element.getY()+(elHeight/2);
            }
            else
            {    //a jQuery el or selector
                element  = $(txtConfig.element);
                if(element.length !== 0) {
                    txtConfig.element = element;
                    elHeight = element.height();
                    elWidth  = element.width();
                    position = element.offset();
                    xLoc     = position.left+(elWidth/2);
                    yLoc     = position.top +(elHeight/2);
                } else {
                    console.warn('Could not find ',txtConfig.element,' with jQuery.');
                    xLoc = yLoc = 0;
                }
            }
            dotPos = {x:xLoc,y:yLoc};
        }
        else if(typeof(dotPos) === "string")
        { //3,3,3 Fails silently
            var xy = dotPos.split(',');
            xLoc = parseInt(xy[0],10);
            yLoc = parseInt(xy[1],10);
            dotPos = {x:xLoc,y:yLoc};
        }
        else if(dotPos instanceof Array)
        {
            dotPos = {x:dotPos[0],y:dotPos[1]};
        }
        else if(dotPos === undefined || dotPos === null)
        {
            dotPos = {x:0,y:0};
        }
        else if(typeof(dotPos) !== "object")
        {
            console.error("Improper dotPosition given", dotPos);
            dotPos = {x:0,y:0};
        }

        if(typeof(dotPos.x) !== "number" || isNaN(dotPos.x))
        {
            dotPos.x = 0;
        }
        if(typeof(dotPos.y) !== "number" || isNaN(dotPos.y))
        {
            dotPos.y = 0;
        }
        return dotPos;
    }

    function getDimensions(txtConfig) {
        if(txtConfig.dimensions === undefined || rerender) {
            var saveFont = context.font,
                width=0, maxWidth=0,
                height=0,
                txtPos = getTextPosition(txtConfig),
                splitText = getSplitText(txtConfig),
                hOffset=0;

            if(typeof(txtConfig.title) !== 'undefined') {
                context.font = txtConfig.titleFont || titleFont;
                maxWidth = context.measureText(txtConfig.title).width;
                height = parseInt(context.font,10)*titleSpacing;
            }

            if(typeof(txtConfig.text) !== 'undefined') {
                context.font = txtConfig.textFont || textFont;

                for(var i = splitText.length-1; i >= 0; --i) {
                    width = context.measureText(splitText[i]).width;
                    if(width > maxWidth) { maxWidth = width; }
                }

                height += splitText.length * (parseInt(context.font,10) * lineSpacing);
            }

            switch (txtConfig.alignment) {
                case 'center':
                    hOffset = maxWidth/2;
                    break;
                case 'right':
                case 'end':
                    hOffset = maxWidth;
                    break;
                case 'left':
                case 'start':
                    break;
                default:
                    break;
            }
            txtConfig.dimensions = {x: txtPos.x-hOffset, y: txtPos.y, height: height, width: maxWidth};

            context.font = saveFont;
        }
        return txtConfig.dimensions;
    }

    function getBoxPadding(txtConfig) {
        if(txtConfig.boxPad === undefined) {
            txtConfig.boxPad = 5;
        }
        return txtConfig.boxPad;
    }

    function getPositionOnBox(txtConfig, vPos, hPos, withPad) {
        var dimensions = getDimensions(txtConfig),
            xpos, ypos,
            pad = (withPad || showBoxShadow || txtConfig.showBoxShadow ? getBoxPadding(txtConfig) : 0);

        if(vPos < 0) vPos = 0;
        if(vPos > 1) vPos = 1;
        if(hPos < 0) hPos = 0;
        if(hPos > 1) hPos = 1;
        //x and y go from 0 to 1, as a percentage of the box's width/height
        if((vPos !== 0 && vPos !== 1) || (hPos !== 0 && hPos !== 1)) {  //keep it on the edge
            hPos = ( vPos > hPos ? 0 : hPos);
            vPos = ( vPos > hPos ? vPos : 0);
        }

        xpos = dimensions.x - pad + (vPos * (dimensions.width  + pad*2));
        ypos = dimensions.y - pad + (hPos * (dimensions.height + pad*2));

        return {x:xpos,y:ypos};
    }

    function drawBoxShadow(txtConfig) {
        var dims = getDimensions(txtConfig),
            pad = getBoxPadding(txtConfig);
        context.fillStyle = txtConfig.boxShadowColor || boxShadowColor;
        context.fillRect(dims.x-pad, dims.y-pad, dims.width+pad*2, dims.height+pad*2);
    }

    function drawText(txtConfig) {
            //save state
        var saveFont = context.font,
            saveStyle = context.fillStyle,
            saveAlign = context.textAlign;

        var txtPos = getTextPosition(txtConfig),
            splitText = getSplitText(txtConfig),
            ttlFont  = txtConfig.titleFont  || titleFont,
            ttlColor = txtConfig.titleColor || titleColor,
            txtFont  = txtConfig.textFont   || textFont,
            txtColor = txtConfig.textColor  || textColor,
            titleHeight= (txtConfig.title  !== undefined ? parseInt(ttlFont,10)*titleSpacing : 0),
            textHeight = (txtConfig.text   !== undefined ? parseInt(txtFont,10)*lineSpacing  : 0);

        context.textAlign = txtConfig.alignment;        //POF? should we do check? It won't assign undefined to it.
        //Title
        if(txtConfig.title !== undefined) {
            context.font = ttlFont;
            if(showShadow === true || txtConfig.showShadow === true || txtConfig.boxShadowColor !== undefined) {
                context.fillStyle = txtConfig.boxShadowColor || shadowColor;
                context.fillText(txtConfig.title, txtPos.x+1, txtPos.y+1);
                ++titleHeight;
                ++textHeight;
            }
            context.fillStyle = ttlColor;
            context.fillText(txtConfig.title, txtPos.x, txtPos.y);
        }

        //Text
        if(txtConfig.text !== undefined) {

            context.font = txtFont;
            context.fillStyle = txtColor;
            context.fillText(splitText[0], txtPos.x, txtPos.y+titleHeight);

            for(var i = 1; i<splitText.length; ++i) {
                context.fillText(splitText[i], txtPos.x, txtPos.y+(textHeight*i)+titleHeight);
            }
        }

        //Restore state
        context.fillStyle = saveStyle;
        context.textAlign = saveAlign;
        context.font = saveFont;
    }

    function getRelativeTxtPos (txtConfig) {
        var relPos = txtConfig.relativePos,
            type   = typeof(relPos),
            percent= false,
            calctPos=txtConfig.calculatedPos || {x:0,y:0};  //NOT attached to txtConfig

        // Convert relativePos to an object
        if(relPos === undefined || relPos === null)
        {
            relPos = {x:0,y:0};
        }
        
        if(rerender) { relPos.calculated = false }

        if(relPos.calculated !== true)
        {
            if( type === "string")
            {
                if(relPos.endsWith("%")) { percent = true }
                var xy   = relPos.split(','),
                    div  = percent ? 100 : 1,
                    xLoc = parseInt(xy[0],10)/div,
                    yLoc = parseInt(xy[1],10)/div;
                relPos= {x:xLoc,y:yLoc,percent:percent};
            }
            else if( relPos instanceof Array)
            {
                relPos = {x:relPos[0],y:relPos[1]};
            }
            else if( type !== "object")
            {
                console.error("Improper relativePos given", relPos);
                relPos = {x:0,y:0};
            }

            if(typeof(relPos.x) !== "number" || isNaN(relPos.x))
            {
                relPos.x = 0;
            }
            if(typeof(relPos.y) !== "number" || isNaN(relPos.y))
            {
                relPos.y = 0;
            }

            //Calculate the relative position
            if(relPos.percent === true) {
                calctPos.x = me.screenW * relPos.x;
                calctPos.y = me.screenH * relPos.y;
            } else {
                var refPoint = getDotPosition(txtConfig);
                calctPos.x = relPos.x + refPoint.x;
                calctPos.y = relPos.y + refPoint.y;
            }
        }

        relPos.calculated = true;
        txtConfig.relativePos = relPos;
        txtConfig.calculatedPos = calctPos;
        return calctPos;
    }

    //Gets the postion the title text should be in, and stores it.
    function getTextPosition(txtConfig) {
        var txtPos = txtConfig.textPosition,
            relPos = txtConfig.relativePos,
            type = typeof(txtPos);

        if(relPos !== undefined) {
            txtPos = getRelativeTxtPos(txtConfig);
        }
        else if(txtPos === undefined || txtPos === null)
        {
            txtPos = {x:0,y:0};
        }
        else if( type === "string")
        {
            var xy   = txtPos.split(','),
                xLoc = parseInt(xy[0],10),
                yLoc = parseInt(xy[1],10);
            txtPos= {x:xLoc,y:yLoc};
        }
        else if( txtPos instanceof Array)
        {
            txtPos = {x:txtPos[0],y:txtPos[1]};
        }
        else if( type !== "object")
        {
            console.error("Improper textPosition given", txtPos);
            txtPos = {x:0,y:0};
        }

        if(typeof(txtPos.x) !== "number" || isNaN(txtPos.x))
        {
            txtPos.x = 0;
        }
        if(typeof(txtPos.y) !== "number" || isNaN(txtPos.y))
        {
            txtPos.y = 0;
        }

        txtConfig.textPosition = txtPos;
        return txtConfig.textPosition;
    }

    function getSplitText(txtConfig) {
        if(txtConfig.splitText === undefined) {
            txtConfig.splitText = (txtConfig.text !== undefined ? txtConfig.text.split(splitChar) : [""]);
        }
        return txtConfig.splitText;
    }

    function drawLine(txtConfig) {
            //save state
        var saveStyle = context.fillStyle;
        context.strokeStyle = txtConfig.lineColor || lineColor;

        var dotPos = getDotPosition(txtConfig),
            linPos = getLineStartPoint(txtConfig);

        //TODO Add changing line color
        context.beginPath();
        context.moveTo(dotPos.x, dotPos.y);
        if(txtConfig.lineStyle !== "swoop" && lineStyle !== "swoop") {
            context.lineTo(linPos.x, linPos.y);
        } else {
            context.fillStyle = txtConfig.lineColor || lineColor;
            var ctrlPt = {
                x: ( dotPos.x + linPos.x ) / 2,
                y: ( dotPos.y + linPos.y ) / 2
            };

            context.quadraticCurveTo(ctrlPt.x, ctrlPt.y+40, linPos.x, linPos.y);
            context.quadraticCurveTo(ctrlPt.x, ctrlPt.y+50, dotPos.x, dotPos.y);
            context.fill();
        }
        context.stroke();


        context.fillStyle = saveStyle;
    }

    //Determines where to draw the line from
    function getLineStartPoint(txtConfig) {
        if(txtConfig.startPos === undefined || rerender) {
            var dotPos = getDotPosition(txtConfig),
                dims = getDimensions(txtConfig),
                startX, startY;

            startX = ( dotPos.x > dims.x + dims.width /2 ? 1 : 0);
            startY = ( dotPos.y > dims.y + dims.height/2 ? 1 : 0);
            
            txtConfig.startPos = getPositionOnBox(txtConfig, startX, startY, showBoxShadow);
        }

        return txtConfig.startPos;
    }

    //TODO investigate a wrapping function
//        function wrapText(context, text, x, y, maxWidth, lineHeight) {
//            var words = text.split(' ');
//            var line = '';
//
//            for(var n = 0; n < words.length; n++) {
//                var testLine = line + words[n] + ' ';
//                var metrics = context.measureText(testLine);
//                var testWidth = metrics.width;
//                if (testWidth > maxWidth && n > 0) {
//                    context.fillText(line, x, y);
//                    line = words[n] + ' ';
//                    y += lineHeight;
//                }
//                else {
//                    line = testLine;
//                }
//            }
//            context.fillText(line, x, y);
//        }

    function drawCloseBtn() {
        //save state
        var saveStyle = context.fillStyle,
            saveLine = context.strokeStyle,
            saveLnWidth = context.lineWidth,
            saveBaseline = context.textBaseline,
            saveFont = context.font;

        context.fillStyle = closeButton.background;
        context.strokeStyle = closeButton.lineColor;
        context.textBaseline = "middle";
        context.lineWidth = 3;
        context.font = closeButton.font;

        var size = closeButton.size,
            x = closeButton.x,
            y = closeButton.y;
        if(closeButton.shape === 'circle') {
            context.fillArc(x, y, size,0,2*Math.PI);
            context.strokeArc(x, y, size,size,0,2*Math.PI);
        } else {
            context.fillRect(x, y, size,size);
            context.strokeRect(x, y, size,size);
        }
        context.fillStyle = closeButton.lineColor;
        context.fillText("x", x+size/2-4, y+size/2);

        context.lineWidth = saveLnWidth;
        context.fillStyle = saveStyle;
        context.strokeStyle = saveLine;
        context.textBaseline = saveBaseline;
        context.font = saveFont;
    }

    function displayCloseButton (bool) {
        if(typeof bool === 'boolean') {
            showCloseButton=bool;
        }
    }

    var pubFns = {
        //The function allows a user to define their own behavior when the canvas is clicked
        onClick : function(fn) {
            canvas[0].onclick = fn;
            return this;
        },

        isRendered : function() {
            return rendered && !rerender;
        },

        isVisible: function () {
            return visible;
        },

        render : function() {
            context.textBaseline = 'top';
            if(typeof objectList === 'undefined') {
                console.warn('No object list defined for HelpScreen: ',this);
                return;
            }
            if(!rendered || rerender) {
                if( !(objectList instanceof Array) ) {
                    var type = typeof(objectList);
                    console.warn("Warning: Item config must be an array. Instead found "+type+".  ",objectList);
                    return;
                }
                if(rerender) this.clear();
                for(var i = 0; i < objectList.length; ++i){
                    this.drawObject(objectList[i]);
                    // if(objectList[i].relativePos) {

                    // }
                }
                if(showCloseButton) drawCloseBtn();
                if(!rendered) {
                    canvas.appendTo('body');
                }
                rendered = true;
                rerender = false;
            }
            return this;
        },

        drawObject : function(obj) {
            getDimensions(obj);
            if( (obj.boxShadowColor !== undefined && obj.boxShadowColor !== null)
                  || obj.showBoxShadow || showBoxShadow) {
                drawBoxShadow(obj);
            }
            drawText(obj);
            if((obj.dotPosition !== undefined && obj.dotPosition !== null)
               || (obj.element !== undefined && obj.element !== null)) {
                drawLine(obj);
                drawDot(obj);
            }
            return this;
        },

        setTitleFont : function(font) {    //turn this into setDefaultTitleFont
            titleFont = font;
            rerender = true;
            return this;
        },
        setTextFont : function(font) {    //turn this into setDefaultTextFont
            textFont = font;
            rerender = true;
            return this;
        },
        setTitleStyle : function(font, color) {    //turn this into setDefaultTitleStyle
            titleFont  = font  || titleFont;
            titleColor = color || titleColor;
            rerender = true;
            return this;
        },
        setTextStyle : function(font, color) {    //turn this into setDefaultTextStyle
            textFont  = font  || textFont;
            textColor = color || textColor;
            rerender = true;
            return this;
        },
        setShadowColor : function(color) {
            shadowColor = color;
            rerender = true;
            return this;
        },

        getContext : function () {
            return context;
        },
        hideCanvas : function() {
            canvas.addClass("hide-canvas");
            visible = false;
            return this;
        },
        showCanvas : function() {
            if(!this.isRendered() && !deleted) this.render();
            canvas.removeClass("hide-canvas");
            visible = true;
            return this;
        },
        /*This function destroys ONLY THE ELEMENT the variable is attached to. 
            Yes, this is a memory leak. */
        destroy : function() {
            var a = document.getElementById(canvasId);
            if(a !== null)
                a.parentNode.removeChild(a);
            deleted = true;
            // TODO: find a way to delete this object
        },
        clear : function() {
            context.clearRect(0,0,canvas.width(), canvas.height());
            rerender = true;
            return this;
        },
        appendToConfig : function (input, invalidate) {
            rerender = typeof invalidate==="boolean" ? invalidate : true;
            if(!(input instanceof Array) && typeof input !== "object") {
                console.warn("appendConfigs takes an object or array, instead got ",input);
            }
            objectList = objectList.concat(input);
            return this;
        },
        replaceConfig : function(newCfg, invalidate) {
            if( !(newCfg instanceof Array) ) {
                console.warn("Warning: Item config must be an array. Instead found "+type+".  ",newCfg);
            } else {
                objectList = newCfg;
            }
            rerender = typeof invalidate==="boolean" ? invalidate : true;

            return this;
        },
        restoreDefaults : function() {
            this.reconfigure(this.defaults);
            rerender = true;
            return this;
        },
        reconfigure : function(config) {
            if(config !== undefined) {
                //responsive = config.responsive;
                titleFont  = config.titleFont  || this.defaults.defTitleFont;
                titleColor = config.titleColor || this.defaults.defTitleColor;
                textFont   = config.textFont   || this.defaults.defFont;
                textColor  = config.textColor  || this.defaults.defColor;
                if(config.showCloseButton !== undefined) {
                    showCloseButton = config.showCloseButton ;
                }
                if(config.boxShadowColor === undefined) {
                    boxShadowColor = this.defaults.defShadowColor;
                } else {
                    boxShadowColor = config.boxShadowColor;
                    showBoxShadow = true;
                }
                if(config.shadowColor === undefined) {
                    shadowColor = this.defaults.defShadowColor;
                } else {
                    shadowColor = config.shadowColor;
                    showShadow = true;
                }
                if(config.closeBtnPos !== undefined) {
                    closeButton.x = config.closeBtnPos.x;
                    closeButton.y = config.closeBtnPos.y;
                    showCloseButton = true;
                }
            }
            rerender = true;
            return this;
        },
        positionCloseButton : function(x,y) {
            closeButton.x = x;
            closeButton.y = y;
            rerender = true;
            showCloseButton = true;
            return this;
        },
        showCloseBtn : function (value) {
            showCloseButton = (typeof value === "boolean" ? value : false);
            rerender = true;
            return this;
        },
        getObjectList : function () {
            return objectList;
        }
    };

    $.extend(this, config, pubFns);
};

HelpScreen.prototype = (function() {
    $("<style type='text/css'>.hide-canvas{ display:none; }</style>").appendTo("head");

    return {
        randIdNum: function () {
            return Math.floor(Math.random()*8999)+1000;
        },
        defaults: {
            defTextWidth : 100,
            defFont : "11pt Helvetica",
            defColor : 'rgb(255,255,255)',
            defTitleFont : "16pt Arial",
            defTitleColor : '#ADD8FF',
            defShadowColor : 'rgba(50,50,50,.6)'
        },
        init: function() {
        },
        toString: function() {
            return "[object HelpScreen]";
        },
        maxZ: function (){
            //This function was written by Stephen Nielsen as part of the WUI framework.
            //www.geekinaday.com/wui/wui-1-1/  AND https://github.com/srolfe26/WUI
            var bodyElems = $('body *'),
                useElems = bodyElems.length < 2500 ? bodyElems : $('body > *, [style*="z-index"]'),  //1
                topZ =  Math.max.apply(null,
                            $.map(useElems, function(e) {
                                if ($(e).css('position') !== 'static')
                                    return parseInt($(e).css('z-index'),10) || 0;
                            })
                        );
            return ($.isNumeric(topZ) ? topZ : 0) + 1; //2
        }
    };

})();
