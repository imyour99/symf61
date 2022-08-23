
// JQUERY
import '../jquery/jquery.init.js';
import 'jquery-ui/ui/core.js';
import 'jquery-ui/ui/widget.js';

// Datetimepicker
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js';
import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css';

// Bootstrap
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-validator/dist/validator.min.js';

// Globalize
window.bootstrap = bootstrap;

require('./checkOut.start.js');
require('./checkOut.address.js');
require('./checkOut.root.js');
require('./checkOut.payment.js');
require('./checkOut-overview.js');
require('./checkOut-stripe.js');
require('./checkOut-paypal.js');
require('../public/gtm.tracking.js');