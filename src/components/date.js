/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import {Component, PropTypes, createElement} from 'react';
import {intlShape, dateTimeFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedDate extends Component {
    constructor(props, context) {
        super(props, context);
        invariantIntlContext(context);
    }

    shouldComponentUpdate(...next) {
        return shouldIntlComponentUpdate(this, ...next);
    }

    render() {
        const {formatDate}      = this.context.intl;
        const {value,
            children,
            tagName,
            tagProps,
        } = this.props;

        let formattedDate = formatDate(value, this.props);

        if (typeof children === 'function') {
            return children(formattedDate);
        }

        return createElement(tagName, tagProps, formattedDate);

    }
}

FormattedDate.displayName = 'FormattedDate';

FormattedDate.contextTypes = {
    intl: intlShape,
};

FormattedDate.propTypes = {
    ...dateTimeFormatPropTypes,
    children: PropTypes.func,
    format  : PropTypes.string,
    tagName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.elementType
    ]),
    tagProps: PropTypes.object,
    value   : PropTypes.any.isRequired,
};

FormattedDate.defaultProps = {
    tagName: 'span',
    tagProps: null,
};
