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

CaffeinatedRat.Algorithms = CaffeinatedRat.Algorithms || {};

///////////////////////////////////////////
// Sort methods.
///////////////////////////////////////////

CaffeinatedRat.Algorithms.Sort = function (compareFunc) {

    /// <summary>Suite of sorting functionality.</summary>

    //Default to the ascending comparison function if one is not supplied.
    if (compareFunc === undefined)
        this.compareFunc = CaffeinatedRat.Algorithms.Sort.prototype.ascending;
    else
        this.compareFunc = compareFunc;

    this.IQuickSort = function (arr, left, right) {

        /// <summary>Performs an internal quicksort based on the array supplied and the left & right position within that array.</summary>
        /// <param name="arr" type="Object">An array of values to sort.</param>
        /// <param name="left" type="Number">The left location to start with.</param>
        /// <param name="right" type="Number">The right location to start with.</param>

        var i = left;
        var j = right;
        var pivot = arr[Math.truncate((left + right) / 2)];

        /* partition */
        while (i <= j) {
            while (this.compareFunc(arr[i], pivot) < 0) i++;
            while (this.compareFunc(arr[j], pivot) > 0) j--;
            if (i <= j) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
                i++;
                j--;
            }
        };

        /* recursion */
        if (left < j)
            this.IQuickSort(arr, left, j);
        if (i < right)
            this.IQuickSort(arr, i, right);

    }
}


CaffeinatedRat.Algorithms.Sort.prototype = {

    quickSort: function (arr) {

        this.IQuickSort(arr, 0, arr.length - 1);

    },

    ascending: function (a, b) {

        /// <summary>An ascending comparison function that uses the comparison operators.</summary>
        /// <returns type="Number">Returns 0 if a == b, -1 if a &lt; b, and 1 if a &gt; b</returns>
        return ((a == b) ? 0 : ((a < b) ? -1 : 1));

    },

    descending: function (a, b) {

        /// <summary>A descending comparison function that uses the comparison operators.</summary>
        /// <returns type="Number">Returns 0 if a == b, 1 if a &lt; b, and -1 if a &gt; b</returns>
        return ((a == b) ? 0 : ((a < b) ? 1 : -1));

    }

}

///////////////////////////////////////////
// Creats a psuedorandom number from a Linear Congruential Generation algorithm.
// X1 = (a * X0 + c) % m where
// m -- modulus [0 < m] (Coprime w/c)
// a -- Multiplier [0 < a < m] (Prime number)
// c -- incrementer [0 <= c < m] (Coprime w/m)
// X0 -- Seed value [0 <= X0 < m]
///////////////////////////////////////////
CaffeinatedRat.Algorithms.LCGRandom = function (seed) {

    /// <summary>Instantiates a Linear Congruential Generator.</summary>
    /// <param name="seed" type="Number">The random seed value.</param>
    this.seed = seed;

}

CaffeinatedRat.Algorithms.LCGRandom.prototype.random = function () {

    /// <summary>Returns a random number based on the seed supplied.</summary>
    /// <returns type="Number">Returns a random number.</returns>

    // X1 = (a * X0 + c) % m where a = 214013, c = 2531011, m = 2^32
    return (this.seed = (214013 * this.seed + 2531011) % Math.maxUInt32);

}