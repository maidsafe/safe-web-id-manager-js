import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

const FormItem = Form.Item;

const defaultId = {
    name     : 'aa',
    nickname : `bb`,
    uri      : 'safe://lalala.bla',
    website  : 'safe://another.bla',
    avatar   : 'pic',
    pk       : ''
};

/**
 * Helper function for ant design forms to populate
 * the form with passed values.
 * @param  {Object} id webId object
 */
const mapPropsToFields = ( { id } ) =>
{
    // if( !id ) return;
    const idToUse = id || defaultId;
    return {
        nickname : Form.createFormField( {
            ...idToUse,
            value : idToUse.nickname || '',
        } ),
        name : Form.createFormField( {
            ...idToUse,
            value : idToUse.name || '',
        } ),
        uri : Form.createFormField( {
            ...idToUse,
            value : idToUse.uri || '',
        } ),
        website : Form.createFormField( {
            ...idToUse,
            value : idToUse.website || '',
        } ),
        avatar : Form.createFormField( {
            ...idToUse,
            value : idToUse.avatar || '',
        } ),
        // pk : Form.createFormField( {
        //     ...id,
        //     value : id.pk || '',
        // } ),
    };
};

/**
 * Form for WebId creation/editing. Uses and design Form components (and form.create() method)
 * to create a form that can be easily validated/populated.
 * @extends React
 */
class IdForm extends React.Component
{
    static propTypes = {
        id : PropTypes.shape( {
            nickname : PropTypes.string,
            name     : PropTypes.string,
            website  : PropTypes.string,
            uri      : PropTypes.string,
            avatar   : PropTypes.string,
            pk       : PropTypes.string
        } ),
        submit : PropTypes.func.isRequired
    }
    static defaultProps = {
        id : defaultId
    }

    handleSubmit = ( e ) =>
    {
        e.preventDefault();

        const { match, submit, idApp } = this.props;

        this.props.form.validateFields( ( err, values ) =>
        {
            if ( !err )
            {
                console.log( 'Received values of form: ', idApp, values );

                submit( { idApp, webId: values } );
            }
        } );
    }


    render = ( ) =>
    {
        const { getFieldDecorator } = this.props.form;

        const { id } = this.props;
        return (
            <Form className="jest-form" layout="vertical" onSubmit={ this.handleSubmit } >
                <FormItem label="nickname" >
                    {getFieldDecorator( 'nickname', {
                        rules : [{ required: true, message: 'Please input a nickname, this will be used to identify this WebId!' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="nickname"
                    /> )}
                </FormItem>
                <FormItem label="name" >
                    {getFieldDecorator( 'name', {
                        rules : [{ required: true, message: 'Please input a webId name!' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Username"
                    /> )}
                </FormItem>
                <FormItem label="uri" >
                    {getFieldDecorator( 'uri', {
                        rules : [],
                    } )( <Input
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="public name (safe://something)"
                    /> )}
                </FormItem>
                <FormItem label="website" >
                    {getFieldDecorator( 'website', {
                        rules : [],
                    } )( <Input
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="public name (safe://something)"
                    /> )}
                </FormItem>
                <FormItem type="input" label="avatar">
                    {getFieldDecorator( 'avatar', {
                        rules : [],
                    } )( <Avatar /> )}
                </FormItem>
                {/* <FormItem label="publickey" >
                    {getFieldDecorator( 'publickey', {
                        rules : [],
                    } )( <Input
                        disabled
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Public Key"
                    /> )}
                </FormItem> */}
                {/* <Form.Item type="input" label="inbox">
                        <Input defaultValue={ id.inbox } />
                    </Form.Item> */}
                <Button
                    htmlType="submit"
                    type="primary"
                >Submit
                </Button>
            </Form>
        );
    }
}

const WrappedIdForm = Form.create( { mapPropsToFields } )( IdForm );

export default WrappedIdForm;
