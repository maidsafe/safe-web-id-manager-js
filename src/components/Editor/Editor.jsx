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
        getWebId    : PropTypes.func.isRequired,
        updateWebId : PropTypes.func.isRequired
    }

    static defaultProps =
    {
        webIds : []
    }

    // componentDidMount = () =>
    // {
    //     this.getWebId();
    // }
    //
    // componentWillReceiveProps = ( newProps ) =>
    // {
    //     const { idApp } = this.props;
    //
    //     // didnt have app, but now we doooo....
    //     if( !idApp && newProps.idApp )
    //     {
    //         this.getWebId( { idApp: newProps.idApp, title: } );
    //     }
    // }
    //
    // shouldComponentUpdate = ( newProps ) =>
    // {
    //     console.log('new proppps', newProps)
    //     const { webIds } = this.props;
    //     const newWebIds = newProps.webIds;
    //
    //     return webIds !== newWebIds;
    // }


    getFullWebId = ( webId ) =>
    {
        const {
            getWebId,
            idApp,
        } = this.props;


        // name here used to decide if it's been fetched....
        if ( idApp )
        // if ( !webId.name && idApp )
        {
            getWebId( { idApp, webId } );
        }

        return webId;
    }


    render()
    {
        const { match, updateWebId, webIds} = this.props;


        const webId = webIds.find( id => id.title === match.params.title );

        if( !this.doneTheThing )
        {
            const id = this.getFullWebId( webId );
            this.doneTheThing = true;
        }


        // if theres no complete webId.... defined by... `name?`
        // then trigger get...?
        // but not on each... on getProps...
        return (
            <div className="wrapper">
                <h2>{ `Editing`}</h2>
                <IdForm
                    // { ...props }
                    submit={ updateWebId }

                    id={  {} }
                />
            </div>
        );
    }
}
