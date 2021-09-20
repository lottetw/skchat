// console.log = function () { } //disable all console.log


const MENU_H = 50;
const LOADING_DELAY = 500;
const SLIDE_DELAY = 300;
const ROBOT_DEFAULT_KEYWD = "DEFAULT";
const ROBOT_LOADING_KEYWD = "LOADING";
const ROBOT_LOADING_CHANGE_KEYWD = "LOADING CHANGE";
const SWIPER_B_SPACE = 35;
const SWIPER_Fcard_SPACE = 25;
const SWIPER_Fform_SPACE = 60;

const SWIPER_B1_SPACE = 70;
const SWIPER_J2_SPACE = 10;
var sklmsg_current_popup = 'NONE';  //'TOP', 'BOTTOM'
var sklmsg_swiper_mainmenu;
var sklmsg_swiper_cardH;
var sklmsg_data;
var sklmsg_swiper_B2_01;
var sklmsg_swiper_B1_01;
var sklmsg_swiper_B3_01;
var sklmsg_swiper_J2;
var swiper_F1card_01;
var swiper_F1form_01;
var swiper_F2card_01;
var swiper_F2form_01;
var swiper_F3card_01;
var swiper_F3form_01;
var swiper_F4card_01;
var swiper_F4form_01;
var swiper_F5card_01;
var swiper_F5form_01;
var swiper_F6card_01;
var swiper_F6form_01;
var swiper_F7card_01;
var swiper_F7form_01;
var idG4Date = '';
var sklmsg_loadingHtml = "<div >loadingHtml 未匯入</div>";
var sklmsg_defaultHtml = "<div >defaultHtml 未匯入</div>";
var sklmsg_ifLoadingAnim = true;
var $lastMsgBox = null;
var bgOriginalMargin = 0;
var id_vivus_svg = null;
function openMask(popup_pos){
    if (popup_pos == 'TOP'){
        $('header').addClass('mode-popup');
        $('.js-top-toggle').addClass('mode-popup');
        $('.js-mask').addClass('mode-popup');
        sklmsg_current_popup = popup_pos;
        lockBGScroll(true); //鎖住背景不可SCROLL
    } else if (popup_pos == 'BOTTOM') {
        $('footer').addClass('mode-popup');
        $('.js-mask').addClass('mode-popup');
        sklmsg_current_popup = popup_pos;
        lockBGScroll(true); //鎖住背景不可SCROLL
    } else if (popup_pos == 'CENTER') {
        $('.js-popup-sec').addClass('mode-popup');
        $('.js-mask').addClass('mode-popup');
        sklmsg_current_popup = popup_pos;
        lockBGScroll(true); //鎖住背景不可SCROLL
    }
    else{
        console.log('addMask: unknown pos.');
    }
}
function closeMask(popup_pos) {
    if (popup_pos == 'TOP') {
        // 關掉top menu 上方選單
        $('header').removeClass('mode-popup');
        $('.js-top-toggle').removeClass('mode-popup');
        $('.js-mask').removeClass('mode-popup');
        lockBGScroll(false); //解除背景不可SCROLL
    } else if (popup_pos == 'BOTTOM') {
        // 所有bottom版型-G,H,主選單,都在這邊hide跟destroy套件資源
        //step1. slidetoggle
        $('.bottom-page').each(function () {
            if ($(this).is(":visible")){
                $(this).slideToggle(SLIDE_DELAY);
                console.log('close bottom page: ' + $(this).attr('class'));
            }
        });
        destroySwiperInMainManu();
        destroySwiperInCardH();
        // step2. 等SLIDE_DELAY時間結束, 才關掉 footer，才看得到slide效果 
        setTimeout(
            function () {
                //do something special
                $('footer').removeClass('mode-popup');
                $('.js-mask').removeClass('mode-popup');
                lockBGScroll(false); //解除背景不可SCROLL
            }, SLIDE_DELAY
        );
        
    } else if (popup_pos == 'CENTER') {
        $('.popup-sec').removeClass('mode-popup');
        //所有popup版型-E,都在這邊hide
        $('.popup-sec .popup-page').hide();
        $('.js-mask').removeClass('mode-popup');
        lockBGScroll(false); //鎖住背景不可SCROLL
    }
    else {
        console.log('closeMask: unknown pos.');
    }
}
function lockBGScroll(iflock){
    if (iflock){
        $('.mask, body, main-wrapper').addClass('lock-scroll');
    }else{
        $('.mask, body, main-wrapper').removeClass('lock-scroll');
    }
}

