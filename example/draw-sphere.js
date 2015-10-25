var Random = require('../array')()
var Loop = require('poem-loop')()
var Mat4 = require('gl-mat4')
var Vec3 = require('gl-vec3')
var Color = require('@tatumcreative/color')
var Lerp = require('lerp')

function _width() {
	return window.innerWidth * window.devicePixelRatio
}

function _height() {
	return window.innerHeight * window.devicePixelRatio
}

function _getContext() {
	var canvas = document.getElementsByTagName("canvas")[0]
	canvas.width = _width()
	canvas.height = _height()
	return canvas.getContext('2d')
}

function _generatePoints( count ) {
	
	var points = []
	for( var i=0; i < count; i++ ) {
		points[i] = Random()
	}
	return points
}

function _updateFn( ctx, points ) {

	var pointToDraw = [0,0,0]
	var maxPointSize = 10 * window.devicePixelRatio
	var minPointSize = maxPointSize * 0.3
	var color = [0, 0.5, 0.5]
	var width = _width()
	var height = _height()
	var centerX = width / 2
	var centerY = height / 2
	var rotateMatY = new Array(16)
	var rotateMatX = new Array(16)
	var radius = Math.min( width, height ) * 0.4
	
	return function update( e ) {
		
		points.sort(function(a,b) {
			return a[2] - b[2]
		})
		
		ctx.fillStyle = "#333"
		ctx.fillRect( 0, 0, width, height )
		Mat4.identity( rotateMatY )
		Mat4.rotateY( rotateMatY, rotateMatY, e.elapsed * 0.001 )
		Mat4.identity( rotateMatX )
		Mat4.rotateX( rotateMatX, rotateMatX, e.elapsed * 0.0002 )
		
		points.forEach(function( point ) {
			
			Vec3.transformMat4( pointToDraw, point, rotateMatY)
			Vec3.transformMat4( pointToDraw, pointToDraw, rotateMatX)
			
			var depth = 1 - (pointToDraw[2] + 1) / 2
			
			color[0] = -depth * 0.1 + 0.5
			color[1] = 1.0
			color[2] = (-depth * 0.3) + 0.6
			
			var pointSize = Lerp( maxPointSize, minPointSize, depth )
			var x = centerX + radius * pointToDraw[0] - pointSize / 2
			var y = centerY + radius * pointToDraw[1] - pointSize / 2
			
			ctx.fillStyle = Color.hslToStyle( color )
			ctx.fillRect( x, y, pointSize, pointSize )
		})
	}
}


function drawSphere() {
	
	var ctx = _getContext()
	var points = _generatePoints( 1000 )
	Loop.emitter.on( 'update', _updateFn( ctx, points ) )
	Loop.start()
}

document.addEventListener("DOMContentLoaded", drawSphere)