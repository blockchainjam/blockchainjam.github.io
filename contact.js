function postContact() {
    let result = window.confirm("お問い合わせを送信しますか？");
    if(!result) {
        return;
    }
    $.post("https://script.google.com/macros/s/AKfycbxJrZ6e-WMnzsix2AsTcKXJJSB-myABQoI2-JyyrfbGdsBg9zcx/exec", $("#contact-form").serialize());
}

function postMediaContact() {
    $.post("https://script.google.com/macros/s/AKfycbxJrZ6e-WMnzsix2AsTcKXJJSB-myABQoI2-JyyrfbGdsBg9zcx/exec", $("#media-contact-form").serialize());
}