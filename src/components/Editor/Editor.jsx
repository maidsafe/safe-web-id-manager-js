import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import IdForm from '../IdForm/IdForm';


export default class Editor extends React.Component
{
    static propTypes =
    {
        webIds      : PropTypes.arrayOf( PropTypes.object ),
        idApp       : PropTypes.shape(),
        match       : PropTypes.shape( { url: PropTypes.string } ).isRequired,
        updateWebId : PropTypes.func.isRequired
    }

    static defaultProps =
    {
        webIds : []
    }

    render()
    {
        const { match, idApp, updateWebId, webIds, history } = this.props;

        if( !match.params ) return <div>noparms</div>


        const webId = webIds.find( id => id.nick === match.params.nickname );

        if( !webId ) return <div>No matching WebId found</div>;

        return (
            <div className="wrapper">
                <h2>{ `Editing`}</h2>
                <IdForm
                    // { ...props }
                    submit={ updateWebId }
                    idApp={ idApp }
                    webId={ webId }
                    history ={ history }
                />
            </div>
        );
    }
}
