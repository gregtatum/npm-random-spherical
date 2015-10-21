# Random Spherical

Generate a random 3d point on a sphere. It generates a random θ and φ value in a (r,θ,φ) [spherical coordinate](https://en.wikipedia.org/wiki/Spherical_coordinate_system) and maps it to a (x,y,z) cartesian coordinate. Returns either an array, object with an optional constructor.

# Example

	var randomGenerator = SeededRandom("my-seed")
	var randomSpherical = require('random-spherical/object')( randomGenerator, THREE.Vector3 )
	
	var planetRadius = 10
	var planetPosition = new THREE.Vector( 134, 352, 135 )
	
	var pointOnSurface = randomSpherical( planetRadius, planetPosition )
	var pointInsidePlanet = randomSpherical( randomGenerator(), planetPosition )
	var directionalVector = randomSpherical()

# Initializing

Works as an array or object. All parameters are optional. If no random number generator is provided then `Math.random` is used. If no constructor is provided for the object then it will create a bare `{}`.

	var randomSphere = require('random-spherical/array')( randomGenerator )
	var randomSphere = require('random-spherical/object')( randomGenerator, constructor )

It can also be initialized this way, but includes more source code if used with browserify.

	var random = require('random-spherical')
	var randomArray = random.array()
	var randomObject = random.object()

# Interface

The radius is a number, offset is a 3d position, and the target is an optional array or object target to avoid garbage collection.

	randomSphere()
	randomSphere( radius, offset )
	randomSphere( target, radius, offset )