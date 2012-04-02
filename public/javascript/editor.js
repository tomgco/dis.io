window.onload = function() {
    prettyPrint();
    $('.controls.code').click(function() {
      var pre = $(this).first().children().filter('pre')
      var textarea = $(this).first().children().filter('textarea');
      pre.hide();
      textarea.show();
      textarea.focus();
      textarea.blur(function() {
        pre.text(textarea.val());
        textarea.hide();
        pre.show();
        prettyPrint();
      });
      // for fun later! use the ace editor
      // $($.next()).show();
      // var editor = ace.edit("EditorWorkunit");
      // editor.setTheme("ace/theme/twilight");
      // var JavaScriptMode = require("ace/mode/javascript").Mode;
      // editor.getSession().setMode(new JavaScriptMode());
    });
};