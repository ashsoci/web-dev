function handler(ev) {
var target = $(ev.target);
if( target.is("img.prod") ) {
   alert('The mouse was over' );
}
}
$("img.prod").mouseleave(handler);