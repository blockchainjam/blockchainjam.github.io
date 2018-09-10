const generalLimit = 80;
const studentLimit = 20;

$(function () {
    $.get(
        "https://us-central1-blockchainjam.cloudfunctions.net/status"
    ).done((data) => {
        data = JSON.parse(data);
        console.log(data);
        $("#generalPurchased").html(data.general);
        $("#studentPurchased").html(data.student);

        if (data.general >= generalLimit) {
            $("#general").attr("readonly", "true");
        }
        if (data.student >= studentLimit) {
            $("#student").attr("readonly", "true");
        }
    })

    var userAgent = window.navigator.userAgent.toLowerCase();
    var disable = userAgent.indexOf('safari') != -1 || userAgent.indexOf('firefox') != -1 || userAgent.indexOf('msie') != -1;

    if (!disable) {
        $("#ifPaymentInvalid").hide();
    } else {
        $("#ccName").attr("required", "true");
        $("#ccNumber").attr("required", "true");
        $("#ccExpMonth").attr("required", "true");
        $("#ccExpYaer").attr("required", "true");
        $("#ccCsc").attr("required", "true");
    }
})

async function purchase() {
    var general = Number($("#general").val());
    var student = Number($("#student").val());

    if (Number($("#generalPurchased").val()) + general > generalLimit) {
        window.alert("定員を超えています。")
        return;
    }

    if (Number($("#studentPurchased").val()) + student > studentLimit) {
        window.alert("定員を超えています。")
        return;
    }

    var price = 10000 * general + 3000 * student;

    var arg, result;

    if (window.PaymentRequest) {
        let supportedInstruments = [{
            supportedMethods: ['basic-card'],
            data: {
                supportedNetworks: [
                    'visa',
                    'mastercard'
                ]
            }
        }];

        let details = {
            displayItems: [
                {
                    label: `一般: 10000x ${general}`,
                    amount: {
                        currency: "JPY",
                        value: (general * 10000).toString()
                    }
                },
                {
                    label: `学生: 3000x ${student}`,
                    amount: {
                        currency: "JPY",
                        value: (student * 3000).toString()
                    }
                }
            ],
            total: {
                label: "合計",
                amount: {
                    currency: "JPY",
                    value: price.toString()
                }
            }
        };

        let request = new PaymentRequest(supportedInstruments, details, { requestShipping: false });

        result = await request.show();
        if (!result) {
            return;
        }

        arg = {
            number: result.details.cardNumber,
            cvc: result.details.cardSecurityCode,
            exp_month: result.details.expiryMonth,
            exp_year: result.details.expiryYear
        };console.log(arg)
    } else {
        if(!window.confirm(`購入しますか？合計${price}円`)) {
            return;
        }


        arg = {
            number: $("#ccNumber").val(),
            cvc: $("#ccCsc").val(),
            exp_month: $("#ccExpMonth").val(),
            exp_year: $("#ccExpYear").val()
        };
    }


    var name = $("#name").val();
    var email = $("#email").val();

    Payjp.setPublicKey("pk_test_9bd57d50c30ed9d2ec978af1");
    Payjp.createToken(arg, (status, response) => {
        if (status == 200) {
            console.log(response.id);
            $.post(
                "https://us-central1-blockchainjam.cloudfunctions.net/purchase",
                {
                    name: name,
                    email: email,
                    general: general,
                    student: student,
                    token: response.id
                }
            ).done(() => {
                if (result) {
                    result.complete("success");
                }
                location.href = "purchase-completed.html";
                return;
            }).fail(() => {
                if (result) {
                    result.complete("fail");
                }
                window.alert("エラーが発生しました。運営までお問い合わせください")
                return;
            });
        } else {
            if (result) {
                result.complete("fail");
            } else {
                window.alert("エラーが発生しました。")
            }
        }
    });
}
