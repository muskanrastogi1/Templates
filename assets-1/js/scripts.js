(function (window, document, $) {
	"use strict";

	function ntrAlert() {
		var myAlerts = $('[data-ntr-alert]');
		if (myAlerts.length) {
			myAlerts.each(function (i, el) {
				var myAlert = $(el);
				var myAlertClose = $('.alert_close', myAlert);
				myAlertClose.on('click', function (e) {
					e.preventDefault();
					myAlert.hide();
				});
			});
		}
	}
	function ntrAccordion() {
		var myAccordions = $('[data-ntr-accordion]');
		if (myAccordions.length) {
			myAccordions.each(function (i, el) {
				var myAccordion = $(el);
				var myMode = myAccordion.data('ntrAccordion') === 'multiple' ? 'multiple' : 'single';
				var myItems = $('.accordion_item', myAccordion);
				var myIcons = $('.accordion_item_icon', myAccordion);

				// If Active
				myItems.filter('.is-active').find('.accordion_item_icon').toggleClass('is-arrow-right2 is-arrow-down2');
				
				// Click
				$('.accordion_item_header', myAccordion).on('click', function (e) {
					e.preventDefault();
					var self = $(this);
					var selfItem = self.parent('.accordion_item');
					var selfIcon = $('.accordion_item_icon', self);
					selfItem.toggleClass('is-active');
					selfIcon.toggleClass('is-arrow-right2 is-arrow-down2');
					if (myMode === 'single') {
						myItems.not(selfItem).removeClass('is-active');
						myIcons.not(selfIcon).removeClass('is-arrow-down2').addClass('is-arrow-right2');
					}
				});
			});
		}
	}
	function ntrLoading() {
		var myLoading = $('[data-ntr-loading]');
		if (myLoading.length) {
			$(window).on('load', function() {
				setTimeout(function () {
					myLoading.removeClass('is-active');
				}, 300);
			});
		}
	}
	function ntrBacktop() {
		var myBacktop = $('[data-ntr-backtop]');
		if (myBacktop.length) {
			var myWindow = $(window);
			var myTimer;
			myWindow.on('scroll', function() {
				if (myTimer) {
					clearTimeout(myTimer);
				}
				myTimer = setTimeout(function() {
					if (myWindow.scrollTop() > 200) {
						myBacktop.addClass('is-active');
					} else {
						myBacktop.removeClass('is-active');
					}
				}, 200);
			});
			myBacktop.on('click', function(e) {
				e.preventDefault();
				$('html, body').animate({scrollTop: 0}, 800);
			});
		}
	}
	function ntrTab() {
		var myTabs = $('[data-ntr-tab]');
		if (myTabs.length) {
			myTabs.each(function (i, el) {
				var myTab = $(el);
				var myTabItems = $('> .tab_nav .tab_nav_item', myTab);
				var myTabPages = $('> .tab_page', myTab);
				var myActiveTab = myTabItems.first();
				if (myTabItems.filter('.is-active').length) {
					myActiveTab = myTabItems.filter('.is-active').first();
				}
				var myActiveTabId = myActiveTab.data('id');
				myTabItems.filter('[data-id="'+ myActiveTabId +'"]').addClass('is-active');
				myTabPages.filter('[data-id="'+ myActiveTabId +'"]').addClass('is-active');
				myTabItems.on('click', function (e) {
					e.preventDefault();
					var self = $(this);
					var selfId = self.data('id');
					myTabItems.removeClass('is-active');
					myTabPages.removeClass('is-active');
					self.addClass('is-active');
					myTabPages.filter('[data-id="'+ selfId +'"]').addClass('is-active');
				});
			});
		}
	}
	function ntrCounter() {	
		var myCounters = $('[data-ntr-counter]');
		if (myCounters.length) {
			myCounters.each(function (i, el) {
				var myCounter = $(el);
				var myData = myCounter.data('ntrCounter');
				new Waypoint({
					element: myCounter,
					handler: function(direction) {
						var self = this;
						if (direction === 'down') {
							$('.counter_number', myCounter).countTo({
								from: myData.from || 0,
								to: myData.to || 100,
								speed: myData.speed || 5000,
								refreshInterval: myData.refreshInterval || 100,
							});
							self.destroy();
						}
					},
					offset: '95%'
				});
			});
		}
	}
	function ntrAnimation() {
		$(window).on('load', function() {
			setTimeout(function () {
				AOS.init();
			}, 300);
		});
	}
	function ntrBackground() {
		var myElements = $('[data-ntr-background]');
		if (myElements.length) {
			myElements.each(function (i, el) {
				var myElement = $(el);
				var myBackground = myElement.data('ntrBackground');
				if (!myBackground) {
					return true; // next iteration
				}
				myElement.css({'background-image': 'url("'+ myBackground +'")'});
				myElement.removeAttr('data-ntr-background');
			});
		}
	}
	function ntrMap() {
		var myMaps = $('[data-ntr-map]');
		if (myMaps.length) {
			if (typeof google !== 'undefined') {
				myMaps.each(function (i, el) {
					var myMap = el;
					var myData = $(myMap).data('ntrMap');
					if (!myData.lat || !myData.lng) {
						return true; // next iteration
					}
					var myGoogleMap = new google.maps.Map(myMap, {
						disableDefaultUI: myData.hideControls || false,
						zoom: myData.zoom || 17,
						center: {lat: myData.lat, lng: myData.lng}
					});
					if (myData.marker === true) {
						var myMarker = new google.maps.Marker({
							position: {lat: myData.lat, lng: myData.lng},
							map: myGoogleMap
						});
					}
				});
			}
		}
	}
	function ntrUISlider() {
		var mySliders = $('[data-ntr-ui-slider]');
		if (mySliders.length) {
			mySliders.each(function (i, el) {
				var mySlider = $(el);
				var myData = mySlider.data('ntrUiSlider');
				mySlider.slider({
					range: true,
					min: myData.min,
					max: myData.max,
					values: [myData.value1, myData.value2]
				});
			});
		}
	}
	function ntrUISpinner() {
		var mySpinners = $('[data-ntr-ui-spinner]');
		if (mySpinners.length) {
			mySpinners.each(function (i, el) {
				var mySpinner = $(el);
				var myData = mySpinner.data('ntrUiSpinner');
				mySpinner.spinner({
					min: myData.min || null,
					max: myData.max || null,
					change: function(event, ui) {
						var self = $(this);
						var myVal = self.spinner('value');
						var myMin = self.spinner('option', 'min');
						var myMax = self.spinner('option', 'max');
						if (myVal === null || myVal < myMin) {
							myVal = myMin;
						}
						if (myVal > myMax) {
							myVal = myMax;
						}
						myVal = parseInt(myVal, 10);
						self.spinner('value', myVal);
					}
				});
			});
		}
	}
	function ntrUITooltip() {
		var myTooltips = $('[data-ntr-ui-tooltip]');
		if (myTooltips.length) {
			myTooltips.each(function (i, el) {
				var myTooltip = $(el);
				var myData = myTooltip.data('ntrUiTooltip');
				if (!myData) {
					return true; // next iteration
				}
				var myPosition = {};
				var myClasses = {
					'ui-tooltip': 'ui-corner-all ui-widget-shadow'
				};
				if (myData.position === 'top') {
					myPosition.my = 'center bottom-25';
					myPosition.at = 'center top';
					myClasses = {
						'ui-tooltip': 'ui-corner-all ui-widget-shadow is-top'
					};
				}
				if (myData.position === 'left') {
					myPosition.my = 'right-25 center';
					myPosition.at = 'left center';
					myClasses = {
						'ui-tooltip': 'ui-corner-all ui-widget-shadow is-left'
					};
				}
				if (myData.position === 'right') {
					myPosition.my = 'left+25 center';
					myPosition.at = 'right center';
					myClasses = {
						'ui-tooltip': 'ui-corner-all ui-widget-shadow is-right'
					};
				}
				if (myData.position === 'bottom') {
					myPosition.my = 'center top+25';
					myPosition.at = 'center bottom';
					myClasses = {
						'ui-tooltip': 'ui-corner-all ui-widget-shadow is-bottom'
					};
				}
				myTooltip.tooltip({
					classes: myClasses,
					position: myPosition,
					items: myTooltip,
					content: function () {
						return myData.content;
					}
				});
			});
		}
	}
	function ntrIsotope() {
		var myIsotopes = $('[data-ntr-isotope]');
		if (myIsotopes.length) {
			myIsotopes.each(function (i, el) {
				var myIsotope = $(el);
				var myData = myIsotope.data('ntrIsotope');
				if (!myData.itemSelector) {
					return true; // next iteration
				}
				myIsotope.imagesLoaded(function() {
					// Isotope Options
					var myIsotopeOptions = {
						percentPosition: true,
						layoutMode: myData.layoutMode || 'masonry',
						itemSelector: myData.itemSelector,
						masonry: {
							columnWidth: '.grid_sizer'
						}
					};
					// Isotope Init
					myIsotope.isotope(myIsotopeOptions);
					// Isotope Filter
					if ($('[data-ntr-isotope-filter]').length) {
						var myFilters = $('[data-ntr-isotope-filter]').filter(function (i, el) {
							var myFilter = $(el);
							var myFilterData = myFilter.data('ntrIsotopeFilter');
							return myFilterData.name === myData.name && myFilterData.selector;
						});
						if (myFilters.length) {
							myFilters.on('click', function (e) {
								e.preventDefault();
								var myFilter = $(this);
								var myFilterData = myFilter.data('ntrIsotopeFilter');
								var myFilterSelector = myFilterData.selector;
								var myFilterParent = myFilter.parent();
								myFilterParent.siblings().removeClass('is-active');
								myFilterParent.addClass('is-active');
								myIsotope.isotope({filter: myFilterSelector});
							});
						}
					}
				});
			});
		}
	}
	function ntrLightbox() {
		var myLightboxes = $('[data-ntr-lightbox]');
		if (myLightboxes.length) {
			myLightboxes.each(function (i, el) {
				var myLightbox = $(el);
				var myData = myLightbox.data('ntrLightbox');
				var myOptions = {};
				if (!myData || !myData.type) {
					return true; // next iteration
				}
				if (myData.type === 'gallery') {
					if (!myData.selector) {
						return true; // next iteration
					}
					myOptions = {
						delegate: myData.selector,
						type: 'image',
						gallery: {
						  enabled: true
						}
					};
					
				}
				if (myData.type === 'image') {
					myOptions = {
						type: 'image'
					};
				}
				if (myData.type === 'iframe') {
					myOptions = {
						type: 'iframe'
					};
				}
				if (myData.type === 'inline') {
					myOptions = {
						type: 'inline',
					};
				}
				if (myData.type === 'modal') {
					myOptions = {
						type: 'inline',
						modal: true
					};
				}
				if (myData.type === 'ajax') {
					myOptions = {
						type: 'ajax',
						overflowY: 'scroll'
					};
				}
				myLightbox.magnificPopup(myOptions);
			});
		}
	}
	function ntrRatingSelect() {
		var myRatings = $('[data-ntr-rating-select]');
		if (myRatings.length) {
			myRatings.each(function (i, el) {
				var myRating = $(el);
				var myRatingItems = $('.rating-select_item', myRating);
				var myRatingResult  = $('select', myRating);
				myRatingItems.on('mouseenter', function (e) {
					var self = $(this);
					var selfIndex = self.index();
					var selfAndPrevs = myRatingItems.slice(0, (selfIndex + 1));
					selfAndPrevs.not('.is-selected').removeClass('is-star-outline').addClass('is-star');
				});
				myRatingItems.on('mouseleave', function (e) {
					myRatingItems.not('.is-selected').removeClass('is-star').addClass('is-star-outline');
				});
				myRatingItems.on('click', function (e) {
					e.preventDefault();
					var self = $(this);
					var selfId = self.data('id');
					var selfIndex = self.index();
					var selfAndPrevs = myRatingItems.slice(0, (selfIndex + 1));
					// Reset Items
					myRatingItems.removeClass('is-star is-selected').addClass('is-star-outline');
					// Select Self and Prevs
					selfAndPrevs.removeClass('is-star-outline').addClass('is-star is-selected');
					// Set Value
					myRatingResult.val(selfId).trigger('change');
				});
			});
		}
	}
	function ntrHeader() {
		var myHeader = $('[data-ntr-header]');
		if (myHeader.length) {
			var myHeaderSearch = $('.header_search', myHeader);
			var myHeaderSearchForm = $('.header_search_form', myHeader);
			var myHeaderSearchInput = $('.header_search_input', myHeader);
			var myHeaderSearchOpen = $('.header_search_open', myHeader);
			var myHeaderSearchClose = $('.header_search_close', myHeader);
			var myHeaderLang = $('.header_lang', myHeader);
			var myHeaderLangLabel = $('.header_lang_label', myHeader);
			var myHeaderNav = $('.header_nav');
			var myHeaderNavArrows = $('.header_nav_arrow', myHeaderNav);
			var myHeaderNavToggle = $('.header_nav_toggle', myHeader);
			var myHeaderNavClose = $('.header_nav_close', myHeader);
			var myHeaderCart = $('.header_cart', myHeader);
			var myHeaderCartLabel = $('.header_cart_label', myHeader);
			var myHeaderHandlers = {
				searchOpen: function () {
					myHeaderSearch.addClass('is-active');
					myHeaderSearchInput.focus();
					$(document).on('click.ntrHeaderSearch', function (e) {
						if (!$(e.target).closest(myHeaderSearchOpen).length) {
							if (!$(e.target).closest(myHeaderSearch).length) {
								myHeaderHandlers.searchClose();
							}
						}
					});
					$(document).on('keyup.ntrHeaderSearch', function (e) {
						if (e.keyCode === 27) {
							myHeaderHandlers.searchClose();
						}
					});
				},
				searchClose: function () {
					myHeaderSearch.removeClass('is-active');
					myHeaderSearchForm[0].reset();
					$(document).off('click.ntrHeaderSearch');
					$(document).off('keyup.ntrHeaderSearch');
				},
				langOpen: function () {
					myHeaderLang.addClass('is-active');
					$(document).on('click.ntrHeaderLang', function (e) {
						if (!$(e.target).closest(myHeaderLang).length) {
							myHeaderHandlers.langClose();
						}
					});
					$(document).on('keyup.ntrHeaderLang', function (e) {
						if (e.keyCode === 27) {
							myHeaderHandlers.langClose();
						}
					});
				},
				langClose: function () {
					myHeaderLang.removeClass('is-active');
					$(document).off('click.ntrHeaderLang');
					$(document).off('keyup.ntrHeaderLang');
				},
				navOpen: function () {
					myHeaderNav.addClass('is-active');
					$(document).on('click.ntrHeaderNav', function (e) {
						if (!$(e.target).closest(myHeaderNavToggle).length) {
							if (!$(e.target).closest(myHeaderNav).length) {
								myHeaderHandlers.navClose();
							}
						}
					});
					$(document).on('keyup.ntrHeaderNav', function (e) {
						if (e.keyCode === 27) {
							myHeaderHandlers.navClose();
						}
					});
				},
				navClose: function () {
					myHeaderNav.removeClass('is-active');
					$(document).off('click.ntrHeaderNav');
					$(document).off('keyup.ntrHeaderNav');
				},
				cartOpen: function () {
					myHeaderCart.addClass('is-active');
					$(document).on('click.ntrHeaderCart', function (e) {
						if (!$(e.target).closest(myHeaderCart).length) {
							myHeaderHandlers.cartClose();
						}
					});
					$(document).on('keyup.ntrHeaderCart', function (e) {
						if (e.keyCode === 27) {
							myHeaderHandlers.cartClose();
						}
					});
				},
				cartClose: function () {
					myHeaderCart.removeClass('is-active');
					$(document).off('click.ntrHeaderCart');
					$(document).off('keyup.ntrHeaderCart');
				},
			};
			
			// Handlers
			myHeaderSearchOpen.on('click', function (e) {
				e.preventDefault();
				if (myHeaderSearch.hasClass('is-active')) {
					myHeaderHandlers.searchClose();
				} else {
					myHeaderHandlers.searchOpen();
				}
			});
			myHeaderSearchClose.on('click', function (e) {
				e.preventDefault();
				myHeaderHandlers.searchClose();
			});

			// Conditional Handlers
			var myMedia = window.matchMedia('(max-width: 1199px)');
			var myMediaHandler = function (m) {
				if (m.matches) {
					myHeaderLangLabel.on('click.ntrHeaderLangLabel', function (e) {
						e.preventDefault();
						if (myHeaderLang.hasClass('is-active')) {
							myHeaderHandlers.langClose();
						} else {
							myHeaderHandlers.langOpen();
						}
					});
					myHeaderNavToggle.on('click.ntrHeaderNavToggle', function (e) {
						e.preventDefault();
						if (myHeaderNav.hasClass('is-active')) {
							myHeaderHandlers.navClose();
						} else {
							myHeaderHandlers.navOpen();
						}
					});
					myHeaderNavClose.on('click.ntrHeaderNavClose', function (e) {
						e.preventDefault();
						myHeaderHandlers.navClose();
					});
					myHeaderNavArrows.on('click.ntrHeaderNavArrows', function (e) {
						e.preventDefault();
						var myArrow = $(this);
						var myParent = myArrow.parent('li');
						if (myParent.hasClass('is-active')) {
							myParent.removeClass('is-active');
							$('.icon', myArrow).toggleClass('is-arrow-up2 is-arrow-down2');
						} else {
							myParent.addClass('is-active');
							$('.icon', myArrow).toggleClass('is-arrow-down2 is-arrow-up2');
						}
					});
					myHeaderCartLabel.on('click.ntrHeaderCartLabel', function (e) {
						e.preventDefault();
						if (myHeaderCart.hasClass('is-active')) {
							myHeaderHandlers.cartClose();
						} else {
							myHeaderHandlers.cartOpen();
						}
					});
				} else {
					// Remove Lang Events
					$(document).off('click.ntrHeaderLang');
					$(document).off('keyup.ntrHeaderLang');
					myHeaderLangLabel.off('click.ntrHeaderLangLabel');
					
					// Remove Nav Events
					$(document).off('click.ntrHeaderNav');
					$(document).off('keyup.ntrHeaderNav');
					myHeaderNavToggle.off('click.ntrHeaderNavToggle');
					myHeaderNavClose.off('click.ntrHeaderNavClose');
					myHeaderNavArrows.off('click.ntrHeaderNavArrows');

					// Remove Cart Events
					$(document).off('click.ntrHeaderCart');
					$(document).off('keyup.ntrHeaderCart');
					myHeaderCartLabel.off('click.ntrHeaderCartLabel');
				}
			};
			myMedia.addListener(myMediaHandler);
			myMediaHandler(myMedia);

			// Sticky
			if (myHeader.hasClass('is-sticky')) {
				var myWindow = $(window);
				var myHeaderHolder = $('.header_holder', myHeader);
				var myHeaderContainer = $('.header_container', myHeader);
				var myHeaderHeight = myHeaderContainer.outerHeight();
				var myHeaderTimer;
				if (!myHeader.hasClass('is-overlay')) {
					myHeaderHolder.css({'height': myHeaderHeight});
				}
				myWindow.on('scroll', function() {
					if (myHeaderTimer) {
						clearTimeout(myHeaderTimer);
					}
					myHeaderTimer = setTimeout(function() {
						if (myWindow.scrollTop() > myHeaderHeight) {
							myHeader.addClass('is-sticky-active');
						} else if (myWindow.scrollTop() < 1) {
							myHeader.removeClass('is-sticky-active');
						}
					}, 200);
				});
			}
		}
	}
	function ntrNav() {
		var myContainer = $('[data-ntr-nav]');
		if (myContainer.length) {
			var myToggleButton = $('.nav_toggle_button', myContainer);
			myToggleButton.on('click', function (e) {
				e.preventDefault();
				var myButton = $(this);
				var myButtonToggle = myButton.parent('.nav_toggle');
				myButtonToggle.toggleClass('is-active');
			});
		}
	}
	function ntrNav2() {
		var myContainer = $('[data-ntr-nav2]');
		if (myContainer.length) {
			var myToggles = $('.nav2_toggle', myContainer);
			var myTogglesButtons = $('.nav2_toggle_button', myContainer);
			myTogglesButtons.on('click', function (e) {
				e.preventDefault();
				var myButton = $(this);
				var myButtonToggle = myButton.parent('.nav2_toggle');
				myToggles.not(myButtonToggle).removeClass('is-active');
				myButtonToggle.toggleClass('is-active');
			});
		}
	}
	function ntrContactForm() {
		var myForms = $('[data-ntr-contact-form]');
		if (myForms.length) {
			myForms.each(function (i, el) {
				var myForm = $(el);
				var myFormMessage = $('#form-message', myForm);
				var myFormAlert = $('.alert', myFormMessage);
				$('.alert_close', myFormAlert).on('click', function () {
					myFormMessage.addClass('hidden');
					myFormAlert.removeAttr('style');
				});
				myForm.on('submit', function (e) {
					e.preventDefault();

					// Clear Form Message
					myFormAlert.removeClass('is-green-light is-red-light');
					myFormAlert.children().not('.alert_close').remove();
					myFormMessage.addClass('hidden');

					// Disable Form
					$(':input', myForm).prop('disabled', true);

					// Get Form Data
					var myFormData = {
						'name' : $('input[name="name"]', myForm).val(),
						'email' : $('input[name="email"]', myForm).val(),
						'message' : $('textarea[name="message"]', myForm).val()
					};

					// Send Form
					$.ajax({
						method: 'POST',
						url: 'inc/contact-form.php',
						data: myFormData,
						dataType: 'json'
					}).done(function(response) {
						// Add Form Message
						myFormAlert.addClass(function () {
							return response.success ? 'is-green-light' : 'is-red-light';
						}).append('<p>'+ response.message +'</p>');
						if (!response.success) {
							myFormAlert.append(function () {
								if (Array.isArray(response.errors) && response.errors.length) {
									var myErrors = $('<ul></ul>');
									response.errors.forEach(function (err) {
										myErrors.append('<li>'+ err +'</li>');
									});
									return myErrors;
								}
							});
						}
						myFormMessage.removeClass('hidden');

						// Enable Form
						$(':input', myForm).prop('disabled', false);

						// Reset Form
						if (response.success) {
							myForm[0].reset();
						}

						// Scroll to form
						$('html, body').animate({scrollTop: (myForm.offset().top - 100)}, 800);
					}).fail(function (response) {
						// Add Form Message
						myFormAlert.addClass('is-red-light').append('<p>An error occurred.</p>');
						myFormMessage.removeClass('hidden');

						// Enable Form
						$(':input', myForm).prop('disabled', false);

						// Scroll to form
						$('html, body').animate({scrollTop: (myForm.offset().top - 100)}, 800);
					});
				});
			});
		}
	}
	function ntrSliderCategories() {
		var myContainer = $('[data-ntr-slider-categories]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				autoplay: true,
				slidesToShow: 5,
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
						}
					}
				]
			});
		}
	}
	function ntrSliderDeals() {
		var myContainer = $('[data-ntr-slider-deals]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				autoplay: true,
				slidesToShow: 1,
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
						}
					},
				]
			});
		}
	}
	function ntrSliderTestimonials() {
		var myContainer = $('[data-ntr-slider-testimonials]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
			});
		}
	}
	function ntrSliderTestimonials2() {
		var myContainer = $('[data-ntr-slider-testimonials2]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							dots: true
						}
					},
				]
			});
		}
	}
	function ntrSliderTestimonials3() {
		var myContainer = $('[data-ntr-slider-testimonials3]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
			});
		}
	}
	function ntrSliderBlog() {
		var myContainer = $('[data-ntr-slider-blog]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
						}
					}
				]
			});
		}
	}
	function ntrSliderBlog2() {
		var myContainer = $('[data-ntr-slider-blog2]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
			});
		}
	}
	function ntrSliderBlog3() {
		var myContainer = $('[data-ntr-slider-blog3]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				centerMode: true,
				adaptiveHeight: true,
				slidesToShow: 1,
				centerPadding: '25%',
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							centerPadding: '30px',
						}
					},
					{
						breakpoint: 992,
						settings: {
							centerPadding: '60px',
						}
					},
					{
						breakpoint: 1200,
						settings: {
							centerPadding: '120px',
						}
					}
				]
			});
		}
	}
	function ntrSliderLogos() {
		var myContainer = $('[data-ntr-slider-logos]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				autoplay: true,
				speed: 300,
				slidesToShow: 5,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
						}
					},
				]
			});
		}
	}
	function ntrSliderPhotos() {
		var myContainer = $('[data-ntr-slider-photos]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				infinite: false,
				speed: 300,
				slidesToShow: 3,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
						}
					},
				]
			});
		}
	}
	function ntrSliderProducts() {
		var myContainer = $('[data-ntr-slider-products]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				speed: 300,
				slidesToShow: 4,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
						}
					}
				]
			});
		}
	}
	function ntrSliderHero() {
		var myContainer = $('[data-ntr-slider-hero]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				dots: false,
				fade: true,
				adaptiveHeight: true,
				cssEase: 'linear',
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							arrows: false,
							dots: true
						}
					},
				]
			});
		}
	}
	function ntrSliderHero2() {
		var myContainer = $('[data-ntr-slider-hero2]');
		if (myContainer.length) {
			var mySlick = $('.slick-slider', myContainer);
			mySlick.slick({
				arrows: false,
				dots: true,
				fade: true,
				adaptiveHeight: true,
				cssEase: 'linear',
				speed: 300,
				prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
				nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
			});
		}
	}
	function ntrShopHeader() {
		var myContainer = $('[data-ntr-shop-header]');
		if (myContainer.length) {
			var myProducts = $('.shop-products');
			var myLayoutItems = $('.shop-header_layout_item', myContainer);
			var myActiveLayout = 'is-grid-3';
			var myActiveLayoutItem = myLayoutItems.filter('.is-active').first();
			if (myActiveLayoutItem.length) {
				myActiveLayout = 'is-' + myActiveLayoutItem.data('layout');
			}
			myProducts.addClass(myActiveLayout);
			myLayoutItems.on('click', function (e) {
				e.preventDefault();
				var myLayoutItem = $(this);
				if (!myLayoutItem.hasClass('is-active')) {
					myLayoutItems.removeClass('is-active');
					myLayoutItem.addClass('is-active');
					myProducts.removeClass('is-grid-3 is-grid-4 is-list').addClass('is-' + myLayoutItem.data('layout'));
					AOS.refresh();
				}
			});
		}
	}
	function ntrShopSidebar() {
		var myContainer = $('[data-ntr-shop-sidebar]');
		if (myContainer.length) {
			var myFilterSlider = $('.shop-sidebar_filter_slider', myContainer);
			if (myFilterSlider.length) {
				var myFilterSliderForm = $('.shop-sidebar_filter_form', myContainer);
				var myFilterSliderLabel = $('.shop-sidebar_filter_label', myContainer);
				myFilterSlider.on('slide', function(event, ui) {
					$('input[name="min_price"]', myFilterSliderForm).val(ui.values[0]);
					$('input[name="max_price"]', myFilterSliderForm).val(ui.values[1]);
					$('span', myFilterSliderLabel).html('$' + ui.values[0] + ' - $' + ui.values[1]);
				});
			}
		}
	}
	function ntrShopSingle() {
		var myContainer = $('[data-ntr-shop-single]');
		if (myContainer.length) {
			var myPhotos = $('.shop-single_photos', myContainer);
			var myThumbnails = $('.shop-single_thumbnails', myContainer);
			var myRating = $('.shop-single_rating', myContainer);

			if (myPhotos.length) {
				var myPhotosSlick = $('.slick-slider', myPhotos);
				myPhotosSlick.slick({
					arrows: false,
					dots: true,
					infinite: false,
					speed: 300,
					asNavFor: '.shop-single_thumbnails .slick-slider',
					prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
					nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				});
			}
			if (myThumbnails.length) {
				var myThumbnailsSlick = $('.slick-slider', myThumbnails);
				myThumbnailsSlick.slick({
					arrows: false,
					infinite: false,
					focusOnSelect: true,
					speed: 300,
					slidesToShow: 3,
					asNavFor: '.shop-single_photos .slick-slider',
					prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
					nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				});
			}
			if (myRating.length) {
				var myRatingReviews = $('.shop-single_rating_reviews', myRating);
				myRatingReviews.on('click', function (e) {
					e.preventDefault();
					var myTarget = $('.tab_nav_item[data-id="3"]');
					myTarget.trigger('click');
					$('html, body').animate({
						scrollTop: myTarget.offset().top,
					}, 500);
				});
			}
		}
	}
	function ntrShopCheckout() {
		var myContainer = $('[data-ntr-shop-checkout]');
		if (myContainer.length) {
			var myCouponForm = $('.shop-checkout_coupon', myContainer);
			var myCouponLink = $('.shop-checkout_coupon_message a', myContainer);
			myCouponLink.on('click', function (e) {
				e.preventDefault();
				myCouponForm.toggleClass('is-active');
			});
		}
	}
	function ntrBlogSingle() {
		var myContainer = $('[data-ntr-blog-single]');
		if (myContainer.length) {
			var myMediaGallery = $('.blog-single_media_gallery', myContainer);
			if (myMediaGallery.length) {
				var myMediaGallerySlick = $('.slick-slider', myMediaGallery);
				myMediaGallerySlick.slick({
					fade: true,
					cssEase: 'linear',
					speed: 300,
					prevArrow: '<span class="slick-prev"><span class="icon is-back"></span></span>',
					nextArrow: '<span class="slick-next"><span class="icon is-next"></span></span>',
				});
			}
		}
	}
	function ntrElementsSidebar() {
		var mySidebar = $('[data-ntr-elements-sidebar]');
		if (mySidebar.length) {
			var myBacktop = $('.back-top');
			var myButton = $('.elements-sidebar_button', mySidebar);
			var myIcon = $('.icon', myButton);
			myButton.on('click', function (e) {
				e.preventDefault();
				myButton.toggleClass('is-active');
				myIcon.toggleClass('is-menu is-close');
				mySidebar.toggleClass('is-active');
				if (mySidebar.hasClass('is-active')) {
					myBacktop.css({right: '250px'});
				} else {
					myBacktop.removeAttr('style');
				}
			});
		}
	}
	
	$(document).ready(function() {
		ntrAlert();
		ntrAccordion();
		ntrLoading();
		ntrBacktop();
		ntrTab();
		ntrCounter();
		ntrAnimation();
		ntrBackground();
		ntrMap();
		ntrUISlider();
		ntrUISpinner();
		ntrUITooltip();
		ntrIsotope();
		ntrLightbox();
		ntrRatingSelect();
		ntrHeader();
		ntrNav();
		ntrNav2();
		ntrContactForm();
		ntrSliderCategories();
		ntrSliderDeals();
		ntrSliderTestimonials();
		ntrSliderTestimonials2();
		ntrSliderTestimonials3();
		ntrSliderBlog();
		ntrSliderBlog2();
		ntrSliderBlog3();
		ntrSliderLogos();
		ntrSliderPhotos();
		ntrSliderProducts();
		ntrSliderHero();
		ntrSliderHero2();
		ntrShopHeader();
		ntrShopSidebar();
		ntrShopSingle();
		ntrShopCheckout();
		ntrBlogSingle();
		ntrElementsSidebar();
	});
})(window, document, jQuery);