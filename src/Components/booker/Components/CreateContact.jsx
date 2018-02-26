
class CreateContact {
    constructor(email, name, tel) {
        super();
        this.email = email;
        this.name = name;
        this.tel = tel;
        this.save = () => {
            firebase.database().ref('contacts').push({
                name: this.name,
                email: this.email,
                tel: this.tel
            })
            .then(success => {
                console.log(success);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }     
}


export default CreateContact


