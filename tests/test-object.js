var Test = require('tape')
var RandomSphericalFn = require('../object')
var Fuzz = require('test-fuzzy-array')

function _unrandomFn() {
	
	// A non-random number generator
	
	var value = 0
	
	return function unrandom() {
		value += 0.1
		return value
	}
}

function _toArray( object ) {
	return [object.x, object.y, object.z]
}

var results = [
	[  0.18164, 0.55902,  0.80902 ],
	[ -0.76942, 0.55902, -0.30902 ],
	[        0,       0,       -1 ]
]

Test("random spherical on an object", function(t) {

	t.test("calculates straight", function(t) {
		
		t.plan(3)
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		
		almostEqual( _toArray( random() ), results[0] )
		almostEqual( _toArray( random() ), results[1] )
		almostEqual( _toArray( random() ), results[2] )
	})
	
	t.test("calculates with a radius and offset", function(t) {
		
		t.plan(3)
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		var offset = {x: 1, y: 2, z: 3}
		var transformedResults = results.map(function( point ) {
			return [
				point[0] * 2 + 1,
				point[1] * 2 + 2,
				point[2] * 2 + 3,
			]
		})
		
		almostEqual( _toArray( random(2, offset) ), transformedResults[0] )
		almostEqual( _toArray( random(2, offset) ), transformedResults[1] )
		almostEqual( _toArray( random(2, offset) ), transformedResults[2] )
	})
	
	t.test("calculates with a target, radius, and offset", function(t) {
		
		t.plan(6)
		
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		var offset = {x: 1, y: 2, z: 3}
		var transformedResults = results.map(function( point ) {
			return [
				point[0] * 2 + 1,
				point[1] * 2 + 2,
				point[2] * 2 + 3,
			]
		})
		
		var target = {}
		
		almostEqual( _toArray( random(target, 2, offset) ), transformedResults[0] )
		almostEqual( _toArray( random(target, 2, offset) ), transformedResults[1] )
		almostEqual( _toArray( random(target, 2, offset) ), transformedResults[2] )
		
		t.equal( target, random( target ) )
		t.equal( target, random( target, 2 ) )
		t.equal( target, random( target, 2, offset ) )
	})

	t.test("uses a constructor", function(t) {
		
		function Vector(x,y,z) {
			this.x = x
			this.y = y
			this.z = z
		}
		
		t.plan(4)
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn(), Vector )
		
		almostEqual( _toArray( random() ), results[0] )
		almostEqual( _toArray( random() ), results[1] )
		almostEqual( _toArray( random() ), results[2] )
		
		t.assert( random() instanceof Vector )
		
	})
	
	t.test("calculates the correct radius", function(t) {
		var random = RandomSphericalFn()
		
		t.plan(9)
		
		function vecLength(a) {
			var x = a.x
			var y = a.y
			var z = a.z
			return Math.sqrt(x*x + y*y + z*z)
		}
		
		var epsilon = 0.0001
		
		t.assert( 1 - vecLength(random()) < epsilon )
		t.assert( 1 - vecLength(random()) < epsilon )
		t.assert( 1 - vecLength(random()) < epsilon )

		t.assert( 2 - vecLength(random(2)) < epsilon )
		t.assert( 2 - vecLength(random(2)) < epsilon )
		t.assert( 2 - vecLength(random(2)) < epsilon )

		t.assert( 3 - vecLength(random(3)) < epsilon )
		t.assert( 3 - vecLength(random(3)) < epsilon )
		t.assert( 3 - vecLength(random(3)) < epsilon )
		
	})
})