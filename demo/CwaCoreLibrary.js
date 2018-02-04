import React from 'react';
import ApiQueue from '../src/components/ApiQueue';

class CwaCoreLibrary extends React.Component {
    apiQueueCreate () {
        return ApiQueue(
            {
                callSequence: [{
                    name: 'identity_assertion',
                    endPoint: 'http://localhost:5000/',
                    requiredResponse: true,
                    method: 'GET'
                }, {
                    name: 'version',
                    endPoint: 'http://localhost:5000/',
                    requiredResponse: false,
                    method: 'GET'
                }, {
                    name: 'tokenverification',
                    endPoint: 'http://localhost:5000/',
                    requiredResponse: true,
                    method: 'POST',
                    payload: {samlToken: 'token'},
                    resultRequest: 'identity_assertion'
                }, {
                    name: 'user-info',
                    endPoint: 'http://localhost:5000/',
                    requiredResponse: true,
                    method: 'GET'
                }],
                successCallback: () => {
                    /* eslint-disable no-console */
                    console.log('success');
                    /* eslint-enable no-console */
                },
                failureCallback: () => {
                    /* eslint-disable no-console */
                    console.log('failure');
                    /* eslint-enable no-console */
                }
            }
        );
    }
    render () {
        this.apiQueueCreate();

        return (
            <div>SSO session setup</div>
        );
    }
}

export default CwaCoreLibrary;
