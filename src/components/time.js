/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {Component, PropTypes, createElement} from 'react';
import {intlShape, dateTimeFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedTime extends Component {
    constructor(props, context) {
        super(props, context);
        invariantIntlContext(context);
    }

    shouldComponentUpdate(...next) {
        return shouldIntlComponentUpdate(this, ...next);
    }

    render() {
        const {formatTime}      = this.context.intl;
        const {value,
            children,
            tagName,
            tagProps,
            } = this.props;

        let formattedTime = formatTime(value, this.props);

        if (typeof children === 'function') {
            return children(formattedTime);
        }

        return createElement(tagName, tagProps, formattedTime);
    }
}

FormattedTime.displayName = 'FormattedTime';

FormattedTime.contextTypes = {
    intl: intlShape,
};

FormattedTime.propTypes = {
    ...dateTimeFormatPropTypes,
    value   : PropTypes.any.isRequired,
    tagName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.elementType
    ]),
    tagProps: PropTypes.object,
    format  : PropTypes.string,
    children: PropTypes.func,
};

FormattedTime.defaultProps = {
    tagName: 'span',
    tagProps: null,
};
