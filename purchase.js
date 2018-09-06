function purchase() {

    Payjp.setPublicKey("pk_test_9bd57d50c30ed9d2ec978af1");
    Payjp.createToken({
        number: result.details.cardNumber,
        cvc: result.details.cardSecurityCode,
        exp_month: result.details.expiryMonth,
        exp_year: result.details.expiryYear
    }, async (status, response) => {
        try {
            if (status == 200) {
                await this.http.post(
                    "https://us-central1-ticket-p2p.cloudfunctions.net/capacitySupplement",
                    {
                        userId: this.auth.auth.currentUser!.uid,
                        eventId: this.id,
                        capacity: capacity,
                        token: response.id
                    }
                ).toPromise();
            } else {
                throw Error();
            }
        } catch {
            window.alert("エラー");

            return;
        } finally {
        }
    });
}
