async function purchase() {
    if (!window.PaymentRequest) {
        window.alert("PaymentRequestAPIに対応したブラウザをお使いください。")
        return;
    }
    let supportedInstruments = [{
        supportedMethods: ['basic-card'],
        data: {
            supportedNetworks: [
                'visa',
                'mastercard'
            ]
        }
    }];

    var general = Number($("#general").val());
    var student = Number($("#student").val());
    var price = 10000 * general + 3000 * student;

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

    let result = await request.show();
    if (!result) {
        return;
    }

    var name = $("#name").val();
    var email = $("#email").val();

    Payjp.setPublicKey("pk_test_9bd57d50c30ed9d2ec978af1");
    Payjp.createToken({
        number: result.details.cardNumber,
        cvc: result.details.cardSecurityCode,
        exp_month: result.details.expiryMonth,
        exp_year: result.details.expiryYear
    }, (status, response) => {
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
                },
                () => {
                    result.complete("success");
                    location.href = "purchase-completed.html";
                }
            );

        }
        result.complete("fail");
    });
}
