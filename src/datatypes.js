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

CaffeinatedRat.DataTypes = CaffeinatedRat.DataTypes || {};

CaffeinatedRat.DataTypes.Hashtable = function(initialSize) {
    /// <summary>A hashtable implementation.</summary>
    /// <param name="initialSize" type="Number">The initial size of the hash table.</param>

    this.internalArray = null;

    if (initialSize === undefined)
        this.internalArray = new Array();
    else
        this.internalArray = new Array(initialSize);
}

CaffeinatedRat.DataTypes.Hashtable.prototype = {

    constructor: CaffeinatedRat.DataTypes.Hashtable,

    add: function(key, value) {

        /// <summary>Adds a value associated with a key.</summary>
        /// <param name="key" type="Object">The key.</param>
        /// <param name="value" type="Object">The value.</param>
        this.internalArray[key] = value;

    },

    getValue: function (key) {

        /// <summary>Returns a value based on the key provided</summary>
        /// <param name="key" type="Object">The key.</param>
        /// <returns type="Object">Returns the value associated with the supplied key.</returns>
        return this.internalArray[key];

    },

    getArray: function () {

        /// <summary>Returns the hashtable as an array.</summary>
        /// <returns type="Array">Returns athe hashtable as an array.</returns>
        return this.internalArray;

    },

    hasKey: function (key) {

        /// <summary>Returns true if the hashtable contains the key.</summary>
        /// <param name="key" type="Object">The key to search for.</param>
        /// <returns type="Bool">Returns the true if the key is found.</returns>
        return !(this.internalArray[key] === undefined);

    },

    size: function () {

        /// <summary>Returns the size of the hashtable.</summary>
        /// <returns type="Number">Returns the size of the hashtable.</returns>
        return this.internalArray.length;

    }

};



CaffeinatedRat.DataTypes.AdjacencyMatrix = function(width, height) {
    /// <summary>Returns true if the hashtable contains the key.</summary>
    /// <param name="width" type="Number">The initial width of the adjacency matrix.</param>
    /// <param name="height" type="Number">The initial height of the adjacency matrix.</param>

    this.rows = new Hashtable(height);

    if (!(width === undefined))
        for (currentRow = 0; currentRow < height; currentRow++)
            this.rows.add(currentRow, new Hashtable(width));
}

CaffeinatedRat.DataTypes.AdjacencyMatrix.prototype = {

    constructor: CaffeinatedRat.DataTypes.AdjacencyMatrix, 

    add: function (x, y, value) {
        /// <summary>Adds a value associated with the x and y position in the adjacency matrix.</summary>
        /// <param name="x" type="Number">The x or column position.</param>
        /// <param name="y" type="Number">The y or row position.</param>
        /// <param name="value" type="Object">The value to store in the adjacency matrix.</param>

        var hashTable = this.rows.getValue(y);
        if (hashTable === undefined) {
            hashTable = new Hashtable();
            this.rows.add(y, hashTable);
        }

        hashTable.add(x, value);
    },

    getValue: function (x, y) {

        /// <summary>Returns a value associated with the x and y position in the adjacency matrix.</summary>
        /// <param name="x" type="Number">The x or column position.</param>
        /// <param name="y" type="Number">The y or row position.</param>
        /// <returns type="Object">Returns the value stored in the x and y position in the adjacency matrix.</returns>
        var hashTable = this.rows.getValue(y);
        if (hashTable === undefined)
            return undefined;

        return hashTable.getValue(x);

    },

    getNumberOfRows: function () {

        /// <summary>Returns the number of rows in the adjacency matrix.</summary>
        /// <returns type="Number">Returns the number of rows in the adjacency matrix.</returns>
        return this.rows.size();

    },

    getNumberOfCols: function (row) {

        /// <summary>Returns the number of columns for the specific row in the adjacency matrix.</summary>
        /// <returns type="Number">Returns the number of rows in the adjacency matrix.</returns>
        var hashTable = this.rows.getValue(row);
        if (hashTable === undefined)
            return 0;

        return hashTable.size();

    }
};