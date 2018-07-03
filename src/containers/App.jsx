import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as webIdsActions from '../actions/webIds_actions';
import * as safeActions from '../actions/safe_actions';

import styles from './global.css';
import Header from '../components/Header/Header';
import Editor from '../components/Editor/Editor';
import List from '../components/List/List';

import IdForm from '../components/IdForm/IdForm';

import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

class App extends React.Component
{
    componentDidMount = () =>
    {
        const { safeAuthorise } = this.props;

        safeAuthorise();
    }

    render = () =>
    {
        const {
            webIds
            // , match
            , addWebId
            , getAvailableWebIds
            , updateWebId
            , safe
        } = this.props;

        return (
            <div style={ {
                maxWidth : '800px',
                display  : 'block',
                margin   : '0 auto'
            } }
            >
                <Row
                    gutter={ {
                        xs : 8, sm : 16, md : 24, lg : 32
                    } }
                    type="flex"
                    justify="center"
                >
                    <Col span={ 24 }>
                        <Layout className={ styles.appContainer }>
                            <Route path="/" component={ Header } />
                            <Content>

                                <Switch>
                                    <Route
                                        path="/list"
                                        render={ () =>
                                            <List webIds={ webIds } getAvailableWebIds={ getAvailableWebIds } idApp={ safe.idApp } /> }
                                    />
                                    <Route path="/edit" render={ ( props ) => <Editor webIds={ webIds } { ...props } updateWebId={ updateWebId } /> } />
                                    <Route path="/create/new" render={ props => <IdForm submit={ addWebId } idApp={ safe.idApp } { ...props }  /> } />
                                    <Route path="/" render={ () => <Redirect to="/list" /> } />
                                </Switch>
                            </Content>
                        </Layout>

                    </Col>
                </Row>

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
