function postContact() {
    let result = window.confirm("お問い合わせを送信しますか？");
    if(!result) {
        return;
    }
    $.post("https://script.google.com/macros/s/AKfycbxJrZ6e-WMnzsix2AsTcKXJJSB-myABQoI2-JyyrfbGdsBg9zcx/exec", $("#contact-form").serialize());
    location.href = "completed.html"
}

function postMediaContact() {
    let result = window.confirm("お問い合わせを送信しますか？");
    if(!result) {
        return;
    }
    $.post("https://script.google.com/macros/s/AKfycbxTgXOUPq4t1t7O0prRTyYqJLirwdjO0_rp-FhpSwznaMVOGks/exec", $("#media-contact-form").serialize());
    location.href = "completed.html"
}
