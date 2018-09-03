var isIE9OrBelow = function() {
  return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

var numFormat = wNumb({
  thousand: ' '
});

$(window).scroll(function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 0) {

    $(".main").css({
      marginTop: $("header").outerHeight(true)
    });

    $("header").addClass("header-fixed");

  } else {

    $(".main").css({
      marginTop: 0
    });

    $("header").removeClass("header-fixed");

  }

});

$(window).resize(function () {

  slickResponsive();

  reviewsMakeup();

  swapMenu();

});

$(document).ready(function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 0) {

    $(".main").css({
      marginTop: $("header").outerHeight(true)
    });

    $("header").addClass("header-fixed");

  } else {

    $(".main").css({
      marginTop: 0
    });

    $("header").removeClass("header-fixed");

  }

  $(".gallery-tabs a").on("shown.bs.tab", function() {

    var tabContent = $("#" + $(this).attr("href").replace("#",""));

    tabContent.find(".gallery-slider").slick("setPosition");

  });

  $(".main-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true
  });

  $(".pros-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".history-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".pump-gallery").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });

  $(".gallery-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $(".cert-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $(".clients-slider").slick({
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });


  // Fancybox

  $("a.fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  $("a.fancybox-video").fancybox({
    helpers : {
      media : {},
      overlay: {
        locked: false
      }
    },
    type: "iframe"
  });

  // Order item remove

  $("body").on("click", ".order-item .btn-remove", function () {

    var itemId = parseInt($(this).closest(".order-item").find(".order-item-num").text());

    removeOrderItem(itemId);

  });

  // Item count

  $("body").on("click", ".btn-count-minus, .btn-count-plus", function () {

    var btn = $(this),
      field = $(this).closest(".count").find("input[type=text]");

    if (btn.hasClass("btn-count-minus") && field.val()*1 > 0) {

      var newVal = field.val()*1 - 1;
      field.val(newVal);

    }

    if (btn.hasClass("btn-count-plus")) {

      var newVal = field.val()*1 + 1;
      field.val(newVal);

    }

    if (newVal > 0) {
      field.addClass("active");
    } else {
      field.removeClass("active");
    }

    if ($(this).closest(".parts-item").length) {

      var itemId = $(this).closest(".parts-item").find(".parts-item-num").html();

      if (newVal > 0) {
        addOrderItem(itemId);

        $(this).closest(".parts-item").addClass("active");

      } else {
        removeOrderItem(itemId);

        $(this).closest(".parts-item").removeClass("active");
      }

      if ($(".parts-item.active").length) {

          $(".order-table-wrapper").fadeIn(150);
        $(".order-form").fadeIn(150);

      } else {

        $(".order-table-wrapper").fadeOut(150);
        $(".order-form").fadeOut(150);

      }

    }

    if ($(this).closest(".order-item").length) {

      var itemId = parseInt($(this).closest(".order-item").find(".order-item-num").text());

      $(".parts-item").filter(function () {

        return parseInt($(this).find(".parts-item-num").text()) == itemId;

      }).find(".count input").val(newVal);


      if (newVal == 0) {
        removeOrderItem(itemId);

        $(".parts-item").filter(function () {

          return parseInt($(this).find(".parts-item-num").text()) == itemId;

        }).find(".count input").removeClass("active");

      }


    }

  });

  // OLD ---------------------------------

  swapMenu();

  // Header menu

  $(".menu-trigger").click(function () {

    $(this).toggleClass("active");
    $(".header-menu-wrapper").fadeToggle(250, function () {

      $(".header-menu-wrapper").toggleClass("active");

    });

  });

  $(".header-menu-wrapper").click(function (e) {

    if (!$(e.target).hasClass("header-menu") &&  !$(e.target).parents().hasClass("header-menu")) {

      $(".header-menu-wrapper").fadeOut(250, function () {

        $(".header-menu-wrapper").removeClass("active");
        $(".menu-trigger").removeClass("active");

      });

    }

  });

  // Sidebar menu

  var sideMenu = $(".side-menu");

  var sideMenuTrigger = $('<div class="side-menu-trigger">' + sideMenu.find("a.active").text() + '</div>');

  sideMenu.before(sideMenuTrigger);

  sideMenuTrigger.on("click", function () {

    sideMenu.fadeToggle(150, function () {

      sideMenuTrigger.toggleClass("active");

    });

  });

  // Main apartments mobile slider

  $(".apartments-list").each(function () {

    var apartmentsList = $(this),
        apartmentsSlider = $('<div id="apartmentsSlider" class="apartments-slider"></div>');

    apartmentsList.find(".apartment-tmb").each(function () {

      var tmbClone = $(this).clone();

      var tmbSlide = tmbClone.wrap('<div class="slide"></div>').parent();

      apartmentsSlider.append(tmbSlide);

    });

    var apartmentsSliderWrapper = $('<div class="apartments-slider-wrapper"></div>');

    apartmentsSliderWrapper.append('<div class="prev-custom"></div>');
    apartmentsSliderWrapper.append('<div class="next-custom"></div>');
    apartmentsSliderWrapper.append(apartmentsSlider);

    apartmentsList.after(apartmentsSliderWrapper);


    apartmentsSlider.on('afterChange', function(event, slick, currentSlide){

      if (apartmentsSlider.find(".slick-prev").hasClass("slick-disabled")) {
        apartmentsSliderWrapper.find(".prev-custom").addClass("disabled");
      } else {
        apartmentsSliderWrapper.find(".prev-custom").removeClass("disabled");
      }

      if (apartmentsSlider.find(".slick-next").hasClass("slick-disabled")) {
        apartmentsSliderWrapper.find(".next-custom").addClass("disabled");
      } else {
        apartmentsSliderWrapper.find(".next-custom").removeClass("disabled");
      }

    });

    apartmentsSlider.on("init", function () {

      if (apartmentsSlider.find(".slick-prev").hasClass("slick-disabled")) {
        apartmentsSliderWrapper.find(".prev-custom").addClass("disabled");
      }

      if (apartmentsSlider.find(".slick-next").hasClass("slick-disabled")) {
        apartmentsSliderWrapper.find(".next-custom").addClass("disabled");
      }

      apartmentsSliderWrapper.find(".prev-custom").click(function () {
        apartmentsSlider.slick("slickPrev");
      });

      apartmentsSliderWrapper.find(".next-custom").click(function () {
        apartmentsSlider.slick("slickNext");
      });

    });


    apartmentsSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 350,
      swipe: true,
      dots: true,
      infinite: false
    });

  });






  // Booking guests

  $("body").on("click", function (e) {

    if ($(".book-guests-button").hasClass("active") && !$(e.target).hasClass("book-guests-button") && !$(e.target).parents().hasClass("book-guests-button")) {

      $(".book-guests-dropdown").fadeOut(250);

      $(".book-guests-button").removeClass("active");
      $(".book-guests-button").find(".val").removeClass("active");

    }

  });

  $("body").on("click", ".book-guests-dropdown .btn-close", function() {

    var dropdown = $(this).closest(".book-guests-dropdown");

    dropdown.fadeOut(250);

    $(this).closest(".book-guests-button").removeClass("active");
    $(this).closest(".book-guests-button").find(".val").removeClass("active");

  });

  $("body").on("click", ".book-guests-button .val", function() {

    var btn = $(this),
        dropdown = $(this).next(".book-guests-dropdown");

    if (!btn.hasClass("active")) {
      btn.addClass("active");
      btn.closest(".book-guests-button").addClass("active");
      dropdown.fadeIn(250);
    } else {
      btn.removeClass("active");
      dropdown.fadeOut(250);
      btn.closest(".book-guests-button").removeClass("active");
    }

  });

  // Team modal

  $("body").on("click", ".team-tmb", function () {

    $.ajax({
      url: $(this).attr("href"),
      dataType: "html"
    }).done(function(data) {
      var modalContent = data;

      if (!$("#teamModal").length) {

        $("body").append('\
          <div class="modal fade team-modal" id="teamModal" tabindex="-1">\n' +
          '  <div class="modal-dialog">\n' +
          '    <div class="modal-content">\n' +
          '      <div class="modal-header">\n' +
          '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>\n' +
          '      </div>\n' +
          '      <div class="modal-body">\n' +
          '      </div>\n' +
          '    </div>\n' +
          '  </div>\n' +
          '</div>\
        ');

      }

      $("#teamModal .modal-body").html(data);

      $("#teamModal").modal("show");

    });

    return false;

  });

  // Video

  $("body").on("click", ".slide-video", function () {

    var slideHeight = $(this).height();

    $(this).html('<iframe height="' + slideHeight + '" src="' + $(this).data("video") + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

  });



  
  // Reviews list gallery slider

  $(".review-tmb-gallery-slider").slick({
    variableWidth: true,
    slidesToScroll: 3,
    infinite: false
  });

  // Reviews slider

  $(".reviews-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    adaptiveHeight: true
  });

  // Restaurant menu

  $(".rest-menu-nav").on("init", function () {

    $(this).find(".menu-nav-tmb").removeClass("active");
    $(this).find(".slide[data-slick-index=0] .menu-nav-tmb").addClass("active");

  });

  $(".rest-menu-nav").slick({
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $(".rest-menu-slider").on("init", function () {

    $(".rest-menu-nav .menu-nav-tmb").click(function () {

      $(this).closest(".rest-menu-nav").find(".menu-nav-tmb").removeClass("active");
      $(this).addClass("active");

      $(".rest-menu-slider").slick("slickGoTo", $(this).closest(".slick-slide").prevAll().not(".slick-cloned").length)

    });

  });

  $(".rest-menu-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false,
    adaptiveHeight: true
  });

  // Features gallery

  $(".features-galleries-slider").on("init", function () {

    var slider = $(this);

    var navTmbs = $(this).closest(".features-gallery-wrapper").find(".nav-tmb");

    navTmbs.click(function () {

      navTmbs.removeClass("active");

      $(this).addClass("active");

      slider.slick("slickGoTo", $(this).prevAll().length);

    });

  });

  $(".features-galleries-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    swipe: false,
    arrows: false
  });

  $(".features-gallery").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  });


  $(".guests-select").each(function () {

    var gSelect = $(this);

    gSelect.on('loaded.bs.select changed.bs.select', function (e) {

      var formattedVal = "<span class='select-num'>" + gSelect.val() + "</span>" + "<span class='select-text'>" + declOfNum(gSelect.val(), ['гость', 'гостя', 'гостей']) + "</span>";


      gSelect.siblings(".dropdown-toggle").find(".filter-option").html(formattedVal);

    });


  });


  // Expandable

  $("body").on("click", ".expandable-trigger", function () {

    var exTrigger = $(this);

    if (!exTrigger.hasClass("active")) {

      exTrigger.closest(".expandable").find(".expandable-content").slideDown(500, function () {
        exTrigger.addClass("active").html(exTrigger.data("collapsetext"))
      });

    } else {

      exTrigger.closest(".expandable").find(".expandable-content").slideUp(500, function () {
        exTrigger.removeClass("active").html(exTrigger.data("expandtext"))
      });

    }

  });

  // Photo-slider

  $(".photo-slider").on("afterChange", function(event, slick, currentSlide) {

    $(this).closest(".photo-slider-wrapper").find(".slider-thumbs-item").removeClass("active");
    $(this).closest(".photo-slider-wrapper").find(".slider-thumbs-item").filter(function () {
      return $(this).prevAll().length == currentSlide;
    }).addClass("active");

    if ($(this).closest(".page-content-apartment")) {
      $(this).closest(".page-content-apartment").find(".slider-thumbs-item").removeClass("active");
      $(this).closest(".page-content-apartment").find(".slider-thumbs-item").filter(function () {
        return $(this).prevAll().length == currentSlide;
      }).addClass("active");
    }

  });

  $(".slider-thumbs-item").click(function () {

    if ($(this).closest(".slider-thumbs").data("slider")) {
      var slider = $($(this).closest(".slider-thumbs").data("slider"));
    } else {
      var slider = $(this).closest(".photo-slider-wrapper").find(".photo-slider");
    }


    slider.slick("slickGoTo", $(this).prevAll().length);

    $(this).closest(".slider-thumbs").find(".slider-thumbs-item").removeClass("active");
    $(this).addClass("active");

  });

  $(".photo-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: 'ondemand'
  });

  // Side menu

  $(".side-menu-arrow").click(function () {

    var parentLi = $(this).closest("li");

    parentLi.find(".side-submenu").slideToggle(250, function () {
      parentLi.toggleClass("active");
    });

  });

  // Restaurants slider

  $('.restaurants-slider').on('afterChange', function(event, slick, currentSlide){

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .prev-custom").removeClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    } else {
      $(".restaurants-slider-wrapper .next-custom").removeClass("disabled");
    }

  });

  $(".restaurants-slider").on("init", function () {

    if ($(".restaurants-slider .slick-prev").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .prev-custom").addClass("disabled");
    }

    if ($(".restaurants-slider .slick-next").hasClass("slick-disabled")) {
      $(".restaurants-slider-wrapper .next-custom").addClass("disabled");
    }

    $(".restaurants-slider-wrapper .prev-custom").click(function () {
      $(".restaurants-slider").slick("slickPrev");
    });

    $(".restaurants-slider-wrapper .next-custom").click(function () {
      $(".restaurants-slider").slick("slickNext");
    });

  });

  $(".restaurants-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 350,
          swipe: true,
          dots: true
        }
      }
    ]

  });

  // Hotel map

  $(".hotel-map-inner").panzoom({
    minScale: 1,
    contain: 'automatic'
  }).panzoom('zoom');

  // Main menu

  $(".sub-submenu .h4").each(function () {

    if ($(this).next("ul").length) {

      $(this).addClass("has-submenu");

    }

  });

  $("body").on("click", ".sub-submenu .h4", function (e) {

    console.log("lick 1231")

    var li = $(this);

    if ($("#mobile-indicator").css("display") == "block" && $(this).hasClass("has-submenu") && !$(e.target).parent().hasClass("h4")) {

      var submenu = $(this).next("ul");

      li.toggleClass("open");
      submenu.slideToggle(350);

    }

  });

  $("body").on("click", ".submenu li, .navbar-nav li", function (e) {
    
    var li = $(this);

    if ($("#mobile-indicator").css("display") == "block" && $(this).children("a").hasClass("has-submenu") && !$(e.target).hasClass("has-submenu") && !$(e.target).hasClass("sub-submenu") && !$(e.target).parents().hasClass("sub-submenu")) {
    
      var submenu = $(this).find(".sub-submenu");
      
      li.toggleClass("open");
      submenu.slideToggle(350);
    
    }
    
  });

  $(".submenu li, .navbar-nav li").on("mouseenter", function () {

    if ($("#mobile-indicator").css("display") != "block") {

      if ($(this).find("a.has-submenu").length) {
        $(this).addClass("open");
        $(this).find(".sub-submenu").fadeIn(150);

        if ($(this).find(".sub-submenu").offset().left + 646 > $(window).width()) {
          $(this).find(".sub-submenu").addClass("sub-submenu-l");
        }

      }
    }

  });

  $(".submenu li, .navbar-nav li").on("mouseleave", function () {

    if ($("#mobile-indicator").css("display") != "block") {

      if ($(this).find("a.has-submenu").length) {
        $(this).removeClass("open");
        $(this).find(".sub-submenu").fadeOut(150);
      }

    }

  });

  // Main menu END

  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });

  // Forms


  if (isIE9OrBelow()) {
    $(".form-file-pic").hide();
  }

  if (!isIE9OrBelow()) {

    $("input[type=file]").each(function () {
      var fileInput = $(this);
      $(this).nicefileinput({
        label: function () {
          if (fileInput.data("title")) {
            return fileInput.data("title")
          } else {
            return "Выбрать файл"
          }
        }
      });
    });

  }

  $("body").on("mouseup", "li.dropdown-header", function () {
    $(this).toggleClass("active");
    $(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
    return false;
  });

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
      dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
    }
  });

  $("select.select-grantee-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addGranteeModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("select.select-operator-add").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-top-button").length) {
      dropdownHeader = '\
      <div class="dropdown-top-button">\
        <a class="link-add" href="#" data-toggle="modal" data-target="#addOperatorModal"><span>Добавить нового</span></a>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").prepend(dropdownHeader);
    }
  });

  $("body").on("click",".bootstrap-select .btn-save", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
    return false;
  });

  $("body").on("click",".bootstrap-select .btn-cancel", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
    return false;
  });

  $("#contest_operators").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['оператор', 'оператора', 'операторов']);
    }
  });

  $("#search_brand").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['бренд', 'бренда', 'брендов']);
    }
  });

  $("#search_price").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['цена', 'цены', 'цен']);
    }
  });

  $(".select-grantees").selectpicker({
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['грантополучатель', 'грантополучателя', 'грантополучателей']);
    }
  });

  $("#search_stock").selectpicker({
    selectAllText: "Выбрать всё",
    deselectAllText: "Снять выбор",
    selectedTextFormat: "count",
    countSelectedText: function(count) {
      return count + " " + declOfNum(count, ['вариант', 'варианта', 'вариантов']);
    }
  });

  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  })

  $("input.input-phone").mask("+7 (999) 999-99-99");

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

  slickResponsive();

});

