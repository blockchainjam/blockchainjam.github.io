function postContact() {
    let result = window.confirm("お問い合わせを送信しますか？");
    if (!result) {
        return;
    }
    var name = $("#name").val()
    var email = $("#email").val()
    var content = $("#content").val()
    var url = `mailto:beny@blockchainjam.org?subject=BlockChainJamへのお問い合わせ\&body=名前：${name}%0D%0Aメール：${email}%0D%0A内容：${content}`

    location.href = url
    // location.href = "completed.html"
}

function postMediaContact() {
    let result = window.confirm("お問い合わせを送信しますか？");
    if (!result) {
        return;
    }
    var name = $("#name").val()
    var company = $("#company").val()
    var email = $("#email").val()
    var phone = $("#phone").val()
    var content = $("#content").val()
    var url = `mailto:beny@blockchainjam.org?subject=BlockChainJamへのお問い合わせ\&body=名前：${name}%0D%0A会社名：${company}%0D%0Aメール：${email}%0D%0A電話番号：${phone}%0D%0A内容：${content}`
    location.href = url
    // location.href = "completed.html"
}
