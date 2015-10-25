var Test = require('tape')
var RandomSphericalFn = require('../array')
var Fuzz = require('test-fuzzy-array')

function _unrandomFn() {
	
	// A non-random number generator
	
	var value = 0
	
	return function unrandom() {
		value += 0.1
		return value
	}
}

var results = [
	[ 0.185410,  0.57063, -0.8 ],
	[ -0.74148,  0.53871, -0.4 ],
	[ -0.80902, -0.58779,    0 ]
]

Test("random spherical on an array", function(t) {
	
	t.test("calculates straight", function(t) {
		
		t.plan(3)
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		
		almostEqual( random(), results[0] )
		almostEqual( random(), results[1] )
		almostEqual( random(), results[2] )
	})
	
	t.test("calculates with a radius and offset", function(t) {
		
		t.plan(3)
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		var offset = [1,2,3]
		var transformedResults = results.map(function( point ) {
			return [
				point[0] * 2 + 1,
				point[1] * 2 + 2,
				point[2] * 2 + 3,
			]
		})
		
		almostEqual( random(2, offset), transformedResults[0] )
		almostEqual( random(2, offset), transformedResults[1] )
		almostEqual( random(2, offset), transformedResults[2] )
	})

	t.test("calculates with a target, radius, and offset", function(t) {
		
		t.plan(6)
		
		var almostEqual = Fuzz(t, 0.00001)
		var random = RandomSphericalFn( _unrandomFn() )
		var offset = [1,2,3]
		var transformedResults = results.map(function( point ) {
			return [
				point[0] * 2 + 1,
				point[1] * 2 + 2,
				point[2] * 2 + 3,
			]
		})
		
		var target = []
		
		almostEqual( random(target, 2, offset), transformedResults[0] )
		almostEqual( random(target, 2, offset), transformedResults[1] )
		almostEqual( random(target, 2, offset), transformedResults[2] )
		
		t.equal( target, random( target ) )
		t.equal( target, random( target, 2 ) )
		t.equal( target, random( target, 2, offset ) )
	})
	
	t.test("calculates the correct radius", function(t) {
		var random = RandomSphericalFn()
		
		t.plan(9)
		
		function vecLength(a) {
			var x = a[0]
			var y = a[1]
			var z = a[2]
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