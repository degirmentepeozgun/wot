function addClass(_elem, _classname) {
	if (!_elem)
		return;
	if (hasClass(_elem, _classname))
		return;
	_elem.classList.add(_classname);
}
function removeClass(_elem, _classname) {
	if (!_elem)
		return;
	if (!hasClass(_elem, _classname))
		return;
	_elem.classList.remove(_classname);
}
function hasClass(_elem, _classname) {
	try {
		return _elem.classList?.contains(_classname);
	} catch (e) {
		return false;
	}
}