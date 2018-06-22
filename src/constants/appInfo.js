import pkg from '../../package.json';

export const APP_INFO = {
    info : {
        id     : pkg.identifier,
        scope  : null,
        name   : pkg.productName,
        vendor : pkg.author.name
    },
    opts : {
        own_container : true,
    },
    permissions : {
        _public      : ['Read', 'Insert', 'Update', 'Delete'],
        _publicNames : ['Read', 'Insert', 'Update', 'Delete']
    },
};

// export default APP_INFO;
