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

///////////////////////////////////////////
// CONSTANTS & UTILITY FUNCTIONS
///////////////////////////////////////////
Math.PI2 = 6.283185307179586476925286766559;
/// <summary>Precalculated PI * 2</summary>
Math.HalfPI = 1.5707963267948966192313216916398;
/// <summary>Precalculated PI / 2 constant</summary>
Math.QuarterPI = 4.7123889803846898576939650749193;
/// <summary>Precalculated max value of a signed Int32 value.
Math.maxInt32 = 2147483647;
/// <summary>Precalculated max value of an unsigned Int32 value.
Math.maxUInt32 = 4294967296;

Math.sqr = function (x) {

    /// <summary>Square and return the number supplied.</summary>
    /// <param name="x" type="Number">The value to be squared.</param>
    return x * x;

}

Math.toRadians = function (degrees) {

    /// <summary>Convert degrees to radians.</summary>
    /// <param name="degree" type="Number"></param>
    return (degrees * Math.PI / 180);

}

Math.toDegrees = function (radians) {

    /// <summary>Convert radians to degrees.</summary>
    /// <param name="radians" type="Number"></param>
    return (radians * 180 / Math.PI);

}

Math.truncate = function (val) {

    /// <summary>Truncates a value quickier than using Math.Round.  WARNING: This will only work with signed integers and will fail with values greater than ((2 ^ 32) / 2) - 1.</summary>
    /// <param name="val" type="Number"></param>
    /// <returns type="Number">The truncated value.</returns>
    return ((val >= Math.maxInt32) ? Math.maxInt32 : (~ ~val));

}

Math.fastRound = function (val) {

    /// <summary>Quickly rounds a value.  WARNING: This will only work with signed integers and will fail with values greater than ((2 ^ 32) / 2) - 1.</summary>
    /// <param name="val" type="Number"></param>
    /// <returns type="Number">The rounded value.</returns>
    return ~(~(val + 0.5));

}

Math.clampToZero = function (val) {

    /// <summary>Clamps a value to zero when it reaches an extremely small point..</summary>
    /// <param name="val" type="Number"></param>
    /// <returns type="Number">The clamped value.</returns>
    return ((val < 0.000000001) && (val > -0.000000001)) ? 0.0 : val;

}

Math.clampToMaxInt32 = function (val) {

    /// <summary>Clamps a value to the maxed signed integer value. ((2 ^ 32) / 2) - 1 </summary>
    /// <param name="val" type="Number"></param>
    /// <returns type="Number">The clamped value.</returns>
    return (val >= Math.maxInt32) ? Math.maxInt32 : val;

}