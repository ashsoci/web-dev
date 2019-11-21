function handler(ev) {
var target = $(ev.target);
if( target.is(".prod") ) {
   alert('The mouse was over' );
}
}
$(".prod").mouseleave(handler);