import React from 'react';
import { object } from 'prop-types';

//HOC - Redux
const withReducer = (key, reducer) => WrappedComponent => {
    const Extended = (props, context) => {
        context.store.injectReducer(key, reducer);

        return <WrappedComponent {...props} />
    }

    Extended.contextTypes = {
        store: object
    };

    return Extended;
};

export default withReducer;

//export default withReducer('apiData', reducer)(ScreenName);