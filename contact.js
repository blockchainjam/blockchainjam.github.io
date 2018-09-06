function postContact(media) {
    let result = window.confirm("お問い合わせを送信しますか？");
    if (!result) {
        return;
    }
    $("#cover").addClass("show");

    var name = $("#name").val()
    var email = $("#email").val()
    var content = $("#content").val()
    var company = null, phone = null;

    if(media) {
        company = $("#company").val()
        phone = $("#phone").val()
    }
    
    $.post(
        "https://us-central1-blockchainjam.cloudfunctions.net/contact",
        {
            name: name,
            company: company,
            email: email,
            phone: phone,
            content: content
        },
        () => {
            location.href = "completed.html"
        }
    )
}
