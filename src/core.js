/**
* Copyright (c) 2013, Ken Anderson <caffeinatedrat at gmail dot com>
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

/*
* -----------------------------------------------------------------
* NOTES:
* -----------------------------------------------------------------
* Just a very basic library.
*/

"use strict";

//-----------------------------------------------------------------
// Namespace
//-----------------------------------------------------------------

var CaffeinatedRat = CaffeinatedRat || {};

//-----------------------------------------------------------------
// Data Types
//-----------------------------------------------------------------

CaffeinatedRat.COMPARE_OP = { EQUAL: 0, LESS_THAN: 1, GREATER_THAN: 2 };

/**
* @constructor
*/
CaffeinatedRat.Version = function (Major, Minor, Revision) {

    this.Major = Major || 0;
    this.Minor = Minor || 0;
    this.Revision = Revision || 0;

}

CaffeinatedRat.Version.prototype = {

    constructor: CaffeinatedRat.Version,

    /**
    * @return {string} Returns the version number as a string as the format Major.Minor.Revision.
    * @override
    */
    toString: function () {

        return this.Major + '.' + this.Minor + '.' + this.Revision;

    },

    /**
    * Returns true if this version is equal to the passed version.
    * @param {object} The version to compare against.
    * @return {bool} Returns true if the version numbers are equal.
    */
    equal: function (version) {

        /// <summary>
        /// Returns true if the version is equal.
        /// </summary>
        /// <returns>
        /// 
        /// </returns>

        if (version instanceof CaffeinatedRat.Version) {

            return (version.Major === this.Major)
                && (version.Minor === this.Minor)
                && (version.Revision === this.Revision);

        }

        return false;

    },

    /**
    * Returns CaffeinatedRat.COMPARE_OP.equal if the versions are equal.
    * Returns CaffeinatedRat.COMPARE_OP.LessThan if the current version is less than the one that was passed.
    * Returns CaffeinatedRat.COMPARE_OP.GreaterThan if the current version is greater than the one that was passed.
    * @param {object} The version to compare against.
    * @return {number} 
    */
    compare: function (version) {

        if (version instanceof CaffeinatedRat.Version) {

            //Weight each version part so that the each preceeding version part has a heavier weight.
            var sourceVersionWeight = (this.Major > version.Major) ? 8 : 0;
            var targetVersionWeight = (this.Major < version.Major) ? 8 : 0;

            sourceVersionWeight += (this.Minor > version.Minor) ? 4 : 0;
            targetVersionWeight += (this.Minor < version.Minor) ? 4 : 0;

            sourceVersionWeight += (this.Build > version.Build) ? 2 : 0;
            targetVersionWeight += (this.Build < version.Build) ? 2 : 0;

            sourceVersionWeight += (this.Revision > version.Revision) ? 1 : 0;
            targetVersionWeight += (this.Revision < version.Revision) ? 1 : 0;

            if (sourceVersionWeight === targetVersionWeight) {

                return CaffeinatedRat.COMPARE_OP.EQUAL;

            }
            else if (sourceVersionWeight > targetVersionWeight) {

                return CaffeinatedRat.COMPARE_OP.GREATER_THAN;

            }
            else {

                return CaffeinatedRat.COMPARE_OP.LESS_THAN;

            }

        }
        else {

            throw new CaffeinatedRat.Exception('compare', 'Argument \'version\' is not a valid CaffeinatedRat.Version type.');

        }
        //END OF if (version instanceof CaffeinatedRat.Version) {...

    }

};

//-----------------------------------------------------------------
// Versioning
//-----------------------------------------------------------------
CaffeinatedRat.VERSION = new CaffeinatedRat.Version(1, 0, 0);

//-----------------------------------------------------------------
// Exceptions
//-----------------------------------------------------------------

/**
* @constructor
*/
CaffeinatedRat.Exception = function (caller, message) {

    var internalMessage = "CaffeinatedRat" + ((caller !== undefined) ? ("." + caller) : "") + ": " + message;

    this.toString = function () {

        return internalMessage;

    }

}
