$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('focus', '.form-input input, .form-input textarea', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input, .form-input textarea', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curName = curInput.val().replace(/.*(\/|\\)/, '');
        if (curName != '') {
            curField.find('.form-file-name').html(curName);
        } else {
            curField.find('.form-file-name').html('');
        }
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('.gallery').each(function() {
        var curGallery = $(this);
        curGallery.on('init', function(event, slick) {
            var curSlide = curGallery.find('.slick-current');
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
        curGallery.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            adaptiveHeight: true,
            fade: true,
            dots: true,
            responsive: [
                {
                    breakpoint: 1159,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
            var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
            curGallery.find('.slick-dots').css({'top': curPhotoHeight});
            curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
            curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
        });
    });

    $('body').on('click', '.video-detail-link', function(e) {
        $('.video-detail-player').html('');
        $(this).parent().addClass('start');
        $(this).parent().find('.video-detail-player').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        e.preventDefault();
    });

    $('.photos-detail-item-zoom').click(function(e) {
        var curLink = $(this);
        var curItem = curLink.parents().filter('.photos-detail-item');
        var curGallery = curItem.parents().filter('.photos-detail');
        var curIndex = curGallery.find('.photos-detail-item').index(curItem);

        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-photo-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        var windowHTML =    '<div class="window-photo">';

        windowHTML +=           '<div class="window-photo-preview">' +
                                    '<div class="window-photo-preview-inner">' +
                                        '<div class="window-photo-preview-list">';

        var galleryLength = curGallery.find('.photos-detail-item').length;
        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.photos-detail-item').eq(i);
            windowHTML +=                   '<div class="window-photo-preview-list-item"><a href="#" style="background-image:url(' + curGalleryItem.find('.photos-detail-img img').attr('src') + ')"></a></div>';
        }
        windowHTML +=                   '</div>' +
                                    '</div>' +
                                '</div>';

        windowHTML +=           '<a href="#" class="window-photo-close"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.779074 14.4895C0.592823 14.3022 0.488281 14.0487 0.488281 13.7845C0.488281 13.5204 0.592823 13.2669 0.779074 13.0795L13.5091 0.349543C13.5987 0.244862 13.709 0.159841 13.8331 0.0998181C13.9572 0.0397948 14.0923 0.00606467 14.23 0.000745179C14.3677 -0.00457431 14.5051 0.0186316 14.6334 0.0689062C14.7617 0.119181 14.8783 0.195439 14.9757 0.292893C15.0732 0.390348 15.1494 0.506896 15.1997 0.635221C15.25 0.763546 15.2732 0.900878 15.2679 1.0386C15.2626 1.17632 15.2288 1.31145 15.1688 1.43551C15.1088 1.55958 15.0238 1.6699 14.9191 1.75954L2.18907 14.4895C2.00171 14.6758 1.74826 14.7803 1.48407 14.7803C1.21989 14.7803 0.966436 14.6758 0.779074 14.4895Z" /><path d="M0.779074 0.349508C0.966436 0.163257 1.21989 0.0587158 1.48407 0.0587158C1.74826 0.0587158 2.00171 0.163257 2.18907 0.349508L14.9191 13.0795C15.0238 13.1692 15.1088 13.2795 15.1688 13.4035C15.2288 13.5276 15.2626 13.6627 15.2679 13.8005C15.2732 13.9382 15.25 14.0755 15.1997 14.2038C15.1494 14.3322 15.0732 14.4487 14.9757 14.5462C14.8783 14.6436 14.7617 14.7199 14.6334 14.7701C14.5051 14.8204 14.3677 14.8436 14.23 14.8383C14.0923 14.833 13.9572 14.7993 13.8331 14.7392C13.709 14.6792 13.5987 14.5942 13.5091 14.4895L0.779074 1.75951C0.592823 1.57215 0.488281 1.31869 0.488281 1.05451C0.488281 0.790323 0.592823 0.536871 0.779074 0.349508Z" /></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-download download"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0291 10.2594L9.98914 13.2993L6.94922 10.2594" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/><path d="M9.98828 0.760254V12.7938" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/><path d="M6.94823 6.45972H3.52832V18.6194H16.448V6.45972H13.0281" stroke-width="1.1" stroke-miterlimit="10" stroke-linecap="round"/></svg></a>';
        windowHTML +=           '<a href="#" class="window-photo-social"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.58203 11.4219C4.58788 11.4219 5.47434 10.9592 6.03976 10.2548L12.4347 13.2746C12.3562 13.5316 12.3008 13.7976 12.3008 14.0781C12.3008 15.6892 13.6887 17 15.3945 17C17.1003 17 18.4883 15.6892 18.4883 14.0781C18.4883 12.4671 17.1003 11.1562 15.3945 11.1562C14.3885 11.1562 13.502 11.6191 12.9366 12.3236L6.54175 9.30379C6.6203 9.04673 6.67578 8.78063 6.67578 8.5C6.67578 8.2195 6.62035 7.95349 6.54184 7.69651L12.9368 4.67667C13.5022 5.38102 14.3887 5.84375 15.3945 5.84375C17.1003 5.84375 18.4883 4.53292 18.4883 2.92187C18.4883 1.31083 17.1003 -1.78601e-06 15.3945 -1.63688e-06C13.6887 -1.48776e-06 12.3008 1.31083 12.3008 2.92187C12.3008 3.2025 12.3563 3.4686 12.4348 3.72567L6.03999 6.74547C5.47461 6.04098 4.58801 5.57812 3.58203 5.57812C1.87622 5.57812 0.488282 6.88896 0.488282 8.5C0.488283 10.111 1.87622 11.4219 3.58203 11.4219ZM15.3945 12.2187C16.48 12.2187 17.3633 13.053 17.3633 14.0781C17.3633 15.1033 16.48 15.9375 15.3945 15.9375C14.3091 15.9375 13.4258 15.1033 13.4258 14.0781C13.4258 13.053 14.3091 12.2187 15.3945 12.2187ZM15.3945 1.0625C16.48 1.0625 17.3633 1.89673 17.3633 2.92187C17.3633 3.94702 16.48 4.78125 15.3945 4.78125C14.3091 4.78125 13.4258 3.94702 13.4258 2.92187C13.4258 1.89673 14.3091 1.0625 15.3945 1.0625ZM3.58203 6.64062C4.66748 6.64062 5.55078 7.47485 5.55078 8.5C5.55078 9.52515 4.66748 10.3594 3.58203 10.3594C2.49658 10.3594 1.61328 9.52515 1.61328 8.5C1.61328 7.47485 2.49658 6.64062 3.58203 6.64062Z" /></svg></a>';
        windowHTML +=           '<div class="window-photo-title">' + curGallery.attr('data-title') + '</div>';

        windowHTML +=           '<div class="window-photo-slider">' +
                                    '<div class="window-photo-slider-list">';

        for (var i = 0; i < galleryLength; i++) {
            var curGalleryItem = curGallery.find('.photos-detail-item').eq(i);
            windowHTML +=               '<div class="window-photo-slider-list-item">' +
                                            '<div class="window-photo-slider-list-item-inner"><img src="' + pathTemplate + 'images/loading.gif" data-src="' + curGalleryItem.find('.photos-detail-item-zoom').attr('href') + '" alt="" /></div>' +
                                        '</div>';
        }
        windowHTML +=               '</div>' +
                                '</div>';

        windowHTML +=       '</div>';

        $('.window-photo').remove();
        $('body').append(windowHTML);

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);

        $('.window-photo').each(function() {
            var marginPhoto = 166;
            if ($(window).width() < 1200) {
                marginPhoto = 253;
            }
            var newHeight = $('.window-photo-title').height() + marginPhoto;
            $('.window-photo-slider-list-item-inner').css({'height': 'calc(100vh - ' + newHeight + 'px)', 'line-height': 'calc(100vh - ' + newHeight + 'px)'});
        });

        $('.window-photo-preview-inner').mCustomScrollbar({
            axis: 'xy',
            scrollButtons: {
                enable: true
            }
        });

        $('.window-photo-slider-list').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 0.999265L2 6.99927L9 12.9993" stroke="black" stroke-width="2"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13.0012L8 7.00122L0.999999 1.00122" stroke="black" stroke-width="2"/></svg></button>',
            dots: false,
            initialSlide: curIndex,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        arrows: false
                    }
                }
            ]
        }).on('setPosition', function(event, slick) {
            var currentSlide = $('.window-photo-slider-list').slick('slickCurrentSlide');
            $('.window-photo-preview-list-item.active').removeClass('active');
            $('.window-photo-preview-list-item').eq(currentSlide).addClass('active');
            $('.window-photo-preview-inner').mCustomScrollbar('scrollTo', $('.window-photo-preview-list-item').eq(currentSlide));
            $('.window-photo-download').attr('href', $('.window-photo-slider-list-item').eq(currentSlide).find('img').attr('data-src'));
            var curIMG = $('.window-photo-slider-list-item').eq(currentSlide).find('img');
            if (curIMG.attr('src') !== curIMG.attr('data-src')) {
                var newIMG = $('<img src="" alt="" style="position:fixed; left:-9999px; top:-9999px" />');
                $('body').append(newIMG);
                newIMG.one('load', function(e) {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    newIMG.remove();
                });
                newIMG.attr('src', curIMG.attr('data-src'));
                window.setTimeout(function() {
                    curIMG.attr('src', curIMG.attr('data-src'));
                    if (newIMG) {
                        newIMG.remove();
                    }
                }, 3000);
            }
        });

        e.preventDefault();
    });

    $('body').on('click', '.window-photo-preview-list-item a', function(e) {
        var curIndex = $('.window-photo-preview-list-item').index($(this).parent());
        $('.window-photo-slider-list').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('body').on('click', '.window-photo-close', function(e) {
        $('.window-photo').remove();
        $('html').removeClass('window-photo-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $(window).scrollTop($('.wrapper').data('curScroll'));
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            if ($('.window-photo').length > 0) {
                $('.window-photo-close').trigger('click');
            }
        }
    });

    $('.side-menu-link').click(function(e) {
        if ($('html').hasClass('side-menu-open')) {
            $('html').removeClass('side-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.wrapper').css('margin-top', 0);
            $(window).scrollTop($('html').data('scrollTop'));
        } else {
            var curWidth = $(window).width();
            if (curWidth < 480) {
                curWidth = 480;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('side-menu-open');
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $('html').data('scrollTop', curScroll);
            $('.wrapper').css('margin-top', -curScroll);
        }
        e.preventDefault();
    });

});

function initForm(curForm) {
    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = '99px';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    $('.form-reset input').click(function() {
        window.setTimeout(function() {
            curForm.find('.form-input input, .form-input textarea').each(function() {
                $(this).parent().removeClass('focus');
                if ($(this).val() != '') {
                    $(this).parent().addClass('full');
                } else {
                    $(this).parent().removeClass('full');
                }
            });

            curForm.find('.form-input textarea').each(function() {
                $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
                $(this).on('input', function() {
                    this.style.height = '99px';
                    this.style.height = (this.scrollHeight) + 'px';
                });
            });

            curForm.find('.form-file input').each(function() {
                var curInput = $(this);
                var curField = curInput.parents().filter('.form-file');
                var curName = curInput.val().replace(/.*(\/|\\)/, '');
                if (curName != '') {
                    curField.find('.form-file-name').html(curName);
                } else {
                    curField.find('.form-file-name').html('');
                }
            });

            curForm.find('.form-select select').each(function() {
                var curSelect = $(this);
                curSelect.trigger({type: 'select2:select'});
            });
        }, 100);
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }
        if (curSelect.prop('multiple')) {
            options['closeOnSelect'] = false;
        }

        curSelect.select2(options);
        curSelect.on('select2:selecting', function (e) {
            if (curSelect.prop('multiple')) {
                var $searchfield = $(this).parent().find('.select2-search__field');
                $searchfield.val('').trigger('focus');
            }
        });
        if (curSelect.find('option:selected').legnth > 0 || curSelect.find('option').legnth == 1 || curSelect.find('option:first').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.validate({
        ignore: ''
    });
}

$(window).on('load resize', function() {
    if ($(window).width() > 1199) {
        $('.side-inner').mCustomScrollbar({
            axis: 'y'
        });

        $('.detail-photos, .detail-video').each(function() {
            var curList = $(this);
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
        });

        $('.photos-detail-inner').each(function() {
            if ($(this).data('shuffle') === undefined) {
                var shuffleInstance = new Shuffle(this, {
                    itemSelector: '.photos-detail-item',
                    roundTransforms: false,
                    throttleTime: 0
                });
                $(this).data('shuffle', shuffleInstance);
            }
        });
    } else {
        $('.side-inner').mCustomScrollbar('destroy');

        $('.detail-photos, .detail-video').each(function() {
            var curList = $(this);
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    adaptiveHeight: true,
                    dots: true
                });
            }
        });

        $('.photos-detail-inner').each(function() {
            if ($(this).data('shuffle') !== undefined) {
                var shuffleInstance = $(this).data('shuffle');
                shuffleInstance.destroy();
                $(this).removeData('shuffle');
            }
        });
    }

    $('.speakers').each(function() {
        var curList = $(this);

        curList.find('.speakers-item-content').css({'min-height': '0px'});

        curList.find('.speakers-item-content').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.speakers-item-content').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

    $('.window-photo').each(function() {
        var marginPhoto = 166;
        if ($(window).width() < 1200) {
            marginPhoto = 253;
        }
        var newHeight = $('.window-photo-title').height() + marginPhoto;
        $('.window-photo-slider-list-item-inner').css({'height': 'calc(100vh - ' + newHeight + 'px)', 'line-height': 'calc(100vh - ' + newHeight + 'px)'});
    });

});