function newSwiperInMainManu() {
    sklmsg_swiper_mainmenu = new Swiper('.swiper-container.mainmenu-swiper', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 1000,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    console.log('newSwiperInMainManu done');
}
function destroySwiperInMainManu() {
    if (sklmsg_swiper_mainmenu != null) {
        sklmsg_swiper_mainmenu.destroy();
        console.log('destroySwiperInMainManu done');
    }
}
function newSwiperInCardH() {
    sklmsg_swiper_cardH = new Swiper('#H_01', {
        slidesPerView: 1,
        // Navigation arrows
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.card-H-next',
            prevEl: '.card-H-prev',
        }
    });

    // ============================================================ 
    //   H 問卷頁 svg動畫效果-使用vivus.min.js 使edge, IE11也可以播放svg動畫
    // ============================================================ 
    sklmsg_swiper_cardH.on('transitionEnd', function () {
        if ($('.swiper-slide-active .H-page-wrapper').is('#idPageWithSvgAnimation')) {
            // animation slides
            $('#idThankyouSvgObj').css("visibility", "visible");
            if (id_vivus_svg == null){
                id_vivus_svg = new Vivus('idThankyouSvgObj', {
                    duration: 100,
                    type: 'oneByOne',
                });
            }else{
                id_vivus_svg.reset().play(1);
                // console.log('replay svg ani');
            }
        } else { 
            //other slides
            $('#idThankyouSvgObj').css("visibility", "hidden");
        }
    });
    console.log('newSwiperInCardH done');
}
function destroySwiperInCardH() {
    if(sklmsg_swiper_cardH != null){
        sklmsg_swiper_cardH.destroy();
        console.log('destroySwiperInCardH done');
    }
}
function newSwiperInJ2() {
    sklmsg_swiper_J2 = new Swiper('.swiper-container.card-J2-swiper', {
        slidesPerView: 'auto',
        spaceBetween: SWIPER_J2_SPACE,
    });
    console.log('newSwiperInJ2done');
}
function destroySwiperInJ2() {
    if (sklmsg_swiper_J2 != null) {
        sklmsg_swiper_J2.destroy();
        console.log('destroySwiperInJ2 done');
    }
}
function closeCardJ() {
    console.log('closeCardJ');

    if ($('.js-inputopt-J1').is(':visible') || $('.js-inputopt-J2').is(':visible') || $('.js-inputopt-J3').is(':visible')){
        console.log('J is opened.');
        if ($('.js-inputopt-J1').is(':visible')) {
            $(".js-inputopt-J1").hide();
        } else if ($('.js-inputopt-J2').is(':visible')) {
            $(".js-inputopt-J2").hide();
            destroySwiperInJ2();
        } else if ($('.js-inputopt-J3').is(':visible')) {
            $(".js-inputopt-J3").hide();
        } else{
            return; 
        }

        // J版型關閉時，將最後一個msg-box 的 margin-bottom  降回初始值
        if ($lastMsgBox != null) {
            setMainchatMarginBottom($lastMsgBox, bgOriginalMargin);
        }
        lockBGScroll(false); //解除背景不可SCROLL
        $('.main-wrapper').unbind('click'); //解除主區域監聽click事件
        $('.inputopt-section').unbind('click'); //解除inputopt-section監聽click事件
        console.log('main wrapper inputopt-section unbind click.');
    }
    
}

