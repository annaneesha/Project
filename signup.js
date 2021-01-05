$(function () {

	$("#username_error_message").hide();
	$("#password_error_message").hide();
	$("#age_error_message").hide();
	$("#phonenumber_error_message").hide();
	$("#email_error_message").hide();

	var error_username = false;
	var error_password = false;
	var error_age = false;
	var error_phonenumber = false;
	var error_email = false;

	$("#form_username").focusout(function () {
		check_username();
	});

	$("#form_password").focusout(function () {
		check_password();
	});

	$("#form_age").focusout(function () {
		check_age();
	});

	$("#form_phone").focusout(function () {
		check_phonenumber();
	});


	$("#form_email").focusout(function () {
		check_email();
	});

	function check_username() {

		var username_length = $("#form_username").val().length;

		if (username_length == 0) {
			$("#username_error_message").html("Username should be filled");
			$("#username_error_message").show();
			error_username = true;
		} else if (username_length < 5 || username_length > 20) {
			$("#username_error_message").html("Username should be between 5-20 characters");
			$("#username_error_message").show();
			error_username = true;
		} else {
			$("#username_error_message").hide();
		}

	}

	function check_password() {
		var password_length = $("#form_password").val().length;
		if (password_length == 0) {
			$("#password_error_message").html("Password should be filled");
			$("#password_error_message").show();
			error_password = true;
		} else if (password_length < 8) {
			$("#password_error_message").html("Password should have at least 8 characters");
			$("#password_error_message").show();
			error_password = true;
		} else {
			$("#password_error_message").hide();
		}
	}

	function check_age() {
		var age_length = $("#form_age").val().length;
		if (age_length == 0) {
			$("#age_error_message").html("Age should be filled");
			$("#age_error_message").show();
			error_age = true;
		} else {
			$("#age_error_message").hide();
		}
	}

	function check_phonenumber() {
		var phonenumber_length = $("#form_phone").val().length;
		console.log(phonenumber_length, 'phonenumber_length');
		if (phonenumber_length == 0 || phonenumber_length < 10) {
			$("#phone_error_message").html("Enter Valid Phone number");
			$("#phone_error_message").show();
			error_phonenumber = true;
		}
		else {
			$("#phone_error_message").hide();
		}
	}

	function check_email() {
		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
		if (pattern.test($("#form_email").val())) {
			$("#email_error_message").hide();
		} else {
			$("#email_error_message").html("Invalid email address");
			$("#email_error_message").show();
			error_email = true;
		}
	}


	$("#registration_form").submit(function () {
		error_username = false;
		error_password = false;
		error_age = false;
		error_phonenumber = false;
		error_email = false;

		check_username();
		check_password();
		check_age();
		check_phonenumber();
		check_email();

		var username = $("#form_username").val();
		var password = $("#form_password").val();
		var age = $("#form_age").val();
		var phonenumber = $("#form_phone").val();
		var email = $("#form_email").val();

		if (!error_username && !error_password && !error_age && !error_phonenumber && !error_email) {
			$.post("http://localhost:5000/register", { username, password, age, phonenumber, email }, (data, status) => {
				if (data.status == 200) {
					console.log(status, data, 'status');					
					$("#form_username").val("");
					$("#form_password").val("");
					$("#form_age").val("");
					$("#form_phone").val("");
					$("#form_email").val("");
					alert("Data saved sucessfully!.. You can login now")					
				}
				window.location.href = "login.html";
			});
		} else {
			return false;
		}
	});
});


