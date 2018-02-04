/**
* Utility method to get query parameter value
*
* @param
* @returns
*/
import axios from 'axios';
import Q from 'Q';

const ApiQueue = (queueParameter) => {
    let promise_chain = Q.fcall(() => {});

    const successCallback = queueParameter.successCallback;
    const failureCallback = queueParameter.failureCallback;
    const preApiResonse = {};
    const callSequenceLength = queueParameter.callSequence.length - 1;

    const payloadCreator = (apiSet, paramAppend) => {
        const param = {
            contentType: 'application/json',
            method: apiSet.method
        };

        if (apiSet.method.toLowerCase() === 'post') {
            for (const attr in paramAppend) {
                if (paramAppend.hasOwnProperty(attr)) {
                    param.data = {};
                    param.data[apiSet.payload[attr]] = paramAppend[attr];
                }
            }
        }

        return param;
    };

    const requestMethod = (apiSet, payload, callback) => {
        const path = apiSet.endPoint + apiSet.name;

        axios(path, payload).then((data) => {
            if (data.error && apiSet.requiredResponse) {
                failureCallback();
            }
            setTimeout(() => {
                callback(data);
            }, 1000);
        })
        .catch(() => {
            if (apiSet.requiredResponse) {
                failureCallback();
            }
        });
    };

    // loop through a variable length list of things to process
    queueParameter.callSequence.forEach((async_op, index) => {
        const promise_link = function () {
            const deferred = Q.defer();
            const payload = payloadCreator(async_op, preApiResonse[async_op.resultRequest]);

            requestMethod(async_op, payload, (result) => {
                preApiResonse[async_op.name] = result.data;
                /* eslint-disable no-unused-expressions */
                callSequenceLength === index ? successCallback(result.data) : deferred.resolve(result.data);
                /* eslint-enable no-unused-expressions */
            });

            return deferred.promise;
        };

        // add the link onto the chain
        promise_chain = promise_chain.then(promise_link);
    });

    return promise_chain;
};

export default ApiQueue;
