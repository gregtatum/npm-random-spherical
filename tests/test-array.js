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
	[  0.05449068, 0.1677050, 0.24270509 ],
	[ -0.35267115,         0, -0.4854101 ],
	[ -0.26450336, 0.8140576, -0.2781152 ],
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
})