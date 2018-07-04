import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, List, Button } from 'antd';
import { PATHS } from '../../constants';

class IdList extends React.Component
{
    static defaultProps = {
        webIds : []
    }

    componentDidMount = () =>
    {
        this.getIds();
    }

    componentWillReceiveProps = ( newProps ) =>
    {
        const { idApp } = this.props;

        // didnt have app, but now we doooo....
        if( !idApp && newProps.idApp )
        {
            this.getIds( newProps.idApp );
        }
    }


    getIds = ( passedIdApp ) =>
    {
        const { getAvailableWebIds, idApp } = this.props;

        const appToUse = passedIdApp || idApp;

        if( appToUse )
        {
            getAvailableWebIds( { idApp: appToUse } );
        }
    }


    handleGetIds = ( newProps ) =>
    {
        this.getIds();
    }

    render = () =>
    {
        const { webIds } = this.props;

        return (
            <div>
                <h2>Your Current WebIds:</h2>
                <Button
                    onClick={ this.handleGetIds }
                    htmlType="submit"
                    type="primary"
                >Update
                </Button>
                <List>
                    { webIds.map( ( webId, i ) => (
                        <List.Item key={ i }>
                        <div style={{marginRight: '1rem'}}>{`${webId.title}`}</div><Link to={ `${PATHS.EDIT}/${webId.title}` }>edit</Link>
                        </List.Item>
                    ) )}
                </List>
            </div>
        );
    }
}

export default IdList;
