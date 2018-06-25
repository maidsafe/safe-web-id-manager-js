import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import IdForm from '../IdForm/IdForm';


export default class Editor extends React.Component
{
    static propTypes =
    {
        webIds : PropTypes.arrayOf( PropTypes.object ),
        match  : PropTypes.shape( { url: PropTypes.string } ).isRequired,
        updateWebId : PropTypes.func.isRequired
    }

    static defaultProps =
    {
        webIds : []
    }

    render()
    {
        const { match, webIds, updateWebId } = this.props;

        return (
            <div className="wrapper">
                <Switch>
                    <Route
                        path={ `${match.url}/:name` }
                        render={ ( props ) =>
                            ( <IdForm
                                { ...props }
                                submit={ updateWebId }
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
