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
        const { match, idApp, updateWebId, webIds} = this.props;

        // const nickname = webId["#me"].nick || webId["#me"].name;

        const webId = webIds.find( id => id["#me"].nick === match.params.nickname );

        console.log('EDITOR WEBIDDDDD', webId)

        // if( !this.doneTheThing )
        // {
        //     // const id = this.getFullWebId( webId );
        //     // this.doneTheThing = true;
        // }

        // if theres no complete webId.... defined by... `name?`
        // then trigger get...?
        // but not on each... on getProps...
        return (
            <div className="wrapper">
                <h2>{ `Editing`}</h2>
                <IdForm
                    // { ...props }
                    submit={ updateWebId }
                    idApp={ idApp }
                    webId={ webId }
                />
            </div>
        );
    }
}
