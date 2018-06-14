import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import IdForm from '../IdForm/IdForm';
// {
//     name: 'Josh1',
//     img : 'base6444',
//     inbox: {},
//     website: 'safe://some.tester',
//     pk : {}
// }


export default class Editor extends React.Component
{
    static propTypes =
    {
        webIds : PropTypes.arrayOf( PropTypes.object ),
        match  : PropTypes.shape( { url: PropTypes.string } ).isRequired
    }

    static defaultProps =
    {
        webIds : []
    }

    render()
    {
        const { match, webIds } = this.props;
        console.log( '>>>>>>>>>', this.props );
        return (
            <div className="wrapper">
                <Switch>
                    <Route
                        path={ `${match.url}/:name` }
                        render={ ( props ) =>
                            ( <IdForm
                                { ...props }
                                id={ webIds.find( id => id.name === props.match.params.name ) }
                            /> )
                        }
                    />
                    <Route path={ `${match.url}` } render={ () => <h1>Select a profile to edit</h1> } />
                </Switch>
            </div>
        );
    }
}
