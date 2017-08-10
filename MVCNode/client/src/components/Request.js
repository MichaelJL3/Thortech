/**
 * @file Request.js
 * @author Michael Laucella
 * @desc promisified static class for handling ajax requests
 * and parsing the results into generic returnable objects
 */

import axios from 'axios';

/**
 * @class Request
 * @desc static class for handling ajax requests and returns
 */
export default class Request {

    /**
     * @function GET
     * @desc send an ajax get request and returns a parsed result object
     * @param {String} url url to send data to
     */
    static async GET(url) {
        return await axios.get(url)
            .then(this.success)
            .catch(this.failure);
    };

    /**
     * @function POST
     * @desc send an ajax post request and returns a parsed result object
     * @param {String} url url to send data to
     * @param {Object} data data to transmit
     */
    static async POST(url, data) {
        return await axios.post(url, data)
            .then(this.success)
            .catch(this.failure);
    };

    /**
     * @function PUT
     * @desc send an ajax put request and returns a parsed result object
     * @param {String} url url to send data to
     * @param {Object} data data to transmit
     */
    static async PUT(url, data) {
        return await axios.put(url, data)
            .then(this.success)
            .catch(this.failure);
    };

    /**
     * @function DEL
     * @desc send an ajax delete request and returns a parsed result object
     * @param {String} url url to send data to
     */
    static async DEL(url) {
        return await axios.delete(url)
            .then(this.success)
            .catch(this.failure);
    };

    /**
     * @function success
     * @desc returns an object summarizing the request success and the data returned
     * @return {Object} success summary and request response data
     */
    static success(res) {
        let result = {
            status: res.status,
            url: res.request.responseURL
        };

        if (200 <= res.status && res.status < 400) {
            if (!res.data&&!res.data.data) {
                result.warning = true;
                result.message = "No Data Returned";
            } else {
                result.success = true;
                result.data = res.data.data;
            }
        } else {
            result.warning = true;
            result.message ="Unexpected Response Code";
        }

        return result;
    };

    /**
     * @name failure
     * @desc returns an object summarizing the request failure and the data returned
     * @return {Object} failure summary and request response data
     */
    static failure(err) {
        let result = {
            message: err.message,
            error: true
        };

        err = err.response;
        if (err) {
            result.status = err.status;

            if (err.error)
                result.message = err.error;

            err = err.config;
            if (err) {
                result.url = err.url;
                result.data = err.data;
            }
        } else {
            result.statusText = "Unknown Error";
        }

        return result;
    };
};