// Contacts map

function initMap() {
  var myLatLng = {lat: 56.885553, lng: 53.343791};
  var myCenter = {lat: 56.885553, lng: 53.343791};

  var map = new google.maps.Map(document.getElementById('contactsMap'), {
    zoom: 15,
    center: myCenter
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

function initMapOffice() {
  var myLatLng = {lat: 56.885553, lng: 53.343791};
  var myCenter = {lat: 56.885553, lng: 53.343791};

  var map = new google.maps.Map(document.getElementById('contactsMapOffice'), {
    zoom: 16,
    center: myCenter
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

function initMapShop() {
  var myLatLng = {lat: 56.885553, lng: 53.343791};
  var myCenter = {lat: 56.885553, lng: 53.343791};

  var map = new google.maps.Map(document.getElementById('contactsMapShop'), {
    zoom: 16,
    center: myCenter
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

if ($("#contactsMap").length) {
  google.maps.event.addDomListener(window, 'load', initMap);
}

if ($("#contactsMapOffice").length) {
  google.maps.event.addDomListener(window, 'load', initMapOffice);
}

if ($("#contactsMapShop").length) {
  google.maps.event.addDomListener(window, 'load', initMapShop);
}

function yearsName(age) {
  var txt;
  count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count == 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return txt;
}

function calcCredit(S,p,n){

  p = +p / 1200;
  n = +n * 12;

  return Math.round(+S * p / (1 - Math.pow(1 + p, -n)));

}

function validateForms() {

  console.log("validate")

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function cartTotal() {

  var cartTotal = 0;

  $(".cart-item").each(function () {

    if ($(this).data("price")) {
      var itemPrice = $(this).data("price") * $(this).find(".count-input").val();
      cartTotal += itemPrice;
    }

  });

  $(".cart-total-price .price").html(numFormat.to(cartTotal));
  $(".cart-total-all").html(numFormat.to(cartTotal - $(".cart-discount .price").html().replace(/\s+/g, '')));

}

function calcOrder() {

  var orderPrice = $(".order-price-val").html();
  orderPrice = orderPrice.replace(/\s+/g, '');

  var orderDiscount = 0;

  var orderTotal = +orderPrice;

  $(".order-form [data-price]").each(function () {
    if ($(this).attr("type") != "radio") {
      orderTotal += $(this).data("price") - 0;
    } else {
      if ($(this).is(":checked")) {
        orderTotal += $(this).data("price") - 0;
      }
    }
  });

  $(".order-form [data-discount]").each(function () {
    orderDiscount -= $(this).data("discount") - 0;
  });

  //console.log(orderDiscount)

  var orderCouponDiscount = +Math.floor(orderPrice.replace(/\s+/g, '')*(+$("#order_coupon_discount").val()/100));

  orderDiscount -= orderCouponDiscount;

  console.log(orderTotal)

  $(".order-shipping-val").html($("[name='order_shipping_1']:checked").data("price"));

  $(".order-coupon-val").html(orderCouponDiscount);
  $(".order-coupon-percent").html("-"+$("#order_coupon_discount").val());

  $(".order-total-val").html(numFormat.to(orderTotal + orderDiscount));

}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function resizeVideo() {
  $(".home-section-video").css({
    height: $(window).height()
  });

  $(".home-section-video-wrapper").css({
    height: $(window).height() + 800
  });

}

function parallax(obj, objOffset, speed) {

  var objPos = - $(window).scrollTop() + obj.closest(".parallax-wrapper").offset().top + objOffset

  obj.css({
    transform: "translateY(" + objPos + "px)"
  });

}

function fancyboxFix() {

  if($('#mobile-indicator').css('display') == 'block') {
    $('.gallery-big .fancybox').off("click.fb-start");
    $('.gallery-big .fancybox').click(function () {
      return false;
    });
  } else {

    $('.gallery-big .fancybox').fancybox();

  }

}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    if ($(".main-slider").hasClass("slick-initialized")) {

      $(".main-slider .slide-current").removeClass("slide-current");

    }

    if (!$(".events-list .row").hasClass("slick-initialized")) {

      eventsSliderWrapper = $(".events-list");
      eventsSlider = $(".events-list .row");

      eventsSliderWrapper.append('<div class="prev-custom"></div>');
      eventsSliderWrapper.append('<div class="next-custom"></div>');

      eventsSlider.on('afterChange', function(event, slick, currentSlide){

        if (eventsSlider.find(".slick-prev").hasClass("slick-disabled")) {
          eventsSliderWrapper.find(".prev-custom").addClass("disabled");
        } else {
          eventsSliderWrapper.find(".prev-custom").removeClass("disabled");
        }

        if (eventsSlider.find(".slick-next").hasClass("slick-disabled")) {
          eventsSliderWrapper.find(".next-custom").addClass("disabled");
        } else {
          eventsSliderWrapper.find(".next-custom").removeClass("disabled");
        }

      });

      eventsSlider.on("init", function () {

        if (eventsSlider.find(".slick-prev").hasClass("slick-disabled")) {
          eventsSliderWrapper.find(".prev-custom").addClass("disabled");
        }

        if (eventsSlider.find(".slick-next").hasClass("slick-disabled")) {
          eventsSliderWrapper.find(".next-custom").addClass("disabled");
        }

        eventsSliderWrapper.find(".prev-custom").click(function () {
          eventsSlider.slick("slickPrev");
        });

        eventsSliderWrapper.find(".next-custom").click(function () {
          eventsSlider.slick("slickNext");
        });

      });


      eventsSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 350,
        swipe: true,
        dots: true,
        infinite: false
      });
      
    }

    if ($(".restaurants-slider").hasClass("slick-initialized")) {

      if (!$(".restaurants-slider .slide-added").length) {

        var slideAdded = '\
            <a class="restaurant-tmb" href="' + $(".restaurants-top-r").attr("href") +  '" tabindex="-1">\
              <div class="restaurant-tmb-pic" style="background-image:url(' + $(".restaurants-top-pic img").attr("src") + ');"></div>\
              <div class="restaurant-tmb-cont">\
                <div class="restaurant-tmb-inner">\
                  <div class="restaurant-tmb-info">\
                    <div class="h3">' + $(".restaurants-top-info .h3").html() + '</div>\
                    <div class="restaurant-tmb-capacity">\
                      <div class="capacity">' + $(".restaurants-top-info .capacity").text() + '</div>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </a>\
        ';

        $(".restaurants-slider").slick("slickAdd", '<div class="slide slide-added">' + slideAdded + '</div>');

        $(".restaurants-slider-wrapper .next-custom").removeClass("disabled");

      }


    }


    $(".also-catalog > .row, .popular-catalog > .row").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      dots: true,
      arrows: false
    });

  } else {

    if ($(".main-slider").hasClass("slick-initialized")) {

      $(".main-slider .slide-current").removeClass("slide-current");

      $(".main-slider .slick-current").next().addClass("slide-current");

    }

    if ($(".also-catalog > .row").hasClass("slick-initialized")) {
      $(".also-catalog > .row").slick("unslick");
    }

    if ($(".popular-catalog > .row").hasClass("slick-initialized")) {
      $(".popular-catalog > .row").slick("unslick");
    }

    if ($(".events-list .row").hasClass("slick-initialized")) {
      $(".events-list .row").slick("unslick");
    }

    if ($(".restaurants-slider").hasClass("slick-initialized")) {

      if ($(".restaurants-slider .slide-added").length) {

        $(".restaurants-slider").slick("slickRemove", $(".restaurants-slider .slide-added").data("slick-index"));

      }

    }

  }

}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function fixElements() {
  var scrollPos = $(window).scrollTop();

  if ($(".data-table").length) {

    if (scrollPos > $(".data-table").offset().top) {
      $(".data-table-over-wrapper").css({
        marginTop: $(".data-table .table-header").height()
      });

      $(".data-table .table-header").addClass("table-header-fixed");



    } else {
      $(".data-table-over-wrapper").css({
        marginTop: 0
      });

      $(".data-table .table-header").removeClass("table-header-fixed");

    }

    if($(".data-table-wrapper .mCSB_container").length > 0) {
      $(".data-table .table-header-fixed tr").css({
          marginLeft: $(".data-table-wrapper .mCSB_container").position().left
      });
    }

  }


  if ($(".data-table").length && $(".data-table-footer").length) {
    if (scrollPos + $(window).height() < $(".data-table").offset().top + $(".data-table").height() + $(".data-table-footer").outerHeight()) {
      $(".data-table-footer").addClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").addClass("scroll-tools-fixed").css({
        bottom: $(".data-table-footer").outerHeight()
      });
    } else {
      $(".data-table-footer").removeClass("data-table-footer-fixed");
      $(".data-table-wrapper .mCSB_scrollTools").removeClass("scroll-tools-fixed").css({
        bottom: 0
      });
    }
  }
}

function datepickerRender(datepicker) {

  if (!datepicker.hasClass("rendered")) {
    datepicker.addClass("rendered");
    datepicker.next(".picker").find("select").selectpicker();
    datepicker.next(".picker").find("div.picker__select--year").wrap("<div class='select-wrapper select-wrapper-year'></div>").before("<label>Год</label>");
    datepicker.next(".picker").find("div.picker__select--month").wrap("<div class='select-wrapper select-wrapper-month'></div>").before("<label>Месяц</label>");
    datepicker.next(".picker").find(".picker__header").append("<div class='picker-table-header'>Дата</div>");
  }
  
}

function fixTables() {

  $(".data-table").each(function () {
    $(this).css({
      width: "0"
    })
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table th").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table tr").each(function () {
    $(this).css({
      width: "auto"
    });
  });



  $(".data-table").each(function () {
    $(this).css({
      width: "auto"
    });
  });

  $(".data-table td").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".table-header tr").each(function () {
    $(this).css({
      width: $(this).outerWidth()
    });
  });

  $(".data-table").css({
    display: "block",
    width: $(".data-table").width()
  }).css({
    display: "table"
  });

  $(".data-table th").each(function () {
    th = $(this);
    th.css({
      width: $(this).closest("table").find("td").filter(function () {return $(this).prevAll().length == th.prevAll().length}).outerWidth()
    });
  });

}

function addDays(startDate,numberOfDays)
{
  var returnDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()+numberOfDays,
    startDate.getHours(),
    startDate.getMinutes(),
    startDate.getSeconds());
  return returnDate;
}

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function reviewsMakeup() {

  $(".review-tmb-text").each(function () {

    if ($(this).closest(".review-tmb").find(".review-tmb-gallery").length) {
      var galHeight = 50;
    } else {
      var galHeight = 0;
    }

    $(this).css({
      height: $(this).closest(".review-tmb").height()
            - $(this).closest(".review-tmb").find(".review-tmb-author").outerHeight(true)
            - $(this).closest(".review-tmb").find(".h3").outerHeight(true)
            - galHeight
            - 28
            - 20
    })

  });

}

function formSuccess(form) {

  form.find(".form-group input, .form-group textarea").val("");
  form.find(".placeholder").show();
  $("#successModal").modal("show");
  form.closest(".modal").modal("hide");
}

function swapMenu() {

  if ($("#mobile-indicator").css("display") == "block") {

    if ($(".header-menu").next().hasClass("header-submenu")) {
      swap($(".header-menu"), $(".header-submenu"));
    }

  } else {

    if ($(".header-submenu").next().hasClass("header-menu")) {
      swap($(".header-submenu"), $(".header-menu"));
    }

  }

}

function swap(a, b) {
  a = $(a); b = $(b);
  var tmp = $('<span>').hide();
  a.before(tmp);
  b.before(a);
  tmp.replaceWith(b);
};

function addOrderItem(itemId) {

  var itemId = itemId;

  var itemName = $(".parts-item").filter(function () {

    return $(this).find(".parts-item-num").html() == itemId

  }).find(".parts-item-name").html();

  var itemCount = $(".parts-item").filter(function () {

    return $(this).find(".parts-item-num").html() == itemId

  }).find(".count input").val();

  var orderItemRow = $('\
  <tr class="order-item">\
    <td class="order-item-num">\
    ' + itemId + '\
    </td>\
    <td class="order-item-name">\
    ' + itemName + '\
    </td>\
    <td class="order-item-count">\
      <div class="count clearfix">\
        <div class="btn-count-minus"></div>\
        <div class="count-field">\
          <input class="numeric" type="text" value="' + itemCount + '">\
        </div>\
        <div class="btn-count-plus"></div>\
      </div>\
    </td>\
    <td class="order-item-remove">\
      <div class="btn-remove"></div>\
    </td>\
  </tr>');

  if ($(".order-table tr").length == 0) {

    $(".order-table").append(orderItemRow);

  } else {


    var isInOrder = false;

    $(".order-item-num").each(function () {

      if (parseInt($(this).text()) == itemId) {
        isInOrder = true;
        return false;
      }

    });

    if (!isInOrder) {
      var prevIndex = parseInt($(".order-item").first().find(".order-item-num").text());
      var nextIndex = parseInt($(".order-item").last().find(".order-item-num").text());

      $(".order-item").each(function () {

        var orderItem = $(this);

        var thisIndex = parseInt($(this).find(".order-item-num").text());

        if ($(this).prev(".order-item").length) {
          prevIndex = parseInt($(this).prev().find(".order-item-num").text());
        }

        if ($(this).next(".order-item").length) {
          nextIndex = parseInt($(this).next().find(".order-item-num").text());
        }



        if (itemId < thisIndex) {

          orderItem.before(orderItemRow);

          return false;

        } else if (thisIndex <= nextIndex) {

          orderItem.after(orderItemRow);

        }




      });

    } else {

      var itemCount = $(".parts-item").filter(function () {

        return parseInt($(this).find(".parts-item-num").text()) == itemId

      }).find(".count input").val();

      $(".order-item").filter(function () {

        return parseInt($(this).find(".order-item-num").text()) == itemId

      }).find(".count input").val(itemCount);

    }

  }


}

function removeOrderItem(itemId) {

  var itemId = itemId;

  $(".order-item").filter(function () {

    return parseInt($(this).find(".order-item-num").text()) == itemId

  }).remove();

  $(".parts-item").filter(function () {

    return parseInt($(this).find(".parts-item-num").text()) == itemId

  }).removeClass("active");

  $(".parts-item").filter(function () {

    return parseInt($(this).find(".parts-item-num").text()) == itemId

  }).find(".count input").val("0").removeClass("active");

  if (!$(".parts-item.active").length) {

    $(".order-table-wrapper").fadeOut(150);
    $(".order-form").fadeOut(150);

  }

}