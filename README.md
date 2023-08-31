# CustomTooltip.js

## Example

    <html>
        <head></head>
        <body>
        
            <span class=".class-for-icon .ctp-tooltip" tp-content="Text Content Here..." ></span>
            
        </body>
        
        <script src="customtooltip.min.js"></script>
        
        <script>
        
          const ToolTip = new CustomTooltip({
              targetClass:'ctp-tooltip'
          });
          
          ToolTip.onHover((e)=>{'Show',e});
          ToolTip.onBlur((e)=>{'Hide',e});
          
        </script>
        
    </html>

