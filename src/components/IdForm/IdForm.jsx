import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

const FormItem = Form.Item;

const defaultId = {
    name     : '',
    nickname : '',
    uri      : 'safe://',
    website  : 'safe://',
    avatar   : '',
    pk       : ''
};

/**
 * Helper function for ant design forms to populate
 * the form with passed values.
 * @param  {Object} id webId object
 */
const mapPropsToFields = ( { webId } ) =>
{
    // if( !id ) return;
    let idToUse = webId || defaultId;

    idToUse = idToUse['#me'] || idToUse;

    return {
        nick : Form.createFormField( {
            ...idToUse,
            value : idToUse.nick || '',
        } ),
        name : Form.createFormField( {
            ...idToUse,
            value : idToUse.name || '',
        } ),
        uri : Form.createFormField( {
            ...idToUse,
            value : idToUse['@id'] || '',
        } ),
        website : Form.createFormField( {
            ...idToUse,
            value : idToUse.website || '',
        } ),
        image : Form.createFormField( {
            ...idToUse,
            value : idToUse.image || '',
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
        webId : PropTypes.shape( {
            nick    : PropTypes.string,
            name    : PropTypes.string,
            website : PropTypes.string,
            uri     : PropTypes.string,
            image   : PropTypes.string,
            pk      : PropTypes.string
        } ),
        submit : PropTypes.func.isRequired
    }
    static defaultProps = {
        webId : defaultId
    }

    handleSubmit = ( e ) =>
    {
        e.preventDefault();

        const {
            match, submit, idApp, history, webId
        } = this.props;

        const imgBase64 = this.theAvatar.state.imageUrl;

        this.props.form.validateFields( ( err, values ) =>
        {
            if ( !err )
            {
                let image = imgBase64;

                if ( !image && webId && webId['#me'] )
                {
                    image = webId['#me'].image;
                }

                const webIdWithImageAndUpdates = { ...webId, ...values, image };
                console.log( 'Updating with', webIdWithImageAndUpdates, imgBase64, webId );

                // history to move us on a page when successful
                submit( { idApp, webId: webIdWithImageAndUpdates, history } );

                // this.setState({created: true })
            }
        } );
    }


    render = ( ) =>
    {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form className="jest-form" layout="vertical" onSubmit={ this.handleSubmit } >
                <FormItem label="nickname" >
                    {getFieldDecorator( 'nick', {
                        rules : [{ required: true, message: 'Please input a nickname, this will be used to entify this WebId!' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="nickname"
                    /> )}
                </FormItem>
                <FormItem label="name" >
                    {getFieldDecorator( 'name', {
                        rules : [{ required: true, message: 'Please input a webId name.' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Username"
                    /> )}
                </FormItem>
                <FormItem label="uri" >
                    {getFieldDecorator( 'uri', {
                        rules : [{ required: true, message: 'publicId location for this webId.' }],
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
                    {getFieldDecorator( 'image', {
                        rules : [],
                    } )( <Avatar ref={ ( c ) =>
                    {
                        this.theAvatar = c;
                    } }
                    /> )}
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
