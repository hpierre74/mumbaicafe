
export const setError = (type) => {
    let errorList = [];
    firebase.database().ref('errors').once('value')
    .then((snapshot) => {
        return errorList = snapshot.val();
    })
    .catch(error => {
        console.log(error);
    })
    if (errorList[type]) {
        return 
    }
}


   