import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

const FormItem = Form.Item;

const uriRegex = '^([-a-z0-9]{3,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z0-9][-a-z0-9]{0,61}[a-z0-9]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';


const defaultId = {
    name    : '',
    nick    : '',
    uri     : '',
    website : '',
    image   : ''
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
            value : idToUse.uri || '',
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

                if ( !image && webId )
                {
                    image = webId.image;
                }

                const webIdWithImageAndUpdates = { ...webId, ...values, image };
                console.log( 'ON CLICK:: Updating with', webIdWithImageAndUpdates, history );

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
                <FormItem label="Nickname (used as webId identifier)" >
                    {getFieldDecorator( 'nick', {
                        rules : [{ required: true, whitespace: true, message: 'Please input a nickname, this will be used to entify this WebId!' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="nickname"
                    /> )}
                </FormItem>
                <FormItem label="Name" >
                    {getFieldDecorator( 'name', {
                        rules : [{ required: true, whitespace: true, message: 'Please input a webId name.' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="full name"
                    /> )}
                </FormItem>
                <FormItem label="Web ID URI (not editable)" >
                    {getFieldDecorator( 'uri', {
                        rules : [
                            { required: true, message: 'publicId location for this webId.' },
                            { pattern: uriRegex, message: 'This must be a valid safe:// url' }],
                    } )( <Input
                        disabled={ !!this.props.webId.uri }
                        addonBefore="safe://"
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="public name"
                    /> )}
                </FormItem>
                <FormItem label="Website" >
                    {getFieldDecorator( 'website', {
                        rules : [{ pattern: uriRegex, message: 'This must be a valid safe:// url' }],
                    } )( <Input
                        addonBefore="safe://"
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="website location"
                    /> )}
                </FormItem>
                <FormItem type="input" label="Image">
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
