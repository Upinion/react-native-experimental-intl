/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import PropTypes from 'prop-types';
import {Component, createElement} from 'react';
import {intlShape, pluralFormatPropTypes} from '../types';
import {invariantIntlContext, shouldIntlComponentUpdate} from '../utils';

export default class FormattedPlural extends Component {
    constructor(props, context) {
        super(props, context);
        invariantIntlContext(context);
    }

    shouldComponentUpdate(...next) {
        return shouldIntlComponentUpdate(this, ...next);
    }

    render() {
        const {formatPlural}           = this.context.intl;
        const {value,
            other,
            children,
            tagName,
            tagProps,
        } = this.props;

        let pluralCategory  = formatPlural(value, this.props);
        let formattedPlural = this.props[pluralCategory] || other;

        if (typeof children === 'function') {
            return children(formattedPlural);
        }

        return createElement(tagName, tagProps, formattedPlural);

    }
}

FormattedPlural.displayName = 'FormattedPlural';

FormattedPlural.contextTypes = {
    intl: intlShape,
};

FormattedPlural.propTypes = {
    ...pluralFormatPropTypes,
    value: PropTypes.any.isRequired,

    other: PropTypes.node.isRequired,
    zero : PropTypes.node,
    one  : PropTypes.node,
    two  : PropTypes.node,
    few  : PropTypes.node,
    many : PropTypes.node,

    tagName: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.elementType
    ]),
    tagProps: PropTypes.object,

    children: PropTypes.func,
};

FormattedPlural.defaultProps = {
    style: 'cardinal',
    tagName: 'span',
    tagProps: null,
};
