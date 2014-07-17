//Инициализация валидатора

jQuery(function($){
	$('[data-numeric]').payment('restrictNumeric');
	$('#iPAN').payment('formatCardNumber');
	$('#iDATE').payment('formatCardExpiry');
	$('#iCVC').payment('formatCardCVC');

	$('form').submit(function(e){
		e.preventDefault();
		$('input').removeClass('invalid');
		$('.validation').removeClass('passed failed');

		var cardType = $.payment.cardType($('#iPAN').val());

		$('#iPAN').toggleClass('invalid', !$.payment.validateCardNumber($('#iPAN').val()));
		$('#iDATE').toggleClass('invalid', !$.payment.validateCardExpiry($('#iDATE').payment('cardExpiryVal')));
		$('#iCVC').toggleClass('invalid', !$.payment.validateCardCVC($('#iCVC').val(), cardType));


		if ( $('input.invalid').length ) {
			$('.validation').addClass('failed');
		} else {
			$('.validation').addClass('passed');
		}

		if($("#iPAN").hasClass("invalid")){
			$(".p-card__input_type_num").addClass("invalid");
		} else {
			$(".p-card__input_type_num").removeClass("invalid");
		}

		if($("#iDATE").hasClass("invalid")){
			$(".chosen-single").addClass("invalid");
		} else {
			$(".chosen-single").removeClass("invalid");
		}

		if($("#iTEXT").val() == false){
			$("#iTEXT").addClass("invalid");
		} else {
			$("#iTEXT").removeClass("invalid");
		}
	});
});

$(document).ready(function(){
	var elem = $(".p-page__c-type");

	//	Начальные числа в зависимости от типа карты
	var changeSV = function(elem){
		var iPAN1 = $("#iPAN1"),
			iPAN2 = $("#iPAN2"),
			iPAN3 = $("#iPAN3"),
			iPAN4 = $("#iPAN4"),
			iPAN5 = $("#iPAN5");
		if(elem.hasClass("p-page__c-type_t_active") && elem.hasClass("visa")){
			iPAN1.val("1234");
			iPAN2.val("56");
			iPAN3.val("");
			iPAN4.val("");
			iPAN5.val("");
		} else {
			iPAN1.val("0987");
			iPAN2.val("65");
			iPAN3.val("");
			iPAN4.val("");
			iPAN5.val("");
		}
		iPAN3.focus();

		//	Подставляем значения в псевдополя
		(function(){
			var iPAN1pseudo = $("#iPAN1-pseudo"),
				iPAN2pseudo = $("#iPAN2-pseudo");

			iPAN1pseudo.html(iPAN1.val());
			iPAN2pseudo.html(iPAN2.val());
		})();
	};

	changeSV(elem);

	elem.on("click", function(){
		var logo = $(".p-card__logo"),
			elem = $(this);

		$(this).siblings().removeClass("p-page__c-type_t_active");
		$(this).addClass("p-page__c-type_t_active");

		//	Замена логотипа при смене типа карты
		if($(this).hasClass("visa")){
			logo.removeClass("p-card__logo_type_mastercard");
			logo.addClass("p-card__logo_type_visa");
			changeSV(elem);
		} else {
			logo.removeClass("p-card__logo_type_visa");
			logo.addClass("p-card__logo_type_mastercard");
			changeSV(elem);
		}
	});

//	Собираем поля с номером карты
	$(".p-card__input_type_num").on('change', function(){
		var val_1 = $("#iPAN1").val(),
			val_2 = $("#iPAN2").val(),
			val_3 = $("#iPAN3").val(),
			val_4 = $("#iPAN4").val(),
			val_5 = $("#iPAN5").val(),
			values = "",
			attrId = $(this).attr("id");

		if(attrId === "iPAN1"){
			val_1 = $(this).val();
		} else if(attrId === "iPAN2") {
			val_2 = $(this).val();
		} else if(attrId === "iPAN3") {
			val_3 = $(this).val();
		} else if(attrId === "iPAN4") {
			val_4 = $(this).val();
		}else if(attrId === "iPAN5") {
			val_5 = $(this).val();
		}

		values = val_1 + val_2 + val_3 + val_4 + val_5;
		$("#iPAN").val(values);

	});


//  Собираем поля с датой
	$(".p-card__select").on('change', function(){
		var month = $("#month").val(),
			year = $("#year").val(),
			values = "";

		values = month + " / " + year;
		$("#iDATE").val(values);

		$(this).next().find(".chosen-single").css("color","black");
	});

//	Инициализируем нестандартные селекты
	$(".p-card__select").chosen({width: "65px"});


});


