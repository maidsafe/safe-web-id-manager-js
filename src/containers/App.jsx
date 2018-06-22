import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as webIdsActions from '../actions/webIds_actions';
import * as safeActions from '../actions/safe_actions';

import styles from './global.css';
import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';
import List from '../components/List/List';

import IdForm from '../components/IdForm/IdForm';


class App extends React.Component
{
    componentDidMount = () =>
    {
        const { safeAuthorise } = this.props;

        safeAuthorise();
    }

    render = () =>
    {
        const { webIds, match } = this.props;

        return (

            <div className={ styles.appContainer }>
                <Route path="/" component={ Header } />
                <Switch>
                    <Route path="/list" render={ () => <List webIds={ webIds } /> } />
                    <Route path="/edit" render={ ( props ) => <Editor webIds={ webIds } { ...props } /> } />
                    <Route path="/create/new" component={ IdForm } />
                    <Route path="/" render={ () => <List webIds={ webIds } /> } />
                </Switch>
            </div>
        );
    }
}


function mapDispatchToProps( dispatch )
{
    const actions =
    {
        ...safeActions,
        ...webIdsActions
    };
    return bindActionCreators( actions, dispatch );
}

function mapStateToProps( state )
{
    return {
        webIds : state.webIds,
        safe   : state.safe
    };
}
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
