# Random Spherical

Generate a random uniformly distributed (x,y,z) [point on a sphere](http://mathworld.wolfram.com/SpherePointPicking.html). Returns either an array or an object with an optional constructor.

# Basic Usage

### Array

	var random = require('random-spherical/array')()
	
	random() // returns [  0.20921503109744416,  0.5193212554924722, -0.8285737772562065 ]
	random() // returns [ -0.23002829130722735, -0.061082054576348306, -0.971265137749219 ]
	random() // returns [  0.5578066492160378,   0.0729061655774499, -0.826762621984793 ]

### Object

	var random = require('random-spherical/object')()
	
	random() // returns { x: 0.20921503109744416, y: 0.5193212554924722, z: -0.8285737772562065 }
	random() // returns { x: -0.23002829130722735, y: -0.061082054576348306, z: -0.971265137749219 }
	random() // returns { x: 0.5578066492160378, y: 0.0729061655774499, z: -0.826762621984793 }

# Live Example

<a href='https://tatumcreative.github.io/npm-random-spherical/'>
	![Random sphere example](https://tatumcreative.github.io/npm-random-spherical/screenshot.jpg)
</a>

[Spinning dots on a sphere](https://tatumcreative.github.io/npm-random-spherical/)

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


# Usage configured with a PRNG and three.js vectors

	var randomGenerator = SeededRandom("my-seed")
	var randomSpherical = require('random-spherical/object')( randomGenerator, THREE.Vector3 )
	
	var planetRadius = 10
	var planetPosition = new THREE.Vector( 134, 352, 135 )
	
	var pointOnSurface = randomSpherical( planetRadius, planetPosition )
	var pointInsidePlanet = randomSpherical( randomGenerator(), planetPosition )
	var directionalVector = randomSpherical()