import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, List, Button } from 'antd';
import { PATHS } from '../../constants';

class IdList extends React.Component
{
    static defaultProps = {
        webIds : []
    }

    handleGetIds = ( newProps ) =>
    {
        console.log('update Ids was clicked.')
        const { getAvailableWebIds, idApp } = this.props;

        if( idApp )
        {
            getAvailableWebIds( { idApp } );
        }
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
                            <Link to={ `${PATHS.EDIT}/${webId.name}` }>{webId.title}</Link>
                        </List.Item>
                    ) )}
                </List>
            </div>
        );
    }
}

export default IdList;
