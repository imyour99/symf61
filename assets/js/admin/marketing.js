jQuery(document).ready(function () {
    
    if(jQuery('body.marketing.filter').find('.list-form-filter').length > 0) {
        prepareMarketingForm();
        initMarketingForm();
        initMarketingFilter();
    }
    
    if(jQuery('body.marketing').find('.dx-viewport').length > 0) {
        initChartOrder();
        initChartPayment();
        initSwiperArticleVariant();
        initChartArticleVariant();
        initSwiperArticle();
        initChartArticle();
        initSwiperArticleGrouped();
        initChartArticleGrouped();
        initChartCustomer();
        initChartCounter();
        initChartBuyType();
        initChartOrderType();
        initChartAvgMulti();
        initChartAvgBasket();
        initChartCounterShip();
        initChartSumShip();
        initChartTotal();
        initSwiperDiscount();
        initChartDiscount();
    }
    
});

var marketingFilter = null;

prepareMarketingForm = function() {
    
    jQuery('#input_shop').prop('required',true);
    jQuery('#input_dateFrom').prop('required',true);
    jQuery('#input_dateTill').prop('required',true);
    
};

initMarketingForm = function() {
    
    marketingFilter = jQuery('#list-form-filter-accordion').validator({ 
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }      
    });
    
};

initMarketingFilter = function() {
    
  jQuery("#toogleListFilter" ).trigger( "click" );
  
};

initChartOrder = function() {
  
    var id = "#chart_order";
    jQuery(id).dxChart({
        dataSource: jQuery(id).data("source"), 
        palette: "soft",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        commonSeriesSettings: {
            type: "bar",
            valueField: "qty",
            argumentField: "status",
            ignoreEmptyPoints: true,
            label: {
                visible: true
            }
        }, 
        seriesTemplate: {
            nameField: "status"
        }, 
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text: 'Buchungen [' + arg.seriesName + ']: ' + arg.valueText
                };
            }
        }
    });
    
};

initChartPayment = function() {

    var id = "#chart_payment";
    jQuery(id).dxPieChart({
        palette: "bright",
        dataSource: jQuery(id).data("source"),
        series: [
            {
                argumentField: "payment",
                valueField: "qty",
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1
                    }
                }
            }
        ],
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        },
        onPointClick: function (e) {
            var point = e.target;
            toggleVisibilityItem(point);
        },
        onLegendClick: function (e) {
            var arg = e.target;
            toggleVisibilityItem(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        }
    });
    
};


initSwiperArticleVariant = function() {
    
    new Swiper('#swiper_articleVariants', {
        effect: 'fade',
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    
};

initChartArticleVariant = function() {
    
    jQuery("#swiper_articleVariants .chartArticleVariants").each(function() {
        
        var id = '#' +jQuery(this).attr("id");
        var label = jQuery(id).data("label");
        
        jQuery(id).dxChart({
            dataSource: jQuery(id).data("source"),
            commonSeriesSettings: {
                argumentField: "variant",
                type: "stackedBar"
            },
            series: [
                { valueField: "singleQty", name: label['singleQty'], color: "#2dc5d4" },
                //{ valueField: "bundleQty", name: label['bundleQty'], color: "#3195c3" },
                { valueField: "stornoQty", name: label['stornoQty'], color: "#b51e1a" },
                { valueField: "sellQty",   name: label['sellQty'], color: "#004872", type: "spline"}
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: 'top'
            },
            argumentAxis: {
                label: {
                    displayMode: "stagger"
                }
            },
            valueAxis: [{
                title: {
                    text: label['axis']
                },
                grid: {
                    visible: true
                }
            }],
            title: {
                text: jQuery(id).data("text"),
                subtitle: jQuery(id).data("subtitle")
            },
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    
                    return {
                        text: arg.seriesName + " " + label['axis'] + ": " + arg.valueText
                    };
                }
            },
        });
         
    });
    
};

