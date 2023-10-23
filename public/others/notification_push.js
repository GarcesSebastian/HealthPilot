export function setPushNotification(title, body, url ,timeOut){
  Push.create(title, {
    body: body,
    icon: url,
    timeout: timeOut,
    onClick: function () {
        window.focus();
        this.close();
    }
});
}

window.setPushNotification = setPushNotification;