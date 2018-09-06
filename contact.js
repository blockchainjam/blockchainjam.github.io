function postContact(media) {
    let result = window.confirm("お問い合わせを送信しますか？");
    if (!result) {
        return;
    }
    var name = $("#name").val()
    var email = $("#email").val()
    var content = $("#content").val()
    var company = null, phone = null;

    if(media) {
        company = $("#company").val()
        phone = $("#phone").val()
    }
    
    $.post(
        "https://us-central1-cors-215507.cloudfunctions.net/doPost",
        {
            url: "https://script.google.com/macros/s/AKfycbyEiG8hn86uvmVJXBGc_2s3dgYW78C_ONYZJRzqqBIqe5MgIMg/exec",
            form: JSON.stringify({
                name: name,
                company: company,
                email: email,
                phone: phone,
                content: content
            })
        },
        () => {
            location.href = "completed.html"
        }
    )
}
