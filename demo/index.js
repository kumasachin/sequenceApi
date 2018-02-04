import React from 'react';
import CwaCoreLibrary from './CwaCoreLibrary';

const render = (Component) => {
    React.render(
        <Component />,
        document.getElementById('root')
    );
};

render(CwaCoreLibrary);
