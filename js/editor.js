function cursorOffset(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}


$(function() {
    var $editor = $("#editor"),
        $gutter = $(".gutter"),
        $lines = $("#lines"),
        $size = $("#size"),
        $name = $("#name"),
        $tabs = $(".tabs"),
        lines = 0,
        tab = "  ",
        indent = 0,
        indentDistance = 0,
        enterDistance = 0,
        buf = "";




    function main(e) {
        switch (e.keyCode) {
            case 9:
                document.execCommand('insertHTML', false, tab);
                indent++;
                e.preventDefault();
                break;

            case 13:
                lines++;
                $lines.text(lines + " lines");
                
                break;

            default: 
                break;

        }

    }


    $("#tabs .prop").on("click", function() {
        $(this).siblings(".sel").toggle();
    });


    $editor.on("keydown", main);
});
