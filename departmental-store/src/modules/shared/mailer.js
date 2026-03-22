export const mailer = {
    sendRegistrationEmail: async (toEmail , firstname , message) => {
        //TODO implement email sending logic here

        console.log(`sending registation email to ${toEmail}`);
        console.log(`hello ${firstname} , ${message}`);
        return true;
    }
}