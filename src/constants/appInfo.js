import pkg from '../../package.json';

const APP_INFO = {
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
    },
};

export default APP_INFO;
