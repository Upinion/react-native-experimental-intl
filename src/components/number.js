/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {Component, PropTypes, createElement} from 'react';
import {intlShape, numberFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedNumber extends Component {
    constructor(props, context) {
        super(props, context);
        invariantIntlContext(context);
    }

    shouldComponentUpdate(...next) {
        return shouldIntlComponentUpdate(this, ...next);
    }

    render() {
        const {formatNumber}    = this.context.intl;
        const {value,
            children,
            tagName,
            tagProps,
            } = this.props;

        let formattedNumber = formatNumber(value, this.props);

        if (typeof children === 'function') {
            return children(formattedNumber);
        }

        return createElement(tagName, tagProps, formattedNumber);

    }
}

FormattedNumber.displayName = 'FormattedNumber';

FormattedNumber.contextTypes = {
    intl: intlShape,
};

FormattedNumber.propTypes = {
    ...numberFormatPropTypes,
    value   : PropTypes.any.isRequired,
    format  : PropTypes.string,
    tagName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    tagProps: PropTypes.object,
    children: PropTypes.func,
};

FormattedNumber.defaultProps = {
    tagName: 'span',
    tagProps: null,
};
