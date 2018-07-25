import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, List, Button, Avatar } from 'antd';
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
        if ( !idApp && newProps.idApp )
        {
            this.getIds( newProps.idApp );
        }
    }


    getIds = ( passedIdApp ) =>
    {
        const { getAvailableWebIds, idApp } = this.props;

        const appToUse = passedIdApp || idApp;

        if ( appToUse )
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
        const { idApp, webIds, history } = this.props;

        // TODO: Make real loading state.
        const isLoading = !idApp;

        const createNewWebId = () =>
        {
            history.push( PATHS.CREATE )
        }
        //
        // if ( !isLoading && webIds.length === 0 )
        // {
        //     return ( <Button
        //         onClick={ createNewWebId }
        //         htmlType="submit"
        //         type="primary"
        //     >Create a WebId
        //     </Button> );
        // }

        const IdList = webIds.map( ( webId, i ) =>
        {
            const nickname = webId.nick;
            const uri = webId.uri;
            const image = webId.image;
            const safeUri = `safe://${uri}`;
            return (
                <List.Item
                    key={ i }
                    actions={ [<Link to={ `${PATHS.EDIT}/${nickname}` }>edit</Link>] }
                >
                    <List.Item.Meta
                        avatar={ image ?
                          <Avatar src={image} />
                          :
                          <Avatar style={{ backgroundColor: 'gray', verticalAlign: 'middle' }} >
                            {nickname ? nickname.substring(0, 1).toUpperCase() : ''}
                          </Avatar>
                        }
                        title={ nickname }
                        description={
                          <a target="_blank" style={{ color: 'MidnightBlue' }} href={safeUri}>{safeUri}</a>
                        }
                    />
                </List.Item>
            );
        } );

        return (
            <div>
                <h2>Your Current WebIds:</h2>
                <Button
                    style={ { marginBottom: '20px'}}
                    onClick={ createNewWebId }
                    htmlType="submit"
                    type="primary"
                >Create new WebId Profile
                </Button>
                <List
                    loading={ isLoading }
                >
                    {IdList}
                </List>
            </div>
        );
    }
}

export default IdList;
