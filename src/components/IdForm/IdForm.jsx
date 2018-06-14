import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Avatar from '../Avatar/Avatar';

const FormItem = Form.Item;

/**
 * Helper function for ant design forms to populate
 * the form with passed values.
 * @param  {Object} id webId object
 */
const mapPropsToFields = ( { id } ) => {
    if( !id ) return;

    return {
        name : Form.createFormField( {
            ...id,
            value : id.name || '',
        } ),
        website : Form.createFormField( {
            ...id,
            value : id.website || '',
        } ),
        avatar : Form.createFormField( {
            ...id,
            value : id.avatar || '',
        } ),
        pk : Form.createFormField( {
            ...id,
            value : id.pk || '',
        } ),
    }
} ;

/**
 * Form for WebId creation/editing. Uses and design Form components (and form.create() method)
 * to create a form that can be easily validated/populated.
 * @extends React
 */
class IdForm extends React.Component
{
    static propTypes = {
        id : PropTypes.shape( {
            name    : PropTypes.string,
            website : PropTypes.string,
            avatar  : PropTypes.string,
            pk      : PropTypes.string
        } ),
        submit : PropTypes.func
    }
    static defaultProps = {
        id : {
            name    : '',
            website : '',
            avatar  : '',
            pk      : ''
        },
        submit : ( values ) => console.log( 'Submisssion', values )
    }

    handleSubmit = ( e ) =>
    {
        e.preventDefault();
        this.props.form.validateFields( ( err, values ) =>
        {
            if ( !err )
            {
                console.log( 'Received values of form: ', values );
            }
        } );
    }


    render = ( ) =>
    {
        const { getFieldDecorator } = this.props.form;

        const { id, submit } = this.props;
        return (
            <Form layout="vertical" onSubmit={ this.handleSubmit } >
                <FormItem label="name" >
                    {getFieldDecorator( 'name', {
                        rules : [{ required: true, message: 'Please input a webId name!' }],
                    } )( <Input
                        // and icons removed as attempts to access a font online
                        // prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Username"
                    /> )}
                </FormItem>
                <FormItem label="website" >
                    {getFieldDecorator( 'website', {
                        rules : [],
                    } )( <Input
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Website"
                    /> )}
                </FormItem>
                <FormItem type="input" label="avatar">
                    {getFieldDecorator( 'Avatar', {
                        rules : [],
                    } )( <Avatar /> )}
                </FormItem>
                <FormItem label="publickey" >
                    {getFieldDecorator( 'publickey', {
                        rules : [],
                    } )( <Input
                        disabled
                        // prefix={ <Icon type="link" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder="Public Key"
                    /> )}
                </FormItem>
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
