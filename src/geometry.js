/// <reference path="math.js">

/**
* Copyright (c) 2012-2013, Ken Anderson <caffeinatedrat at gmail dot com>
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

CaffeinatedRat.Geometry = CaffeinatedRat.Geometry || {};

CaffeinatedRat.Geometry.Point2 = function(x, y) {

    /// <summary>Manages a 2 dimensional point in space.</summary>
    /// <param name="x" type="Number">The x-axis location of the point.</param>
    /// <param name="y" type="Number">The y-axis location of the point.</param>

    this.x = x;
    this.y = y;

}

//Creates a vector from the origin to this point.
CaffeinatedRat.Geometry.Point2.prototype = {

    //Creates a vector from the source to this point.
    createVector: function (srcX, srcY) {

        srcX = srcX || 0;
        srcY = srcY || 0;

        return new CaffeinatedRat.Geometry.Vector2(this.x - srcX, this.y - srcY);

    },

    //Returns a string representation of the point in the format [x, y]: {0}, {1}
    toString: function () {

        return '[x, y]: ' + this.x + ', ' + this.y;

    }

};

CaffeinatedRat.Geometry.Vector2 = function(x, y) {

    /// <summary>Manages a 2 dimensional vector.</summary>
    /// <param name="x" type="Number">The x-axis location of the point.</param>
    /// <param name="y" type="Number">The y-axis location of the point.</param>
    this.x = x;
    this.y = y;

}

CaffeinatedRat.Geometry.Vector2.prototype = {

    //Returns the length of the vector.
    length: function() {

        return Math.sqrt(Math.sqr(this.x) + Math.sqr(this.y));

    },

    //Returns the angle in radians from the origin.
    theta: function() {
    
        return (Math.atan2(this.y, this.x) + Math.PI2) % Math.PI2;
    
    },

    //Returns an instance of the mirrored vector across the x-axis.
    mirror: function() {

        return new CaffeinatedRat.Geometry.Vector2(-this.x, this.y);
        
    },

    //Returns an instance of the flipped vector across the y-axis
    flip: function() {

        return new CaffeinatedRat.Geometry.Vector2(this.x, -this.y);
    
    },

    //Adds v to the current vector and returns a new instance of the vector.
    add: function(v) {

        return new CaffeinatedRat.Geometry.Vector2(this.x + v.x, this.y + v.y);
        
    },

    //Substracts v from the current vector and return a new instance of the vector.
    subtract: function(v) {

        return new CaffeinatedRat.Geometry.Vector2(this.x - v.x, this.y - v.y);
        
    },

    //Multiples the current vector by a scalar value and returns a new instance of the vector.
    multiplyScalar: function(s) {

        return new CaffeinatedRat.Geometry.Vector2(this.x * s, this.y * s);
        
    },

    //Multiples the current vector by vector v and returns a new instance of the vector.
    multiplyVector: function(v) {

        return new CaffeinatedRat.Geometry.Vector2(this.x * v.x, this.y * v.y);

    },

    //Performs a dot product operation on the current vector and vector v and returns a scalar value.
    dotProduct: function(v) {

        return (this.x * v.x) + (this.y * v.y);

    },

    //Performs a cross product operation on the current vector and vector v and returns a new instance of the vector.
    //NOTE: vresults = 0i + 0j + ((this.x * v.y) - (this.y * v.x))k, where k is the 3rd dimension not supported by 2-d vectors.
    // vresults = 0i +  ((this.x * v.y) - (this.y * v.x))j
    crossProduct: function(v) {

        return new CaffeinatedRat.Geometry.Vector3(0, 0, (this.x * v.y) - (this.y * v.x));

    },

    //Normalizes the vector and returns a new instace of the vector.
    normalize: function() {
        
        l = this.length();
        return new CaffeinatedRat.Geometry.Vector2(this.x / l, this.y / l);

    },

    //Returns a string representation of the vector in the format [x, y, ?, ||v||]: {0}, {1}, {2}, {3}
    toString: function() {
    
        return '[x, y, ?, ||v||]: ' + this.x + ', ' + this.y + ', ' + this.theta() + ', ' + this.length()
    
    }

}

CaffeinatedRat.Geometry.Vector3 = function(x, y, z) {

    /// <summary>Manages a 3 dimensional vector.</summary>
    /// <param name="x" type="Number">The x-axis location of the point.</param>
    /// <param name="y" type="Number">The y-axis location of the point.</param>
    /// <param name="y" type="Number">The z-axis location of the point.</param>
    this.x = x;
    this.y = y;
    this.z = z;

}

CaffeinatedRat.Geometry.Vector3.prototype = {

    //Returns the length of the vector.
    length: function () {
        
        return Math.sqrt(Math.sqr(this.x) + Math.sqr(this.y) + Math.sqr(this.z));
        
    },

    //Adds v to the current vector and returns a new instance of the vector.
    add: function (v) {

        return new CaffeinatedRat.Geometry.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);

    },

    //Substracts v from the current vector and return a new instance of the vector.
    subtract: function (v) {

        return new CaffeinatedRat.Geometry.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    
    },

    //Multiples the current vector by a scalar value and returns a new instance of the vector.
    multiplyScalar: function (s) {

        return new CaffeinatedRat.Geometry.Vector3(this.x * s, this.y * s, this.z * s);
        
    },

    //Multiples the current vector by vector v and returns a new instance of the vector.
    multiplyVector: function (v) {

        return new CaffeinatedRat.Geometry.Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        
    },

    //Performs a dot product operation on the current vector and vector v and returns a scalar value.
    dotProduct: function (v) {
    
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    
    },

    //Performs a cross product operation on the current vector and vector v and returns a new instance of the vector.
    //NOTE: u x v = (u2v3 - u3v2)i - (u1v3 - u3v)j + (u1v2 - u2v)k
    // vresults = (this.y * v.z - this.z * v.y) - (this.x * v.z - v.x * this.z) + (this.x * v.y - this.y * v.x);
    // NOTE: The reversal of the difference operation on the y-coordinate for readability due to sign changes.
    //  vresults = (this.y * v.z - this.z * v.y) + (v.x * this.z - this.x * v.z) + (this.x * v.y - this.y * v.x);
    crossProduct: function (v) {

        return new CaffeinatedRat.Geometry.Vector3((this.y * v.z - this.z * v.y), (v.x * this.z - this.x * v.z), (this.x * v.y - this.y * v.x));
    
    },

    //Normalizes the vector and returns a new instace of the vector.
    normalize: function () {
        
        l = this.length();
        return new CaffeinatedRat.Geometry.Vector3(this.x / l, this.y / l, this.z / l);

    },

    //Returns a string representation of the vector in the format x: {0} y: {1} z: {2}
    toString: function () {
    
        return 'x: ' + this.x + ' y: ' + this.y + ' z: ' + this.z;

    }

}

///////////////////////////////////////////
// Shape
// Manages a series of static methods for creating shapes.
///////////////////////////////////////////
CaffeinatedRat.Geometry.Shape = function(sides, width, height, offset, orientation) {

    /// <summary>Manages a shape.</summary>
    /// <param name="sides" type="Number">The number of sides for the shape.</param>
    /// <param name="width" type="Number">The width of the shape.</param>
    /// <param name="height" type="Number">The height of the shape.</param>
    /// <param name="offset" type="Number">The position of the shape.</param>
    /// <param name="orientation" type="Number">The orientation of the shape(0 - 2PI).</param>

    this.points = new Array(sides);
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.sides = sides;
    this.orientation = orientation

    //    this.slope = null;
    //    this.yintercept = null;

}

CaffeinatedRat.Geometry.Shape.createPolygon = function (sides, size, offset, orientation) {

    /// <summary>Creates a polygon with n number of sides, based on the size, offset, and orientation.</summary>
    /// <param name="sides" type="Number">The number of sides for the shape.</param>
    /// <param name="size" type="Number">The size of the shape.</param>
    /// <param name="offset" type="Number">The position of the shape.</param>
    /// <param name="orientation" type="Number">The orientation of the shape(0 - 2PI).</param>
    /// <returns type="Number">Returns this object with the shape created.</returns>

    var shape = new CaffeinatedRat.Geometry.Shape(sides, size, size, offset, orientation);
    var segment = Math.PI2 / sides;

    //this.slope = new Array(this.sides);
    //this.yintercept = new Array(this.sides);

    //NOTE: As a side effect, all points will be arranged in counter-clockwise order.
    shape.points[0] = new CaffeinatedRat.Geometry.Point2(Math.cos(orientation) * size + offset.x, Math.sin(orientation) * size + offset.y);

    for (var i = 1; i < sides; i++) {
        shape.points[i] = new Point2(Math.cos(segment * i + orientation) * size + offset.x, Math.sin(segment * i + orientation) * size + offset.y);

        //Calc the slope of the current point and the previous point.
        //this.slope[i - 1] = (this.points[i].y - this.points[i - 1].y) / (this.points[i].x - this.points[i - 1].x);
        //this.yintercept[i - 1] = this.points[i - 1].y / (this.slope[i - 1] * this.points[i - 1].x);
    }

    //Calc the last slope.
    //this.slope[i - 1] = (this.points[0].y - this.points[i - 1].y) / (this.points[0].x - this.points[i - 1].x);
    //this.yintercept[i - 1] = this.points[0].y / (this.slope[i - 1] * this.points[0].x);
    return shape;

}

CaffeinatedRat.Geometry.Shape.createTriangle = function (size, offset, orientation) {

    /// <summary>An un-rolled version of createPolygon that creates a triangle based on the size, offset, and orientation.</summary>
    /// <param name="size" type="Number">The size of the shape.</param>
    /// <param name="offset" type="Number">The position of the shape.</param>
    /// <param name="orientation" type="Number">The orientation of the shape(0 - 2PI).</param>
    /// <returns type="Number">Returns this object with the shape created.</returns>

    var shape = new CaffeinatedRat.Geometry.Shape(3, size, size, offset, orientation);
    var segment = Math.PI2 / 3;

    //NOTE: Keep the points in counter-clockwise order to maintain consistency with all other shape creation methods.
    shape.points[0] = new CaffeinatedRat.Geometry.Point2(Math.cos(segment + orientation) * size + offset.x, Math.sin(segment + orientation) * size + offset.y);
    shape.points[1] = new CaffeinatedRat.Geometry.Point2(Math.cos(segment * 2 + orientation) * size + offset.x, Math.sin(segment * 2 + orientation) * size + offset.y);
    shape.points[2] = new CaffeinatedRat.Geometry.Point2(Math.cos(segment * 3 + orientation) * size + offset.x, Math.sin(segment * 3 + orientation) * size + offset.y);

    return shape;

}

CaffeinatedRat.Geometry.Shape.createSquare = function (size, offset) {

    /// <summary>Generates a square based on the size of the shape.  This is a non-rotatable shape.</summary>
    /// <param name="size" type="Number">The size of the shape.</param>
    /// <param name="offset" type="Number">The position of the shape.</param>
    /// <returns type="Number">Returns this object with the shape created.</returns>

    return CaffeinatedRat.Geometry.Shape.createRectangle(size, size, offset);

}

CaffeinatedRat.Geometry.Shape.createRectangle = function (width, height, offset) {

    /// <summary>Generates a rectangle based on the width and height of the shape.  This is a non-rotatable shape.</summary>
    /// <param name="size" type="Number">The size of the shape.</param>
    /// <param name="offset" type="Number">The position of the shape.</param>
    /// <returns type="Number">Returns this object with the shape created.</returns>

    var shape = new CaffeinatedRat.Geometry.Shape(4, width, height, offset, 0);

    //NOTE: Keep the points in counter-clockwise order to maintain consistency with all other shape creation methods.
    shape.points[0] = new CaffeinatedRat.Geometry.Point2(width * (offset.x + 0.5), height * (offset.y + 0.5));
    shape.points[1] = new CaffeinatedRat.Geometry.Point2(width * (offset.x - 0.5), height * (offset.y + 0.5));
    shape.points[2] = new CaffeinatedRat.Geometry.Point2(width * (offset.x - 0.5), height * (offset.y - 0.5));
    shape.points[3] = new CaffeinatedRat.Geometry.Point2(width * (offset.x + 0.5), height * (offset.y - 0.5));

    return shape;

}