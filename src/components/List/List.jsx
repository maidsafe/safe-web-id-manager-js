import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, List } from 'antd';
import { PATHS } from '../../constants';

const IdList = ( props ) => (
    <div>
        <h2>Your Current WebIds:</h2>
        <List>
            { props.webIds.map( ( webId, i ) => (
                <List.Item key={ i }>
                    <Link to={ `${PATHS.EDIT}/${webId.name}` }>{webId.name}</Link>
                </List.Item>
            ) )}
        </List>
    </div>
);

export default IdList;