function toggleBoxHandler(msgId) {
    var myTogBtn = msgId + ' .js-toggle-box-btn';

    console.log('toggleBoxHandler-: ' + myTogBtn);
    
    $(myTogBtn).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass('opened')) {
            //close toggle
            $(this).removeClass('opened');
            if (msgId == '.msg-D6') {
                $(this).closest(".msg-D6").removeClass('js-scroll-to-here');
                var mytestNearestTop = $(this).closest(".msg-D6").prev(".js-scroll-to-here").offset().top - MENU_H - 10;  //scroll to last user msg
                var mytestWelcomeTop = $('.js-welcome-chat').offset().top - MENU_H;  //top of curretn scroll position
                $('.main-wrapper').animate({ scrollTop: (mytestNearestTop - mytestWelcomeTop) }, "fast");
            }
        } else {
            $(this).addClass('opened');
            //open toggle
            if (msgId == '.msg-D6'){
                $(this).closest(".msg-D6").addClass('js-scroll-to-here');
                var mytestNearestTop = $(this).closest(".js-scroll-to-here").offset().top - MENU_H - 10;  //scroll to last user msg
                var mytestWelcomeTop = $('.js-welcome-chat').offset().top - MENU_H;  //top of curretn scroll position
                $('.main-wrapper').animate({ scrollTop: (mytestNearestTop - mytestWelcomeTop) }, "fast");
            }
        }
    });        
}
function initEHandler(openClsName, closeClsName, popupClsName) {
    console.log('initE:' + popupClsName);
    $(openClsName).on('click', function (e) {
        e.preventDefault();
        openMask('CENTER');
        $(popupClsName).show();
    });
    $(closeClsName).on('click', function (e) {
        e.preventDefault();
        closeMask('CENTER');
        $(popupClsName).hide();
    });
}
function AmIMobileDevice() {
    var mobileDevice = false;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android device
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios device
    if (isAndroid || isiOS) {
        console.log('AmIMobileDevice- isAndroid: ' + isAndroid + ' isiOS: ' + isiOS);
        mobileDevice = true;
    }
    return mobileDevice;
}
function initGdatebox(mobileInputName, pcInputName) {
    var isMobile = AmIMobileDevice(); //判別是否為mobile device
    console.log("initGdatebox- isMobile? " + isMobile);
    //範例 Mobile切換成原生
    if (isMobile) {
        $('input[name="' + mobileInputName + '"]').show();
        $('input[name="' + pcInputName + '"]').hide();
        //Mobile 採用 原生
        $('input[name="' + mobileInputName + '"]').change(function () {
            var start = $('input[name="' + mobileInputName + '"]').val();
            console.log("G-date-mobile 已選擇日期: " + start);
            idG4Date = start;
        });
    } else {
        $('input[name="' + mobileInputName + '"]').hide();
        $('input[name="' + pcInputName + '"]').show();
        //PC 採用 dateranhepicker
        $('input[name="' + pcInputName + '"]').daterangepicker({
            singleDatePicker: true,
            drops: 'up', //popup向上
            minDate: moment().startOf('day'), //起始日期從今天開始
            maxDate: '2021-01-01', //結束日期
            locale: {
                format: 'YYYY-MM-DD',
                daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
            }
        }, function (start) {
            console.log("G-date-pc 已選擇日期: " + start.format('YYYY-MM-DD'));
            idG4Date = start.format('YYYY-MM-DD');
        });
    }
}
function initGHandler(openClsName, closeClsName, popupClsName) {
    console.log('initG:' + popupClsName);
    $(openClsName).on('click', function (e) {
        e.preventDefault();
        openMask('BOTTOM');
        $(popupClsName).slideToggle(SLIDE_DELAY);
        //draw scrollbar for mobile
        $(popupClsName + ' .js-scrollbar-inner').scrollbar();
    });
    //close G5 handler
    if (closeClsName == '.js-bottom-G3-close'){
        $('.js-bottom-G3-close').on('click', function (e) {
            e.preventDefault();
            //1.get input option txt
            var userMsgTxt = '已選擇性別： ' + $('input[name=idG3Gender]:checked').val() + '<br>已選擇年齡： ' + $('#idG3Age option:selected').html();
            //2.close
            closeMask('BOTTOM');
            //3.append to user msg and scrollup
            demoAppendUserMessage(userMsgTxt);
        });
    }
    else if (closeClsName == '.js-bottom-G4-close') {
        $('.js-bottom-G4-close').on('click', function (e) {
            e.preventDefault();
            //1.get input option txt
            var userMsgTxt = '已選擇日期： ' + idG4Date + '<br>已選擇時段： ' + $('#idG4Time option:selected').html();

            //2.close
            closeMask('BOTTOM');
            //3.append to user msg and scrollup
            demoAppendUserMessage(userMsgTxt);
        });
    }
    else if (closeClsName == '.js-bottom-G5-close'){
        $('.js-bottom-G5-close').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            //1.get input option txt
            var userMsgTxt = $(this).text();
            //2.close
            closeMask('BOTTOM');
            
            if ($(this).hasClass('btn') && userMsgTxt != ''){
                //3.append to user msg and scrollup
                demoAppendUserMessage(userMsgTxt);
            }
        });
    }else{
        $(closeClsName).on('click', function (e) {
            // console.log(closeClsName + ' clicked.');
            e.preventDefault();
            closeMask('BOTTOM');
        });
    }

}
function setMainchatMarginBottom($mylastMsgBox, newMarginBtm) {
    $mylastMsgBox.css("margin-bottom", newMarginBtm + "px");
    demoScrollUp();
}
function initJ1Handler(){

    $('.js-inputopt-J1-open').on('click', function (e) {
        if ($('.js-inputopt-J1').is(':visible')) { return; } //防止重複開啟
        e.preventDefault();
        e.stopPropagation();
        $('.js-inputopt-J1').show();

        // J版型出現時，墊高最後一個msg-box 的 margin-bottom 高度與j版型同高，並使主對話向上捲動
        // console.log('j1Height: ' + $('.js-inputopt-J1').outerHeight());
        $lastMsgBox = $('.msg-box').last();
        bgOriginalMargin = parseInt($lastMsgBox.css("margin-bottom").replace('px', ''));
        setMainchatMarginBottom($lastMsgBox, bgOriginalMargin + $('.js-inputopt-J1').outerHeight());
        
        lockBGScroll(true); //鎖住背景不可SCROLL
        $('.main-wrapper').on('click', function (e) {
            e.preventDefault();
            closeCardJ();
        });
    });
    
    $('.js-inputopt-J1-close').on('click', function (e) {
        e.preventDefault();
        //1.get input option txt
        var userMsgTxt = $(this).text();
        //2.close
        closeCardJ();
        
        //3.append to user msg and scrollup
        demoAppendUserMessage(userMsgTxt);
    });
}

