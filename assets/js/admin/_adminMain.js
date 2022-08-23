/*
 * Welcome to your _shopMain JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

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

import "bootstrap-fileinput/js/plugins/piexif.min.js";
import Sortable from 'bootstrap-fileinput/js/plugins/sortable.min.js';
import "bootstrap-fileinput/js/fileinput.min.js";
import "bootstrap-fileinput/themes/fas/theme.min.js";
import "bootstrap-fileinput/js/locales/de.js";

// Bootstrap-fileinput
var uploadFileInput = require('./uploadFileInput.init.js');

// Tablesorter
import 'tablesorter/dist/js/jquery.tablesorter.js';
import 'tablesorter/dist/js/jquery.tablesorter.widgets.js';

// Multiselect
import 'multiselect/js/jquery.multi-select.js';

// TinyMce
var tinyMce = require('./tinyMce.init.js');

// Star Rating
import 'star-rating-svg2/src/css/star-rating-svg.css';
import 'star-rating-svg2/src/jquery.star-rating-svg.js';

// Devextreme
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/js/dx.all.js';

// Swiper
import Swiper from 'swiper';

// Globalize
window.bootstrap = bootstrap;
window.Sortable = Sortable;
window.tinyMce = tinyMce;
window.uploadFileInput = uploadFileInput;
window.Swiper = Swiper;

// MODS ROOT
import './sidebar.init.js';
import './input.init.js';
import './list-filter.js';
import './list-result.js';
import './list-paginator.js';

// MODS Shop
import './user-detail.js';
import './coupon-detail.js';
import './order-list.js';
import './order-detail.js';
import './bookKeeping.js';
import './marketing.js';

// MODS Katalog
let articleBasicValidator = null;
let articleLanguageValidator = null;
let articleVariantValidator = null;

import './article-list.js';
import './article-detail.js';
import './article-detail-basic.js';
import './article-detail-language.js';
import './article-detail-variantlist.js';
import './article-detail-variant.js';
import './article-detail-media.js';
import './variant-detail.js';
import './article-stock.js';
import './tag-detail.js';
import './benefit-detail.js';
import './learning-detail.js';
import './howto-detail.js';
import './dosage-detail.js';
import './articleFaq-detail.js';
import './articleVote-detail.js';

// MODS CMS
import './banner-detail.js';
import './highlight-detail.js';
import './staticPage-detail.js';
import './blog-detail.js';
import './setting.js';