initSwiperArticleGrouped = function(){
    
    new Swiper('#swiper_articleVariantsGrouped-1, #swiper_articleVariantsGrouped-2, #swiper_articleVariantsGrouped-3, #swiper_articleVariantsGrouped-4, #swiper_articleVariantsGrouped-5, #swiper_articleVariantsGrouped-6', {
        effect: 'fade',
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    
};
  
initChartArticleGrouped = function(){
    
    var idString = '#swiper_articleVariantsGrouped-1 .chartArticleVariantsGrouped, #swiper_articleVariantsGrouped-2 .chartArticleVariantsGrouped, #swiper_articleVariantsGrouped-3 .chartArticleVariantsGrouped,';
    idString += '#swiper_articleVariantsGrouped-4 .chartArticleVariantsGrouped, #swiper_articleVariantsGrouped-5 .chartArticleVariantsGrouped, #swiper_articleVariantsGrouped-6 .chartArticleVariantsGrouped';
         
    jQuery(idString).each(function() {
        
        var id = '#' +jQuery(this).attr("id");
        var label = jQuery(id).data("label");
        var palette = jQuery(id).data("palette");
               
        jQuery(id).dxChart({
            dataSource: jQuery(id).data("source"),
            commonSeriesSettings: {
                argumentField: "variant",
                type: "stackedBar"
            },
            series: [
                { valueField: "singleQty", name: label['singleQty'], color: palette['singleQtyColor'] },
                { valueField: "bundleQty", name: label['bundleQty'], color: palette['bundleQtyColor'] },
                { valueField: "sellQty",   name: label['sellQty'], color: palette['sellQtyColor'], type: "spline"}
            ],
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center",
                itemTextPosition: 'top'
            },
            argumentAxis: {
                label: {
                    displayMode: "stagger"
                }
            },
            valueAxis: [{
                title: {
                    text: label['axis']
                },
                grid: {
                    visible: true
                }
            }],
            title: {
                text: jQuery(id).data("text"),
                subtitle: jQuery(id).data("subtitle")
            },
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    
                    return {
                        text: arg.seriesName + " " + label['axis'] + ": " + arg.valueText
                    };
                }
            },
        });
         
    });
    
};
        

initSwiperArticle = function() {
    
    new Swiper('#swiper_articles', {
        effect: 'fade',
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
};

initChartArticle = function() {
  
    jQuery("#swiper_articles .chartArticles").each(function() {
        
        var id = '#' +jQuery(this).attr("id");
        
        jQuery(id).dxChart({
            dataSource: jQuery(id).data("source"), 
            palette: "material",
            title: {
                text: jQuery(id).data("text"),
                subtitle: jQuery(id).data("subtitle")
            }, 
            commonSeriesSettings: {
                type: "bar",
                valueField: "qty",
                argumentField: "title",
                ignoreEmptyPoints: true,
                label: {
                    visible: true
                }
            }, 
            argumentAxis: {
                label: {
                    displayMode: "stagger"
                }
            },
            seriesTemplate: {
                nameField: "title"
            }, 
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    return {
                        text: arg.seriesName
                    };
                }
            }
        });
    
    });
    
};

