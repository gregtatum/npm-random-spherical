
function _returnArray( x, y, z, target ) {
	
	if( !target ) { target = [] }
	
	target[0] = x
	target[1] = y
	target[2] = z
	
	return target
}

module.exports = function randomSphericalCoordinateFn( random ) {
	
	if( !random ) {	random = Math.random }
	var TAU = Math.PI * 2
	
	return function randomSphericalCoordinate( a, b, c ) {

		var target, radius, offset
		
		if( Array.isArray( a ) ) {
			target = a
			radius = b
			offset = c
		} else {
			radius = a
			offset = b			
		}
		
		if( !target ) { target = [] }
		if( radius === undefined ) { radius = 1 }

		if( offset ) {
			var x = offset[0]
			var y = offset[1]
			var z = offset[2]
		} else {
			var x = 0
			var y = 0
			var z = 0
		}
		
		var theta  = random() * TAU
		var phi    = random() * TAU
		var r      = random() * radius
		
		target[0] = x + r * Math.sin( theta ) * Math.cos( phi )
		target[1] = y + r * Math.sin( theta ) * Math.sin( phi )
		target[2] = z + r * Math.cos( theta )
		
		return target
	}
}

