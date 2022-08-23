
// JQUERY
import '../jquery/jquery.init.js';
import 'jquery-ui/ui/core.js';
import 'jquery-ui/ui/widget.js';
import 'jquery-ui/ui/widgets/mouse.js';
import 'jquery-ui/ui/effect.js';
import 'jquery-ui/ui/effects/effect-slide.js';

// Datetimepicker
import 'jquery-datetimepicker/build/jquery.datetimepicker.full.min.js';
import 'jquery-datetimepicker/build/jquery.datetimepicker.min.css';

// Bootstrap
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-validator/dist/validator.min.js';

// InfiniteAjaxScroll
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

// star-rating-svg2
import 'star-rating-svg2/src/css/star-rating-svg.css';
import 'star-rating-svg2/src/jquery.star-rating-svg.js';

// Globalize
window.bootstrap = bootstrap;
window.InfiniteAjaxScroll = InfiniteAjaxScroll;

// MODS Katalog
let articleDetailRequestValidator = null;
let articleDetailMeetingValidator = null;

// Mods
require('./root.js')
require('./header.standard.js');
require('./footer.standard.js');
require('./modal.shopSwitcher.js');
require('./modal.voteNow.js');
require('./landing.js');
require('./article.list.js');
require('./article.detail.js');
require('./article.carousel.js');
require('./article.bookmark.js');
require('./resizer.js');
require('./gtm.tracking.js');
require('./blog.list.js');
require('./blog.detail.js');
require('./welcome.js');
require('./changePassword.js');
require('./info.js');
require('./newsletter.js');
require('./account.js');
require('./gtm.tracking.js');
require('../checkout/checkOut-stripe.js');