initChartCustomer = function() {
    
    var id = "#chart_customer";  
    jQuery(id).dxChart({
        palette: "Dark Moon",
        dataSource: jQuery(id).data("source"),
        commonSeriesSettings: {
            ignoreEmptyPoints: true,
            argumentField: "title",
            type: "bar",
            label: {
                visible: true
            },
        },
        series: jQuery(id).data("series"),
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        },
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};


initChartCounter = function() {
    
    var id = "#chart_counter";
    jQuery(id).dxChart({
        dataSource: jQuery(id).data("source"), 
        palette: "Vintage",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        commonSeriesSettings: {
            type: "bar",
            valueField: "qty",
            argumentField: "title",
            ignoreEmptyPoints: true,
            label: {
                visible: true
            },
        }, 
        seriesTemplate: {
            nameField: "title"
        }, 
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};

initChartBuyType = function() {
    
    var id = "#chart_buyType";
    jQuery(id).dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        dataSource: jQuery(id).data("source"), 
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "bottom"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 3
            },        
            argumentField: "title",
            valueField: "qty",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                    return point.argumentText + ": " + point.valueText + "%";
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
    
};

initChartOrderType = function() {
    
    var id = "#chart_orderType";
    jQuery(id).dxPieChart({
        type: "doughnut",
        palette: "Soft Blue",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        dataSource: jQuery(id).data("source"), 
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "bottom"
        },
        series: [{
            smallValuesGrouping: {
                mode: "topN",
                topCount: 3
            },        
            argumentField: "title",
            valueField: "qty",
            label: {
                visible: true,
                format: "fixedPoint",
                customizeText: function (point) {
                    return point.argumentText + ": " + point.valueText + "%";
                },
                connector: {
                    visible: true,
                    width: 1
                }
            }
        }]
    });
};

initChartAvgMulti = function() {
  
    var id = "#chart_avgMulti";  
    jQuery(id).dxChart({
        dataSource: jQuery(id).data("source"), 
        palette: "Green Mist",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        commonSeriesSettings: {
            type: "bar",
            valueField: "qty",
            argumentField: "title",
            ignoreEmptyPoints: true,
            label: {
                visible: true
            },
        }, 
        seriesTemplate: {
            nameField: "title"
        }, 
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};

initChartAvgBasket = function() {
    
    var id = "#chart_avgBasket";
    jQuery(id).dxChart({
        palette: "Dark Violet",
        dataSource: jQuery(id).data("source"),
        commonSeriesSettings: {
            ignoreEmptyPoints: true,
            argumentField: "title",
            type: "bar",
            label: {
                visible: true
            },
        },
        series: jQuery(id).data("series"),
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        argumentAxis: {
            label: {
                displayMode: "stagger"
            }
        },
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        },
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};

initChartCounterShip = function () {
    
    var id = "#chart_counterShip";  
    jQuery(id).dxChart({
        dataSource: jQuery(id).data("source"), 
        palette: "Carmine",
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        }, 
        commonSeriesSettings: {
            type: "bar",
            valueField: "qty",
            argumentField: "title",
            ignoreEmptyPoints: true,
            label: {
                visible: true
            },
        }, 
        seriesTemplate: {
            nameField: "title"
        }, 
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};

initChartSumShip = function() {
    
    var id = "#chart_sumShipping";
    jQuery(id).dxChart({
        palette: "Violet",
        dataSource: jQuery(id).data("source"),
        commonSeriesSettings: {
            ignoreEmptyPoints: true,
            argumentField: "title",
            type: "bar",
            label: {
                visible: true
            },
        },
        series: jQuery(id).data("series"),
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        argumentAxis: {
            label: {
                displayMode: "stagger"
            }
        },
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        },
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
    
};

initChartTotal = function() {
  
    var id = "#chart_total";
    jQuery(id).dxChart({
        palette: "Office",
        dataSource: jQuery(id).data("source"),
        commonSeriesSettings: {
            ignoreEmptyPoints: true,
            argumentField: "title",
            type: "bar",
            label: {
                visible: true
            },
        },
        series: jQuery(id).data("series"),
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        argumentAxis: {
            label: {
                displayMode: "stagger"
            }
        },
        title: {
            text: jQuery(id).data("text"),
            subtitle: jQuery(id).data("subtitle")
        },
        tooltip: {
            enabled: true,
            location: "edge",
            customizeTooltip: function (arg) {
                return {
                    text:  arg.seriesName + ': ' + arg.valueText
                };
            }
        }
    });
};

initSwiperDiscount = function() {
    
    new Swiper('#swiper_discounts', {
        effect: 'fade',
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    
};

initChartDiscount = function() {
    
    jQuery("#swiper_discounts .chartDiscounts").each(function() {
        
        var id = '#' +jQuery(this).attr("id");
        
        jQuery(id).dxChart({
            dataSource: jQuery(id).data("source"), 
            palette: "Harmony Light",
            title: {
                text: jQuery(id).data("text"),
                subtitle: jQuery(id).data("subtitle")
            }, 
            commonSeriesSettings: {
                type: "bar",
                valueField: "qty",
                argumentField: "title",
                ignoreEmptyPoints: true,
                label: {
                    visible: true
                }
            }, 
            argumentAxis: {
                label: {
                    displayMode: "stagger"
                }
            },
            seriesTemplate: {
                nameField: "title"
            }, 
            tooltip: {
                enabled: true,
                location: "edge",
                customizeTooltip: function (arg) {
                    return {
                        text: arg.seriesName
                    };
                }
            }
        });
    
    });
    
};

toggleVisibilityItem = function(item) {
    if(item.isVisible()) {
        item.hide();
    } else { 
        item.show();
    }
};