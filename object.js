var _getArray = {
	x : function( array ) { return array[0] },
	y : function( array ) { return array[1] },
	z : function( array ) { return array[2] }
}

var _getObject = {
	x : function( array ) { return array.x },
	y : function( array ) { return array.y },
	z : function( array ) { return array.z },
}

function _returnArray( x, y, z, target ) {

	if( !target ) { target = [] }

	target[0] = x
	target[1] = y
	target[2] = z

	return target
}

function _returnConstructor( x, y, z, target, constructor ) {

	if( !target ) { target = new constructor }

	target.x = x
	target.y = y
	target.z = z

	return target
}

function _returnObject( x, y, z, target ) {

	if( !target ) { target = {} }

	target.x = x
	target.y = y
	target.z = z

	return target
}

module.exports = function randomSphericalCoordinateFn( random, constructor ) {

	if( !random ) { random = Math.random }
	var TAU = Math.PI * 2

	return function( a, b, c ) {

		var target, radius, offset

		if( typeof a === "object" ) {
			target = a
			radius = b
			offset = c
		} else {
			radius = a
			offset = b
		}

		if( !target ) {	target = constructor ? new constructor() : {} }
		if( radius === undefined ) { radius = 1 }

		if( offset ) {
			var x = offset.x
			var y = offset.y
			var z = offset.z
		} else {
			var x = 0
			var y = 0
			var z = 0
		}

		var costheta = 2 * random() - 1
		var sintheta = Math.sqrt( 1 - costheta * costheta )
		var phi      = random() * TAU

		target.x = x + radius * sintheta * Math.cos( phi )
		target.y = y + radius * sintheta * Math.sin( phi )
		target.z = z + radius * costheta

		return target
	}
}