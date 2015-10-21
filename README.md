# Random Spherical

Generate a random (x,y,z) point on a sphere. Internally it generates a random θ and φ value in a (r,θ,φ) [spherical coordinate](https://en.wikipedia.org/wiki/Spherical_coordinate_system) and maps it to a (x,y,z) cartesian coordinate. Returns either an array or an object with an optional constructor.

# Initializing

Works as an array or object. All parameters are optional. If no random number generator is provided then `Math.random` is used. If no constructor is provided for the object then it will create a bare `{}`.

	var randomSpherical = require('random-spherical/array')( randomGenerator )
	var randomSpherical = require('random-spherical/object')( randomGenerator, constructor )

It can also be initialized this way, but includes more source code if used with browserify.

	var random = require('random-spherical')
	var randomArray = random.array()
	var randomObject = random.object()

# Interface

The `radius` is a number, `offset` is a 3d array/object vector, and the `target` is an optional array/object target to avoid garbage collection.

	var randomSpherical = require('random-spherical/array')()
	
	randomSpherical()
	randomSpherical( radius, offset )
	randomSpherical( target, radius, offset )

# Usage

## Simple

	var random = require('random-spherical/array')()
	
	random() // returns [ 0.20921503109744416, 0.5193212554924722, -0.8285737772562065 ]
	random() // returns [ -0.23002829130722735, -0.061082054576348306, -0.971265137749219 ]
	random() // returns [ 0.5578066492160378, 0.0729061655774499, -0.826762621984793 ]

## Configured with a PRNG and three.js vectors

	var randomGenerator = SeededRandom("my-seed")
	var randomSpherical = require('random-spherical/object')( randomGenerator, THREE.Vector3 )
	
	var planetRadius = 10
	var planetPosition = new THREE.Vector( 134, 352, 135 )
	
	var pointOnSurface = randomSpherical( planetRadius, planetPosition )
	var pointInsidePlanet = randomSpherical( randomGenerator(), planetPosition )
	var directionalVector = randomSpherical()