function initJ2Handler(){

    $('.js-inputopt-J2-open').on('click', function (e) {
        if ($('.js-inputopt-J2').is(':visible')) { return; } //防止重複開啟
        e.preventDefault();
        e.stopPropagation();

        $('.js-inputopt-J2').show();
        newSwiperInJ2();
        // J版型出現時，墊高最後一個msg-box 的 margin-bottom 高度與j版型同高，並使主對話向上捲動
        // console.log('j2Height: ' + $('.js-inputopt-J2').outerHeight());
        $lastMsgBox = $('.msg-box').last();
        bgOriginalMargin = parseInt($lastMsgBox.css("margin-bottom").replace('px', ''));
        setMainchatMarginBottom($lastMsgBox, bgOriginalMargin + $('.js-inputopt-J2').outerHeight());

        lockBGScroll(true); //鎖住背景不可SCROLL
        $('.main-wrapper').on('click', function (e) {
            e.preventDefault();
            closeCardJ();
        });
    });
    
    $('.js-inputopt-J2-close').on('click', function (e) {
        e.preventDefault();
        //1.get input option txt
        var userMsgTxt = $(this).text();
        //2.close
        closeCardJ();
        
        //3.append to user msg and scrollup
        demoAppendUserMessage(userMsgTxt);
    });
}
function initJ3Handler() {

    $('.js-inputopt-J3-open').on('click', function (e) {

        if ($('.js-inputopt-J3').is(':visible')) { return; } //防止重複開啟
        e.preventDefault();
        e.stopPropagation();
        $('.js-inputopt-J3').show();
        
        // J版型出現時，墊高最後一個msg-box 的 margin-bottom 高度與j版型同高，並使主對話向上捲動
        // console.log('j3Height: ' + $('.js-inputopt-J3').outerHeight());
        $lastMsgBox = $('.msg-box').last();
        bgOriginalMargin = parseInt($lastMsgBox.css("margin-bottom").replace('px', ''));
        setMainchatMarginBottom($lastMsgBox, bgOriginalMargin + $('.js-inputopt-J3').outerHeight());

        lockBGScroll(true); //鎖住背景不可SCROLL

        $('.main-wrapper, .inputopt-section').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeCardJ();
        });
    });
    
    $('.js-inputopt-J3-close').on('click', function (e) {
        e.preventDefault();
        //1.get input option txt
        var userMsgTxt = $(this).text();
        //2.close
        closeCardJ();

        //3.append to user msg and scrollup
        demoAppendUserMessage(userMsgTxt);
    });
}
// ============================================================ 
//  demo區 - 模擬對話腳本
// ============================================================ 
//根據input文字+組合html -> 印出User msg 
function demoAppendUserMessage(text) {
    var userHtml = '<div class="msg-box msg-box-user js-scroll-to-here" data-time="00:00"> <div class="msg-bubble">';
    userHtml = userHtml.concat(text);
    userHtml = userHtml.concat('</div > </div >');
    console.log('userHTML' + userHtml);
    $(userHtml).appendTo('.js-welcome-chat');
    demoScrollUp();

}
//根據type去json內容搜尋對應的robot msg, 若找不到則回覆 sklmsg_defaultHtml
function demoSearchRobotMessage(userMsgTxt) {
    userMsgTxt = userMsgTxt.toUpperCase(); //a1-> A1, b1->B1, 強制轉為大寫字母
    
    // console.log('demoSearchRobotMessage: type=' + userMsgTxt);
    var robot_msg = sklmsg_data.filter(function (item, index, array) {
        return item.type === userMsgTxt;       // 取得array中type符合(A1, B1, ....)的項目
    });
    // console.log(robot_msg.length);
    if (robot_msg.length > 0) {
        //robot type found
        // console.log("demoSearchRobotMessage: msg:" + robot_msg[0].msg);
        return robot_msg[0].msg;
    } else {
        //NOT found
        return sklmsg_defaultHtml;
    }
}
//step4. trigger js for some robot msg type
function demoTriggerRobotHTMLJsIfNeeded(userMsgTxt) {
    userMsgTxt = userMsgTxt.toUpperCase();
    if (userMsgTxt == 'B2') {
        //delete 前面出現過的 b2 樣式，一個頁面只能有一個 id='B2_01'
        console.log('B2 count:' + $(".js-msg-B2").length);
        if ($('.js-msg-B2').length > 1){
            sklmsg_swiper_B2_01.destroy();
            $('.js-msg-B2').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 B2 ~前面的B2會拿掉</div>");
            $('.js-msg-B2').first().removeClass('msg-B2 js-msg-B2');
        }
        sklmsg_swiper_B2_01 = new Swiper('#B2_01', {
            slidesPerView: 'auto',
            spaceBetween: SWIPER_B_SPACE,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    } else if (userMsgTxt == 'B1'){
        //delete 前面出現過的 b1 樣式，一個頁面只能有一個 id='B1_01'
        console.log('B1 count:' + $(".js-msg-B1").length);
        if ($('.js-msg-B1').length > 1) {
            sklmsg_swiper_B1_01.destroy();
            $('.js-msg-B1').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 B1 ~前面的B1會拿掉</div> ");
            $('.js-msg-B1').first().removeClass('msg-B1 js-msg-B1');
        }
        sklmsg_swiper_B1_01 = new Swiper('#B1_01',
        {
            slidesPerView: 1,
            loop: true,
            spaceBetween: SWIPER_B1_SPACE, //swiper-button-next width
            // Navigation arrows
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    } else if (userMsgTxt == 'B3') {
        //delete 前面出現過的 b3 樣式，一個頁面只能有一個 id='B3_01'
        console.log('B3 count:' + $(".js-msg-B3").length);
        if ($('.js-msg-B3').length > 1) {
            sklmsg_swiper_B3_01.destroy();
            $('.js-msg-B3').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 B3 ~前面的B3會拿掉</div>");
            $('.js-msg-B3').first().removeClass('msg-B3 js-msg-B3');
        }
        sklmsg_swiper_B3_01 = new Swiper('#B3_01', {
            slidesPerView: 'auto',
            spaceBetween: SWIPER_B_SPACE,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    } else if (userMsgTxt == 'F1' || userMsgTxt == 'F2' || userMsgTxt == 'F3' || userMsgTxt == 'F4' 
    || userMsgTxt == 'F5' || userMsgTxt == 'F6' || userMsgTxt == 'F7') {
        var swiperCardName = 'swiper_' + userMsgTxt + 'card_01'; //swiper_F1card_01, swiper_F2card_01...
        var swiperFormName = 'swiper_' + userMsgTxt + 'form_01'; //swiper_F1form_01, swiper_F2form_01...
        var swiperCardId = '#' + userMsgTxt + 'card_01'; //#F1card_01, #F2card_01...
        var swiperFormId = '#' + userMsgTxt + 'form_01'; //#F1form_01, #F2form_01...
        var jsMsgId = 'js-msg-' + userMsgTxt; //js-msg-F1, js-msg-F2,...
        // console.log('swiperCardName: ' + swiperCardName + ' swiperFormName: ' + swiperFormName + ' swiperCardId: ' + swiperCardId + ' swiperFormId: ' + swiperFormId + ' jsMsgId: ' + jsMsgId );
        //delete 前面出現過的 Fx 樣式，一個頁面只能有一個 id='Fxcard_01', id='Fxform_01'
        // console.log('Fx count:' + $('.'+jsMsgId).length);
        if ($('.'+jsMsgId).length > 1) {
            window[swiperCardName].destroy();
            window[swiperFormName].destroy();
            $('.'+jsMsgId).first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 " + jsMsgId +"~</div> ");
            $('.'+jsMsgId).first().removeClass(jsMsgId);
        }
        window[swiperCardName] = new Swiper(swiperCardId,
            {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: SWIPER_Fcard_SPACE,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        window[swiperFormName] = new Swiper(swiperFormId,
            {
                slidesPerView: 1,
                spaceBetween: SWIPER_Fform_SPACE,
                autoHeight: true,
            });
        window[swiperCardName].controller.control = window[swiperFormName];
        window[swiperFormName].controller.control = window[swiperCardName];

    }
    else if (userMsgTxt == 'E') {
        initEHandler('.js-popup-E1-open', '.js-popup-E1-close', '.js-popup-E1');
        initEHandler('.js-popup-E2-open', '.js-popup-E2-close', '.js-popup-E2');
        if ($('.js-msg-E2').length <= 1) {
            //only need to init once
            toggleBoxHandler('.msg-E2');
        }
        initEHandler('.js-popup-E3-open', '.js-popup-E3-close', '.js-popup-E3');
        initEHandler('.js-popup-E4-open', '.js-popup-E4-close', '.js-popup-E4');
        initEHandler('.js-popup-E5-open', '.js-popup-E5-close', '.js-popup-E5');
        initEHandler('.js-popup-E6-open', '.js-popup-E6-close', '.js-popup-E6');
        initEHandler('.js-popup-E7-open', '.js-popup-E7-close', '.js-popup-E7');
    }
    else if (userMsgTxt == 'G') {

        initGHandler('.js-bottom-login-open', '.js-bottom-login-close', '.js-bottom-login');
        initGHandler('.js-bottom-G1-open', '.js-bottom-G1-close', '.js-bottom-G1');
        initGHandler('.js-bottom-G2-open', '.js-bottom-G2-close', '.js-bottom-G2');
        initGHandler('.js-bottom-G3-open', '.js-bottom-G3-close', '.js-bottom-G3');
        initGdatebox('G-date-mobile', 'G-date-pc'); //date picker
        initGHandler('.js-bottom-G4-open', '.js-bottom-G4-close', '.js-bottom-G4');
        initGHandler('.js-bottom-G5-open', '.js-bottom-G5-close', '.js-bottom-G5');
        initGHandler('.js-bottom-G6-open', '.js-bottom-G6-close', '.js-bottom-G6');
        initGHandler('.js-bottom-G7-open', '.js-bottom-G7-close', '.js-bottom-G7');
    }
     else if (userMsgTxt == 'J1') {
        if ($('.js-msg-J1').length > 1) {
            $('.js-inputopt-J1-open').unbind('click');
            $('.js-inputopt-J1-close').unbind('click');
            $('.js-msg-J1').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 J1 ~前面的J1會拿掉</div>");
            $('.js-msg-J1').first().removeClass('js-msg-J1');            
        }
        initJ1Handler();
    } else if (userMsgTxt == 'J2') {
        if ($('.js-msg-J2').length > 1) {
            $('.js-inputopt-J2-open').unbind('click');
            $('.js-inputopt-J2-close').unbind('click');
            $('.js-msg-J2').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 J2 ~前面的J2會拿掉</div>");
            $('.js-msg-J2').first().removeClass('js-msg-J2');    
        }
        initJ2Handler();
    } else if (userMsgTxt == 'J3') {
        if ($('.js-msg-J3').length > 1) {
            $('.js-inputopt-J3-open').unbind('click');
            $('.js-inputopt-J3-close').unbind('click');
            $('.js-msg-J3').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 J3 ~前面的J3會拿掉</div>");
            $('.js-msg-J3').first().removeClass('js-msg-J3');
        }
        initJ3Handler();
    }
     else if (userMsgTxt == 'D6') {
        if ($('.msg-D6').length > 1) {
            $('.msg-D6').first().html("<div class='avatar'></div><div class='msg-bubble'>測試用，一次只active一個 D6 ~</div> </div> ");
            $('.msg-D6').first().removeClass('msg-D6');
        }
        //toggle-box 
        toggleBoxHandler('.msg-D6');
    }

}

function demoScrollUp(){
    var testNearestTop = $(".js-scroll-to-here").last().offset().top - MENU_H - 10;  //scroll to last user msg
    var testWelcomeTop = $('.js-welcome-chat').offset().top - MENU_H;  //top of curretn scroll position
    console.log('robotmsg- i scroll= ' + (testNearestTop - testWelcomeTop));
    $('.main-wrapper').animate({ scrollTop: (testNearestTop - testWelcomeTop) }, "fast");
}

//根據json內容html -> 印出Robot msg
function demoAppendRobotMessage(with_loading, robotHtml, userMsgTxt) {
    console.log('with_loading: '+  with_loading);
    if (with_loading){
        //running loading before msg
        $(sklmsg_loadingHtml).appendTo('.js-welcome-chat');
        demoScrollUp();
    }
    setTimeout(function () {
        if (with_loading){      
            // $('.msg-loading').hide();   
            $('.msg-loading').remove();  
        }
        $(robotHtml).appendTo('.js-welcome-chat');
        
        //step4. trigger js for some robot msg type
        demoTriggerRobotHTMLJsIfNeeded(userMsgTxt);
        demoScrollUp();

    }, LOADING_DELAY);
}

//handle user input text
function demoInputSubmit() {
    var userMsgTxt, robotType, robotHtml;

    //step1. print out user's input 
    userMsgTxt = $('.js-msger-input').val();
    $('.js-msger-input').val('');//clear input value after we catch it
    $('.js-msger-submit').removeClass('active');
    if (!userMsgTxt) return;
    if (userMsgTxt == ROBOT_LOADING_CHANGE_KEYWD){
        sklmsg_ifLoadingAnim ^= true;
        // console.log('demoInputSubmit: sklmsg_ifLoadingAnim=' + sklmsg_ifLoadingAnim);
    }
    console.log('demoInputSubmit: userMsgTxt= ' + userMsgTxt);
    demoAppendUserMessage(userMsgTxt);

    //step2. search robot's respond msg
    robotHtml = demoSearchRobotMessage(userMsgTxt);
    // console.log('demoInputSubmit: robotHtml=' + robotHtml);

    //step3. print out robot's respond msg
    setTimeout(function () {
        demoAppendRobotMessage(sklmsg_ifLoadingAnim, robotHtml, userMsgTxt);
    }, LOADING_DELAY);
}

/* main.js */
$(document).ready(function() {
    // ============================================================ 
    //  測試區
    // ============================================================ 


    // ============================================================ 
    //  privacy menu 隱私權聲明
    // ============================================================ 
    //show privacy menu 隱私權聲明
    openMask('TOP');
    $('.js-top-privacy').show();
    $('.js-top-toggle').hide(); //不顯示top toggle, 不給關掉，只能按「我知道了」

    //close privacy menu 隱私權聲明
    $('.js-top-privacy-close').on('click', function (e) {
        e.preventDefault();
        closeMask('TOP');
        $('.js-top-privacy').slideToggle(SLIDE_DELAY);
        $('.js-top-toggle').show(); //顯示top toggle
    });
   

    // ============================================================ 
    //  top menu 上方選單
    // ============================================================ 
    $('.js-top-toggle').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('mode-popup')) {
            closeMask('TOP');
        }else{
            openMask('TOP');
        }
        $('.js-top-menu').slideToggle(SLIDE_DELAY);
    });
     //  點選上方選單項目之後的操作
    $('.js-top-menuitem').on('click', function (e) {
        var robotHtml;
        e.preventDefault();
        //step1. close mask and menu
        closeMask('TOP');
        $('.js-top-menu').slideToggle(SLIDE_DELAY);
        //step2. search robot's respond msg
        robotHtml = demoSearchRobotMessage("上方選單項目");
        //step3. print out robot's respond msg
        setTimeout(function () {
            demoAppendRobotMessage(sklmsg_ifLoadingAnim, robotHtml, "上方選單項目");
        }, LOADING_DELAY);

    });
    // ============================================================ 
    //  bottom page 下方蓋版版型
    // ============================================================ 
    //
    // bottom page > .js-bottom-menu 主選單
    //
    $('.js-bottom-menu-toggle').on('click', function (e) {
        e.preventDefault();
        openMask('BOTTOM');
        closeCardJ();
        $('.js-bottom-menu').slideToggle(SLIDE_DELAY);
        newSwiperInMainManu();
        // ============================================================ 
        //   主選單高度計算 (每分頁項目不同數目時，根據max分頁高度，指定所有分頁的高度)
        // ============================================================ 
        if ($(window).height() > 768){
            $('.mmenu-tab-contents').each(function () {
                var maxHeight = 0;
                $('.mmenu-tab-panel', this).each(function () {
                    console.log('各頁選單高度: ' + $(this).height());
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                });
                console.log('選單高度max: ' + maxHeight);
                $('.mmenu-tab-panel').height(maxHeight);
            });
        }
    });
    $('.js-bottom-menu-close').on('click', function (e) {
        e.preventDefault();
        closeMask('BOTTOM'); //在裡面hide所有bottom蓋版版型

    });
    //  點選主選單項目之後的操作
    $('.js-bottom-menu-itemNews, .js-bottom-menu-itemOther').on('click', function (e) {
        var robotHtml;

        e.preventDefault();
        //step1. close mask and menu
        closeMask('BOTTOM'); //在裡面hide所有bottom蓋版版型


        //step2. search robot's respond msg
        if ($(this).hasClass('js-bottom-menu-itemNews')) {
            robotHtml = demoSearchRobotMessage("最新消息測試");
        } else {
            robotHtml = demoSearchRobotMessage("其他主選單項目");
        }
        //step3. print out robot's respond msg
        setTimeout(function () {
            demoAppendRobotMessage(sklmsg_ifLoadingAnim, robotHtml, "其他主選單項目");
        }, DELAY);
    });
    //  點選主選單項目之後，打開H版型-問卷頁的操作
    $('.js-bottom-menu-itemOpenH').on('click', function (e) {
        e.preventDefault();

         //step1. 立!刻!關!掉! bottom menu 主選單
        if ($('.js-bottom-menu').is(":visible")) {
            $('.js-bottom-menu').slideToggle(0);
            console.log('close bottom page NOW: ' + $(this).attr('class'));
        }
        destroySwiperInMainManu();
        $('footer').removeClass('mode-popup');
        $('.js-mask').removeClass('mode-popup');
        lockBGScroll(false); //解除背景不可SCROLL

        //step2. open mask and card H 
        openMask('BOTTOM');
        $('.js-bottom-H').slideToggle(SLIDE_DELAY);
        newSwiperInCardH();
    });


    //
    //bottom page > .js-bottom-H  H版型 問卷頁 關閉
    //
    $('.js-bottom-H-close').on('click', function (e) {
        e.preventDefault();
        closeMask('BOTTOM'); //在裡面hide所有bottom蓋版版型
    });

    //  點選H版型 問卷頁'送出'之後的操作
    $('.js-bottom-H-sendcfm').on('click', function (e) {
        var robotHtml;
        //step1. close H
        e.preventDefault();
        closeMask('BOTTOM'); //在裡面hide所有bottom蓋版版型


        //step2. search robot's respond msg
        if ($(this).hasClass('js-bottom-H-sendcfm')) {
            var getHtml = demoSearchRobotMessage("送出問卷測試");
            robotHtml = getHtml.replace('AAA', $('input[name=idQuesStar01]:checked').val());
            robotHtml = robotHtml.replace('BBB', $('input[name=idQuesStar02]:checked').val());
            robotHtml = robotHtml.replace('CCC', parseInt($("#idQuesScore").text()));
            console.log('問卷第一題: ' + $('input[name=idQuesStar01]:checked').val() + '顆星');
            console.log('問卷第二題: ' + $('input[name=idQuesStar02]:checked').val() + '顆星');
            console.log('問卷第三題: ' + parseInt($("#idQuesScore").text()) + '分');
        }
        //step3. print out robot's respond msg
        setTimeout(function () {
            demoAppendRobotMessage(sklmsg_ifLoadingAnim, robotHtml, "送出問卷測試");
        }, DELAY);
    });
    
    


    //mask click, close current popup 點擊mask關掉目前popup
    $('.js-mask, .js-popup-sec').on('click', function (e) {
        if (e.target !== this)
            return;
        if ( $('.js-top-privacy').css('display') != 'none' ){
            //隱私權頁打開時，不能按mask關掉
            return;
        }
        console.log('mask clicked. sklmsg_current_popup = ' + sklmsg_current_popup);
        //判斷目前的 popup 是 top menu or bottom menu
        if (sklmsg_current_popup == 'TOP') {
            closeMask('TOP');
            $('.js-top-menu').slideToggle(SLIDE_DELAY);
        } else if (sklmsg_current_popup == 'BOTTOM') {
            closeMask('BOTTOM'); //在裡面hide所有bottom蓋版版型

        } else if (sklmsg_current_popup == 'CENTER'){
            closeMask('CENTER');
        } 
        else {
            console.log('clickMask: unknown pos.');
        }
        sklmsg_current_popup = 'NONE';
    });

    // ============================================================ 
    //  bottom main menu tabs / tab-panel 主選單分頁
    // ============================================================ 
    $(".js-tab").on('click', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        tabId = tabId.replace('#', '');
        // console.log(tabId);
        $(".js-tab").removeClass('active');
        $(this).addClass('active');
        $(".js-tab-panel").removeClass('active');
        $('[data-id=' + tabId + ']').addClass('active');
    });
    
    // ============================================================ 
    //  read in sklmsg.json for robot response 匯入robot回應的msg array
    // ============================================================ 
    //read in skl msg data sklmsg_data[i].type, sklmsg_data[i].msg
    $.getJSON('datajson/sklmsg.json', function (data) {
        var tmp_msg;
        sklmsg_data = data;
        console.log('init: sklmsg_data.');
        // console.log(sklmsg_data);

        // 取得"loading"的項目 (小新的loding動畫)
        tmp_msg = sklmsg_data.filter(function (item, index, array) {
            return item.type === ROBOT_LOADING_KEYWD;       // 取得"loading"的項目
        });
        if (tmp_msg.length > 0)
            sklmsg_loadingHtml = tmp_msg[0].msg;
        // console.log("loadingHTML: " + sklmsg_loadingHtml);

        // 取得"default"的項目 (很抱歉我不明白您的意思。)
        tmp_msg = sklmsg_data.filter(function (item, index, array) {
            return item.type === ROBOT_DEFAULT_KEYWD;       // 取得"default"的項目
        });
        if (tmp_msg.length > 0)
            sklmsg_defaultHtml = tmp_msg[0].msg;
        // console.log("defaultHTML: " + sklmsg_defaultHtml);
    });
    // ============================================================ 
    //  input area handle 輸入文字相關處理
    // ============================================================ 

    //detect input field - if value length > 0, change submit button color to red
    $('.js-msger-input').on('input propertychange paste',function(){
        if ($('.js-msger-input').val().length > 0){
            $('.js-msger-submit').addClass('active');
        }
    });
    //get input msg - by press submit button
    $('.js-msger-submit').on('click', function (e) {
        e.preventDefault();
        demoInputSubmit();
        closeCardJ();
        
    });
    //get input msg - by press enterkey
    $('.js-msger-input').bind("enterKey", function (e) {
        e.preventDefault();
        demoInputSubmit();
        closeCardJ();
    });
    $('.js-msger-input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
        if ($('.js-msger-input').val().length == 0)
            $('.js-msger-submit').removeClass('active');
    });
    if ($(document.activeElement).attr('type') == "text") {
        // alert('input!!');
        $('.js-msger-submit').addClass('active');
    }
    //get input msg - by press enter on iOS soft keyboard
    $('.js-msger-input').on('blur', function (e) {
        e.preventDefault();
        demoInputSubmit();
        closeCardJ();
    });

    // ============================================================ 
    //  H questionnaire - H 問卷頁
    // ============================================================ 
    var ques_score_max = 10;
    var ques_score_min = 0;

    $('#idQuesScoreAdd').on('click', function (e) {
        e.preventDefault();
        var sc = parseInt($("#idQuesScore").text());
        if (sc < ques_score_max ){
            sc++;
            $("#idQuesScore").text(sc);
            $(".H-score-warning").text('');
        }else{
            $(".H-score-warning").text($(".H-score-warning").attr('data-warning-max') ); 
        }
    });
    $('#idQuesScoreMinus').on('click', function (e) {
        e.preventDefault();
        var sc = parseInt($("#idQuesScore").text());
        if (sc > ques_score_min) {
            sc--;
            $("#idQuesScore").text(sc);
            $(".H-score-warning").text('');
        }else{
            $(".H-score-warning").text($(".H-score-warning").attr('data-warning-min')); 
        }
    });
    
    
}); //document ready 