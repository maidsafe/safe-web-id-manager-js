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


    getIds = ( ) =>
    {
        const { getAvailableWebIds, idApp } = this.props;

        if( idApp )
        {
            getAvailableWebIds( { idApp } );
        }
    }


    handleGetIds = ( newProps ) =>
    {
        console.log('update Ids was clicked.')
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
                            <Link to={ `${PATHS.EDIT}/${webId.title}` }>{webId.title}</Link>
                        </List.Item>
                    ) )}
                </List>
            </div>
        );
    }
}

export default IdList;
